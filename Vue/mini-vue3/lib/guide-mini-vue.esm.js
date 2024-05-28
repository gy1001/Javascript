const Fragment = Symbol('Fragment');
const Text = Symbol('Text');
function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        el: null, // 虚拟节点对应的真实的DOM元素
        key: props && props.key, // 唯一标识
        component: null, // 组件实例
        shapeFlag: getShapeFlag(type), // 标记类型
        next: null, // 指向下一个虚拟节点,代表它即将更新的节点
    };
    if (typeof children === 'string') {
        vnode.shapeFlag = vnode.shapeFlag | 4 /* ShapeFlags.TEXT_CHILDREN */;
    }
    if (Array.isArray(children)) {
        vnode.shapeFlag = vnode.shapeFlag | 8 /* ShapeFlags.ARRAY_CHILDREN */;
    }
    // 如果children是对象，则说明是 slot 插槽
    if (vnode.shapeFlag & 2 /* ShapeFlags.STATEFUL_COMPONENT */) {
        if (typeof children === 'object') {
            vnode.shapeFlag = vnode.shapeFlag | 16 /* ShapeFlags.SLOT_CHILDREN */;
        }
    }
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === 'string'
        ? 1 /* ShapeFlags.ELEMENT */
        : 2 /* ShapeFlags.STATEFUL_COMPONENT */;
}
function createTextVNode(str) {
    return createVNode(Text, {}, String(str));
}

function h(type, propsOrChildren, children) {
    return createVNode(type, propsOrChildren, children);
}

function renderSlots(slots, name, props) {
    const slot = slots[name];
    if (slot) {
        // 如果slot是一个函数，则调用该函数并返回结果：作用域插槽
        if (typeof slot === 'function') {
            return createVNode(Fragment, { id: 'slot' }, slot(props));
        }
        return createVNode(Fragment, {}, slot);
    }
    return createVNode(Fragment, {}, slots);
}

function toDisplayString(value) {
    return String(value);
}

const extend = Object.assign;
function isObject(arr) {
    return typeof arr === 'object' && arr !== null;
}
function isString(value) {
    return typeof value === 'string';
}
function hasChanged(newValue, value) {
    return !Object.is(newValue, value);
}
const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const camelize = (str) => {
    return str.replace(/-(\w)/g, (_, c) => {
        return c ? c.toUpperCase() : '';
    });
};
const toHandlerKey = (str) => {
    return str ? 'on' + capitalize(str) : '';
};
const EMPTY_OBJ = Object.freeze({});

let currentActiveEffect;
let shouldTrack;
class ReactiveEffect {
    constructor(fn, scheduler) {
        this.deps = [];
        this.activeFlag = true;
        this._fn = fn;
        this.scheduler = scheduler;
    }
    run() {
        if (!this.activeFlag) {
            return this._fn();
        }
        shouldTrack = true;
        currentActiveEffect = this;
        const result = this._fn();
        shouldTrack = false;
        return result;
    }
    stop() {
        // 如果没有清空过，才进行处理清空
        if (this.activeFlag) {
            cleanupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            this.activeFlag = false;
        }
    }
}
function cleanupEffect(effect) {
    effect.deps.forEach((dep) => {
        dep.delete(effect);
    });
}
function effect(fn, options = {}) {
    const { scheduler } = options;
    const _effect = new ReactiveEffect(fn, scheduler);
    // _effect.onStop = onStop
    // Object.assign(_effect, options)
    extend(_effect, options);
    _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}
function isTracking() {
    return shouldTrack && currentActiveEffect !== undefined;
}
const targetMap = new Map();
function track(target, key) {
    // 这里针对 stop 的操作需要做处理，不收集依赖
    if (!isTracking()) {
        return;
    }
    // target -> key -> dep
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key); //  可以去重
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    trackEffect(dep);
}
function trackEffect(dep) {
    if (dep.has(currentActiveEffect)) {
        return;
    }
    dep.add(currentActiveEffect);
    currentActiveEffect.deps.push(dep);
}
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    const deps = depsMap.get(key);
    triggerEffect(deps);
}
function triggerEffect(deps) {
    for (const effect of deps) {
        if (effect.scheduler) {
            effect.scheduler();
        }
        else {
            effect.run();
        }
    }
}

const get = createGetter();
const set = createSetter();
const readOnlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
function createGetter(isReadOnly = false, shallow = false) {
    return function get(target, key, receiver) {
        // ...
        if (key === "__v_isReactive" /* ReactiveFlags.IS_REACTIVE */) {
            return !isReadOnly;
        }
        if (key === "__v_isReadonly" /* ReactiveFlags.IS_READONLY */) {
            return isReadOnly;
        }
        const result = Reflect.get(target, key, receiver);
        // 如果是浅表的，就不用处理深层次的对象
        if (shallow) {
            return result;
        }
        // reactive 是支持嵌套的，即内部对象也是响应式的额
        if (isObject(result)) {
            return isReadOnly ? readonly(result) : reactive(result);
        }
        if (!isReadOnly) {
            track(target, key);
        }
        return result;
    };
}
function createSetter(isReadOnly = false) {
    return function set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        if (!isReadOnly) {
            trigger(target, key);
        }
        return result;
    };
}
const mutableHandlers = {
    get: get,
    set: set,
};
const readonlyHandlers = {
    get: readOnlyGet,
    set(target, key) {
        console.warn(`key: ${key} set failed`, target);
        return true;
    },
};
const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet,
});

function reactive(raw) {
    return createActiveObject(raw, mutableHandlers);
}
function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers);
}
function createActiveObject(target, baseHandlers) {
    if (!isObject(target)) {
        console.warn(`target ${target} must be an object`);
        return target;
    }
    return new Proxy(target, baseHandlers);
}
function shallowReadonly(value) {
    return createActiveObject(value, shallowReadonlyHandlers);
}

class RefImpl {
    constructor(value) {
        this.__v_isRef = true;
        this._rawValue = value;
        // 判断 value 是否是 object类型
        this._value = convert(value);
        this.dep = new Set();
    }
    get value() {
        // 依赖收集
        trackRefValue(this);
        return this._value;
    }
    set value(newValue) {
        // 判断新旧值是否相等
        //  对比的时候就需要做判断，因为可能是对象类型，如果是 对象类型，this._value 就是一个 proxy对象，所以需要做处理
        if (hasChanged(newValue, this._rawValue)) {
            this._value = convert(newValue);
            this._rawValue = newValue;
            triggerEffect(this.dep);
        }
    }
}
function ref(value) {
    return new RefImpl(value);
}
function convert(value) {
    return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
    if (isTracking()) {
        trackEffect(ref.dep);
    }
}
function isRef(value) {
    return !!value.__v_isRef;
}
function unRef(ref) {
    return isRef(ref) ? ref.value : ref;
}
function proxyRefs(objectWithRefs) {
    return new Proxy(objectWithRefs, {
        get(target, key) {
            const result = Reflect.get(target, key);
            return unRef(result);
        },
        set(target, key, value) {
            // set => ref  .value
            if (isRef(target[key]) && !isRef(value)) {
                target[key].value = value;
                return true;
            }
            return Reflect.set(target, key, value);
        },
    });
}

function emit(instance, event, ...rest) {
    //  instance.props
    const { props } = instance;
    // TPP 开发技巧
    // 先写一个特定的行为 =》 再写一个通用的行为
    const handlerName = toHandlerKey(camelize(event));
    const handler = props[handlerName];
    handler && handler(...rest);
}

function initProps(instance, rawProps) {
    instance.props = rawProps || {};
    // 后续的逻辑操作都会基于这个 props 做处理
    // attrs
}

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
    $slots: (i) => i.slots,
    $props: (i) => i.props,
    // 后续还有 $data $props 等
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        // setUpState
        const { setupState, props } = instance;
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        // props
        if (hasOwn(props, key)) {
            return props[key];
        }
        if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
        }
    },
};

function initSlots(instance, children) {
    // 插槽是一个对象
    const { vnode } = instance;
    // 如果当前的组件是 slot 组件
    if (vnode.shapeFlag & 16 /* ShapeFlags.SLOT_CHILDREN */) {
        normalizeObjectSlots(children, instance.slots);
    }
}
function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}
function normalizeObjectSlots(children, slots) {
    for (const key in children) {
        const value = children[key];
        slots[key] = (props) => normalizeSlotValue(value(props));
    }
}

let currentInstance = null;
function createComponentInstance(vnode, parent) {
    var component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        emit: {},
        slots: {},
        provides: parent ? parent.provides : {},
        parent,
        isMounted: false,
        subTree: null,
    };
    // 这里填充第一个参数，用户使用的时候就直接从第二个参数开始调用就可以了
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    // 初始化props
    initProps(instance, instance.vnode.props);
    // 初始化slots
    initSlots(instance, instance.vnode.children);
    // 初始化事件
    // setupEvent(instance)
    setUpStatefulComponent(instance);
}
function setUpStatefulComponent(instance) {
    const component = instance.vnode.type;
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    const { setup } = component;
    if (setup) {
        setCurrentInstance(instance);
        const setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit,
        });
        setCurrentInstance(null);
        // function 或者 object
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // object
    //  TODO function类型
    if (typeof setupResult === 'object') {
        instance.setupState = proxyRefs(setupResult); // 达到可以不用写.value的用途
    }
    finishSetupComponent(instance);
}
function finishSetupComponent(instance) {
    const Component = instance.type;
    if (_compiler && !Component.render) {
        if (Component.template) {
            Component.render = _compiler(Component.template);
        }
    }
    instance.render = Component.render;
}
function getCurrentInstance() {
    return currentInstance;
}
function setCurrentInstance(instance) {
    currentInstance = instance;
}
let _compiler;
function registerRuntimeCompiler(compiler) {
    _compiler = compiler;
}

function provide(key, value) {
    // 存
    const currentInstance = getCurrentInstance();
    if (currentInstance) {
        let { provides } = currentInstance;
        const parentProvides = currentInstance.parent.provides;
        // 因为初始化时父级的provides, 如果是同一个对象，说明是初始化状态
        if (provides === parentProvides) {
            provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
    }
}
function inject(key, defaultValue) {
    const currentInstance = getCurrentInstance();
    if (currentInstance && currentInstance.parent) {
        const parentProvides = currentInstance.parent.provides;
        if (parentProvides[key]) {
            return parentProvides[key];
        }
        if (typeof defaultValue === 'function') {
            defaultValue = defaultValue();
        }
        return defaultValue;
    }
}

function shouldUpdateComponent(preVNode, nextVNode) {
    const { props: prevProps } = preVNode;
    const { props: nextProps } = nextVNode;
    for (const key in nextProps) {
        if (nextProps[key] !== prevProps[key]) {
            return true;
        }
    }
    return false;
}

function createAppApi(render) {
    return function createApp(rootComponent) {
        return {
            mount(rootContainer) {
                // 先把组件转换为虚拟节点、
                // 后续所有的逻辑操作都会基于这个 vnode  做处理
                const vnode = createVNode(rootComponent);
                render(vnode, rootContainer);
            },
        };
    };
}

const queue = [];
let isFlushPending = false;
const p = Promise.resolve();
function queueJobs(job) {
    if (!queue.includes(job)) {
        queue.push(job);
    }
    // 执行任务
    queueFlush();
}
function queueFlush() {
    if (isFlushPending)
        return;
    isFlushPending = true;
    nextTick(flushJobs);
}
function nextTick(fn) {
    return fn ? p.then(fn) : p;
}
function flushJobs() {
    isFlushPending = false;
    let job;
    while ((job = queue.shift())) {
        job && job();
    }
}

function createRender(options) {
    const { createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert, remove: hostRemove, setElementText: hostSetElementText, } = options;
    function render(vnode, container) {
        patch(null, vnode, container, null, null);
    }
    // n1 - 旧的
    // n2 - 新的
    function patch(n1, n2, container, parentComponent, anchor) {
        const { shapeFlag, type } = n2;
        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, parentComponent, anchor);
                break;
            case Text:
                processText(n1, n2, container);
                break;
            default:
                // 判断 vnode 是不是一个 element 或者是 component 类型
                if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
                    // 元素类型
                    processElement(n1, n2, container, parentComponent, anchor);
                }
                else if (shapeFlag & 2 /* ShapeFlags.STATEFUL_COMPONENT */) {
                    // 处理组件 STATEFUL_COMPONENT
                    processComponent(n1, n2, container, parentComponent, anchor);
                }
                break;
        }
    }
    function processFragment(n1, n2, container, parentComponent, anchor) {
        mountChildren(n2.children, container, parentComponent, anchor);
    }
    function processText(n1, n2, container) {
        const { children } = n2;
        const textNode = (n2.el = document.createTextNode(children));
        container.appendChild(textNode);
    }
    function processElement(n1, n2, container, parentComponent, anchor) {
        if (!n1) {
            mountElement(n1, n2, container, parentComponent, anchor);
        }
        else {
            patchElement(n1, n2, container, parentComponent, anchor);
        }
    }
    function patchElement(n1, n2, container, parentComponent, anchor) {
        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        const el = (n2.el = n1.el);
        patchProps(el, oldProps, newProps);
        patchChildren(n1, n2, el, parentComponent, anchor);
    }
    function patchChildren(n1, n2, el, parentComponent, anchor) {
        const n1ShapeFlag = n1.shapeFlag;
        const n2ShapeFlag = n2.shapeFlag;
        const n1Children = n1.children;
        const n2Children = n2.children;
        // 新节点是文本
        if (n2ShapeFlag & 4 /* ShapeFlags.TEXT_CHILDREN */) {
            // 如果旧节点是数组
            if (n1ShapeFlag & 8 /* ShapeFlags.ARRAY_CHILDREN */) {
                // 1. 把旧节点清空
                unmountChildren(n1.children);
            }
            if (n1Children !== n2Children) {
                // 2. 把新节点文本设置上(这里包含了n1 n2 子节点都是 text 的情况)
                hostSetElementText(el, n2Children);
            }
        }
        else {
            // 新节点是数组
            if (n1ShapeFlag & 4 /* ShapeFlags.TEXT_CHILDREN */) {
                // 1. 把旧节点文本清空
                hostSetElementText(el, '');
                // 2. 把新节点数组逐个挂载
                mountChildren(n2Children, el, parentComponent, anchor);
            }
            else {
                // 新旧节点都是数组
                patchKeyedChildren(n1Children, n2Children, el, parentComponent, anchor);
            }
        }
    }
    function patchKeyedChildren(n1Children, n2Children, el, parentComponent, parentAnchor) {
        let index = 0;
        const n2ChildrenLength = n2Children.length;
        let e1 = n1Children.length - 1;
        let e2 = n2ChildrenLength - 1;
        // 1. 从左侧开始往后：index 必须小于 e1 也必须小于 e2
        // 先找出最左侧第一个不一样的节点
        while (index <= e1 && index <= e2) {
            const n1 = n1Children[index];
            const n2 = n2Children[index];
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, el, parentComponent, parentAnchor);
            }
            else {
                break;
            }
            index++;
        }
        // 2. 从前往后比：再找出最右边第一个不一样的节点
        while (index <= e1 && index <= e2) {
            const n1 = n1Children[e1];
            const n2 = n2Children[e2];
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, el, parentComponent, parentAnchor);
            }
            else {
                break;
            }
            e1--;
            e2--;
        }
        // 3 新节点比旧节点多：往右侧创建
        // 4 新节点比旧节点多：往左侧创建
        if (index > e1) {
            if (index <= e2) {
                // 一个的时候
                // 这边插入的时候需要一个锚点
                const anchor = e2 + 1 <= n2Children.length - 1 ? n2Children[e2 + 1].el : null;
                while (index <= e2) {
                    patch(null, n2Children[index], el, parentComponent, anchor);
                    index++;
                }
            }
        }
        else if (index > e2) {
            // 新的节点少
            while (index <= e1) {
                hostRemove(n1Children[index].el);
                index++;
            }
        }
        else {
            // 中间对比
            // 起始位置 index
            const toBePatched = e2 - index + 1;
            let patched = 0;
            // 初始化一个定长的数组，以最新的剩余节点个数为例
            const newIndexToOldIndexMap = new Array(toBePatched);
            newIndexToOldIndexMap.fill(0);
            // 声明一个变量，用来存储是否真的需要递增子序列算法计算，即是否需要移动
            let moved = false;
            // 声明一个变量，用来存储移动的次数
            let maxNewIndexSoFar = 0;
            const keyToNewIndexMap = new Map();
            for (let i = index; i <= e2; i++) {
                keyToNewIndexMap.set(n2Children[i].key, i);
            }
            // 遍历旧节点
            for (let startN1 = index; startN1 <= e1; startN1++) {
                const prevChild = n1Children[startN1];
                // 如果新节点已经遍历完，那么旧节点就不用在比较了，剩余的节点直接删除即可
                if (patched >= toBePatched) {
                    hostRemove(prevChild.el);
                    continue;
                }
                // 查看旧节点中元素的key再新节点中是否存在
                let newIndex;
                if (prevChild.key) {
                    newIndex = keyToNewIndexMap.get(prevChild.key);
                }
                else {
                    // 如果元素的key 不存在，则遍历新节点
                    for (let i = startN1; i <= e2; i++) {
                        if (isSameVNodeType(prevChild, n2Children[i])) {
                            newIndex = i;
                            break;
                        }
                    }
                }
                if (newIndex === undefined) {
                    // 如果不存在
                    hostRemove(prevChild.el);
                }
                else {
                    if (newIndex >= maxNewIndexSoFar) {
                        maxNewIndexSoFar = newIndex;
                    }
                    else {
                        // 这里如果最大索引值变量 大于 当前新索引值，说明需要移动
                        moved = true;
                    }
                    // 存在
                    patch(prevChild, n2Children[newIndex], el, parentComponent, null);
                    patched++;
                    // 遍历老节点时，新节点中也存在, 加 1 避免出现0的情况，因为 0 表示需要创建
                    // 得出共同的节点在新节点中的新位置数组排序，然后移动其中变化的即可
                    newIndexToOldIndexMap[newIndex - index] = startN1 + 1;
                }
            }
            // let j = 0
            // 通过最长递增子序列函数，这里得到不需要移动的节点的索引数组，、
            // 即在这个结果数组中的索引位置的节点不需要移动
            const increasingNewIndexSequence = moved
                ? getSequence(newIndexToOldIndexMap)
                : [];
            // for (let index = 0; index < toBePatched; index++) {
            //   if (index !== increasingNewIndexSequence[j]) {
            //     console.log('移动位置', increasingNewIndexSequence[j])
            //   } else {
            //     j++
            //   }
            // }
            // 因为移动节点时必须指定一个锚点且插入前面的
            // 如果是正序循环，后面的节点也是一个需要移动的节点，那么锚点位置就无法确定，
            // 因此需要倒序循环，倒序循环时，刚开始时，锚点位置就是最后一个节点，然后依次向前，锚点逐一确定
            let j = increasingNewIndexSequence.length - 1;
            for (let otherIndex = toBePatched - 1; otherIndex >= 0; otherIndex--) {
                const currentIndex = otherIndex + index;
                const currentChild = n2Children[currentIndex];
                const anchor = currentIndex + 1 < n2Children.length
                    ? n2Children[currentIndex + 1].el
                    : null;
                if (newIndexToOldIndexMap[otherIndex] === 0) {
                    patch(null, currentChild, el, parentComponent, anchor);
                }
                else if (moved) {
                    if (j < 0 || otherIndex !== increasingNewIndexSequence[j]) {
                        hostInsert(currentChild.el, el, anchor);
                    }
                    else {
                        console.log('不需要移动');
                        j--;
                    }
                }
            }
        }
        console.log(index, e1, e2);
    }
    function isSameVNodeType(n1, n2) {
        return n1.type === n2.type && n1.key === n2.key;
    }
    function unmountChildren(children) {
        children.forEach((child) => {
            hostRemove(child.el);
        });
    }
    function patchProps(el, oldProps, newProps) {
        if (oldProps === newProps) {
            return;
        }
        for (const key in newProps) {
            const prevProp = oldProps[key];
            const nextProp = newProps[key];
            if (prevProp !== nextProp) {
                hostPatchProp(el, key, nextProp);
            }
        }
        // 删除没有在新属性中的 key
        if (oldProps !== EMPTY_OBJ) {
            for (const key in oldProps) {
                if (!(key in newProps)) {
                    hostPatchProp(el, key, null);
                }
            }
        }
    }
    function mountElement(n1, n2, container, parentComponent, anchor) {
        const { type, children, props, shapeFlag } = n2;
        const ele = (n2.el = hostCreateElement(type));
        // 字符串类型，数组类型
        // TEXT_CHILDREN
        if (shapeFlag & 4 /* ShapeFlags.TEXT_CHILDREN */) {
            ele.textContent = children;
        }
        else if (shapeFlag & 8 /* ShapeFlags.ARRAY_CHILDREN */) {
            // ARRAY_CHILDREN
            mountChildren(children, ele, parentComponent, anchor);
        }
        // props
        for (const key in props) {
            const value = props[key];
            hostPatchProp(ele, key, value);
        }
        // insert
        hostInsert(ele, container, anchor);
    }
    function mountChildren(children, container, parentComponent, anchor) {
        children.forEach((child) => {
            patch(null, child, container, parentComponent, anchor);
        });
    }
    function processComponent(n1, n2, container, parentComponent, anchor) {
        console.log('processComponent');
        console.log('n1', n1);
        // 需要处理更新
        if (n1) {
            updateComponent(n1, n2);
        }
        else {
            mountComponent(n2, container, parentComponent, anchor);
        }
    }
    function updateComponent(n1, n2) {
        const instance = (n2.component = n1.component);
        if (shouldUpdateComponent(n1, n2)) {
            instance.next = n2;
            instance.updater();
        }
        else {
            // no update needed. just copy over properties
            n2.el = n1.el;
            instance.vnode = n2;
        }
    }
    function mountComponent(initialVNode, container, parentComponent, anchor) {
        const instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent));
        setupComponent(instance);
        setupRenderEffect(instance, initialVNode, container, anchor);
    }
    function setupRenderEffect(instance, initialVNode, container, anchor) {
        instance.updater = effect(() => {
            if (!instance.isMounted) {
                const { proxy, render } = instance;
                const subTree = render.call(proxy, proxy);
                // vnode -> patch -> element
                patch(null, subTree, container, instance, anchor);
                initialVNode.el = subTree.el;
                instance.isMounted = true;
                instance.subTree = subTree;
            }
            else {
                // update
                console.log('更新');
                // 需要一个更新完成后的 vnode
                const { next, vnode } = instance;
                if (next) {
                    next.el = vnode.el;
                    updateComponentPreRender(instance, next);
                }
                const { proxy, render } = instance;
                const subTree = render.call(proxy, proxy);
                const prevSubTree = instance.subTree;
                patch(prevSubTree, subTree, container, instance, anchor);
                // 更新后来的 subTree
                instance.subTree = subTree;
            }
        }, {
            scheduler() {
                console.log('update-scheduler');
                queueJobs(instance.updater);
            },
        });
    }
    return {
        createApp: createAppApi(render),
    };
}
function updateComponentPreRender(instance, nextVNode) {
    instance.vnode = nextVNode;
    instance.next = null;
    instance.props = nextVNode.props;
}
// 获得最长递增子序列
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr) {
    const p = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = (u + v) >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}

function createElement(type) {
    return document.createElement(type);
}
function pathProp(el, key, value) {
    const isOn = (key) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
    }
    else {
        if (value === undefined || value === null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, value);
        }
    }
}
// anchor: 插入指定锚点的位置前面
function insert(child, parentContainer, anchor) {
    // anchor 为空时，就是插入到最后
    parentContainer.insertBefore(child, anchor || null);
}
const remove = (child) => {
    const parent = child.parentNode;
    if (parent) {
        parent.removeChild(child);
    }
};
function setElementText(el, text) {
    el.textContent = text;
}
const renderer = createRender({
    createElement,
    patchProp: pathProp,
    insert,
    remove,
    setElementText,
});
function createApp(...args) {
    return renderer.createApp(...args);
}

var runtimeDom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createApp: createApp,
    createElementVNode: createVNode,
    createRender: createRender,
    createTextVNode: createTextVNode,
    getCurrentInstance: getCurrentInstance,
    h: h,
    inject: inject,
    nextTick: nextTick,
    provide: provide,
    registerRuntimeCompiler: registerRuntimeCompiler,
    renderSlots: renderSlots,
    toDisplayString: toDisplayString
});

const TO_DISPLAY_STRING = Symbol('toDisplayString');
const CREATE_ELEMENT_VNODE = Symbol('createElementVNode');
const helperMapName = {
    [TO_DISPLAY_STRING]: 'toDisplayString',
    [CREATE_ELEMENT_VNODE]: 'createElementVNode',
};

function generator(ast) {
    const context = createCodegenContext();
    const { push } = context;
    genFunctionPreamble(ast, context);
    const functionName = 'render';
    const args = ['_ctx', '_cache', '$props', '$setup', '$data', '$options'];
    push(`function ${functionName}(${args.join(',')}){`);
    push(`return `);
    genNode(ast.codegenNode, context);
    push('}');
    return {
        code: context.code,
    };
}
function genFunctionPreamble(ast, context) {
    const { push, helper } = context;
    const VueBinging = 'Vue';
    // const helpers = ['toDisplayString']
    const aliasHelper = (s) => `${helperMapName[s]}: ${helper(s)}`;
    if (ast.helpers.length > 0) {
        push(`const {${ast.helpers.map(aliasHelper).join(', ')}} = ${VueBinging}`);
    }
    push('\n');
    // push(`const { toDisplayString: _toDisplayString } = Vue`)
    // push('\n')
    push('return ');
}
function genNode(node, context) {
    switch (node.type) {
        case 3 /* NodeTypes.TEXT */:
            genText(node, context);
            break;
        case 0 /* NodeTypes.INTERPOLATION */:
            genInterpolation(node, context);
            break;
        case 1 /* NodeTypes.SIMPLE_EXPRESSION */:
            genExpression(node, context);
            break;
        case 2 /* NodeTypes.ELEMENT */:
            genElement(node, context);
            break;
        case 5 /* NodeTypes.COMPOUND_EXPRESSION */:
            genCompoundExpression(node, context);
            break;
    }
}
function genCompoundExpression(node, context) {
    const { children } = node;
    const { push } = context;
    children.forEach((child) => {
        if (isString(child)) {
            push(child);
        }
        else {
            genNode(child, context);
        }
    });
}
function genElement(node, context) {
    const { push, helper } = context;
    const { tag, children, props } = node;
    push(`${helper(CREATE_ELEMENT_VNODE)}(`);
    genNodeList(genNullable([`'${tag}'`, props, children[0]]), context);
    push(')');
}
function genNodeList(nodes, context) {
    const { push } = context;
    nodes.forEach((node, index) => {
        if (isString(node)) {
            push(node);
        }
        else {
            genNode(node, context);
        }
        if (index < nodes.length - 1) {
            push(', ');
        }
    });
}
function genNullable(args) {
    return args.map((arg) => arg || 'null');
}
function genExpression(node, context) {
    const { push } = context;
    push(`${node.content}`);
}
function genText(node, context) {
    const { push } = context;
    push(`'${node.content}'`);
}
function genInterpolation(node, context) {
    const { push, helper } = context;
    push(`${helper(TO_DISPLAY_STRING)}(`);
    genNode(node.content, context);
    push(')');
}
function createCodegenContext() {
    const context = {
        code: '',
        push(source) {
            context.code += source;
        },
        helper(key) {
            return `_${helperMapName[key]}`;
        },
    };
    return context;
}

function baseParse(content) {
    const context = createParserContext(content);
    return createRoot(parserChildren(context, []));
}
function createRoot(children) {
    return {
        children,
        type: 4 /* NodeTypes.ROOT */,
    };
}
function parseTag(context, type) {
    const regex = /^<\/?([a-z]*)>/i;
    const match = regex.exec(context.source);
    const tag = match[1];
    advanceBy(context, match[0].length);
    if (type === TagType.End) {
        return;
    }
    return {
        type: 2 /* NodeTypes.ELEMENT */,
        tag: tag,
    };
}
var TagType;
(function (TagType) {
    TagType[TagType["Start"] = 0] = "Start";
    TagType[TagType["End"] = 1] = "End";
})(TagType || (TagType = {}));
function parseElement(context, ancestors) {
    // 解析tag
    // 删除处理完成的代码
    const element = parseTag(context, TagType.Start);
    ancestors.push(element.tag);
    element.children = parserChildren(context, ancestors);
    ancestors.pop();
    // 这里要做判断，如果 source 中的闭合标签和当前的 tag 一致，则说明是闭合标签
    // console.log(element.tag, context, 11111)
    if (element.tag === context.source.slice(2, 2 + element.tag.length)) {
        parseTag(context, TagType.End);
    }
    else {
        throw new Error('tag 不匹配：' + element.tag);
    }
    return element;
}
function parseInterpolation(context) {
    const openDelimiter = '{{';
    const closeDelimiter = '}}';
    const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length);
    advanceBy(context, openDelimiter.length);
    // context.source = context.source.slice(openDelimiter.length) // 删除 {{
    const rawContentLength = closeIndex - openDelimiter.length;
    const rawContent = parseTextData(context, rawContentLength);
    const content = rawContent.trim();
    advanceBy(context, rawContentLength + closeDelimiter.length);
    // context.source = context.source.slice(
    //   rawContentLength + closeDelimiter.length,
    // ) // }}
    return {
        type: 0 /* NodeTypes.INTERPOLATION */, // 'interpolation',
        content: {
            type: 1 /* NodeTypes.SIMPLE_EXPRESSION */,
            content: content,
        },
    };
}
function advanceBy(context, length) {
    context.source = context.source.slice(length);
}
function parserChildren(context, ancestors) {
    const nodes = [];
    let node;
    while (!isEnd(context, ancestors)) {
        const contextSource = context.source;
        if (contextSource.startsWith('{{')) {
            node = parseInterpolation(context);
        }
        else if (contextSource[0] === '<') {
            if (/[a-z]/i.test(contextSource[1])) {
                node = parseElement(context, ancestors);
            }
        }
        // 如果 node 没有值，我们就当做解析文本操作
        if (!node) {
            node = parseText(context);
        }
        nodes.push(node);
    }
    return nodes;
}
function parseText(context) {
    let endToken = ['{{', '<'];
    let endIndex = context.source.length;
    // 需要找出尽量靠前的那个结束位置的索引
    endToken.forEach((token) => {
        const index = context.source.indexOf(token);
        if (index !== -1 && endIndex > index) {
            endIndex = index;
        }
    });
    // 获取当期的内容
    // 推进
    const content = parseTextData(context, endIndex);
    advanceBy(context, content.length);
    return {
        type: 3 /* NodeTypes.TEXT */,
        content: content,
    };
}
function isEnd(context, ancestors) {
    // 2. 遇到结束标签的时候
    const contextS = context.source;
    // </div
    if (contextS.startsWith('</')) {
        for (let index = 0; index < ancestors.length; index++) {
            const tag = ancestors[index];
            if (contextS.slice(2, 2 + tag.length) === tag) {
                return true;
            }
        }
    }
    // 1. source 有值的时候
    return !contextS;
}
function parseTextData(context, length) {
    return context.source.slice(0, length);
}
function createParserContext(content) {
    return {
        source: content,
    };
}

const transform = (root, options = {}) => {
    const context = createTransformContext(root, options);
    // 1. 深度优先搜索
    traverseNode(root, context);
    createRootCodegen(root);
    // 2. 修改 text content
    root.helpers = [...context.helpers.keys()];
};
function createRootCodegen(root) {
    // 只支持有一个根节点
    // 并且还是一个 single text node
    const child = root.children[0];
    // 如果是 element 类型的话 ， 那么我们需要把它的 codegenNode 赋值给 root
    // root 其实是个空的什么数据都没有的节点
    // 所以这里需要额外的处理 codegenNode
    // codegenNode 的目的是专门为了 codegen 准备的  为的就是和 ast 的 node 分离开
    if (root.type === 2 /* NodeTypes.ELEMENT */) {
        root.codegenNode = child.codegenNode;
    }
    else {
        root.codegenNode = child;
    }
}
function createTransformContext(root, options) {
    const context = {
        root,
        nodeTransforms: options.nodeTransforms || [],
        helpers: new Map(),
        helper(key) {
            context.helpers.set(key, 1);
        },
    };
    return context;
}
function traverseNode(node, context) {
    const emitsFn = [];
    const nodeTransforms = context.nodeTransforms;
    for (let i = 0; i < nodeTransforms.length; i++) {
        const nodeTransform = nodeTransforms[i];
        const onExit = nodeTransform(node, context);
        emitsFn.push(onExit);
    }
    switch (node.type) {
        case 0 /* NodeTypes.INTERPOLATION */:
            context.helper(TO_DISPLAY_STRING);
            break;
        case 2 /* NodeTypes.ELEMENT */:
        case 4 /* NodeTypes.ROOT */:
            traverseChildren(node, context);
            break;
    }
    let i = emitsFn.length;
    while (i--) {
        emitsFn[i] && emitsFn[i]();
    }
}
function traverseChildren(node, context) {
    node.children.forEach((node) => {
        traverseNode(node, context);
    });
}

function transformElement(node, context) {
    if (node.type === 2 /* NodeTypes.ELEMENT */) {
        return () => {
            context.helper(CREATE_ELEMENT_VNODE);
            const { children, props, tag } = node;
            let vNodeChildren = children[0];
            const vNodeTag = `'${tag}'`;
            const vNodeProps = props;
            const vNodeElement = {
                type: 2 /* NodeTypes.ELEMENT */,
                tag: vNodeTag,
                children: vNodeChildren,
                props: vNodeProps,
            };
            node.codegenNode = vNodeElement;
        };
    }
}

function transformExpression(node) {
    // 处理表达式节点
    if (node.type === 0 /* NodeTypes.INTERPOLATION */) {
        node.content = processExpression(node.content);
    }
}
function processExpression(node) {
    node.content = `_ctx.${node.content}`;
    return node;
}

function isText(node) {
    return node.type === 3 /* NodeTypes.TEXT */ || node.type === 0 /* NodeTypes.INTERPOLATION */;
}
const transformText = (node) => {
    // 处理文本节点
    if (node.type === 2 /* NodeTypes.ELEMENT */) {
        return () => {
            const { children } = node;
            let currentContainer;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (isText(child)) {
                    for (let j = i + 1; j < children.length; j++) {
                        const next = children[j];
                        if (isText(next)) {
                            if (!currentContainer) {
                                currentContainer = children[i] = {
                                    type: 5 /* NodeTypes.COMPOUND_EXPRESSION */,
                                    children: [child],
                                };
                            }
                            currentContainer.children.push(' + ');
                            currentContainer.children.push(next);
                            children.splice(j, 1);
                            j--;
                        }
                        else {
                            currentContainer = undefined;
                            break;
                        }
                    }
                }
            }
        };
    }
};

function baseCompile(template) {
    const ast = baseParse(template);
    transform(ast, {
        nodeTransforms: [transformExpression, transformElement, transformText],
    });
    return generator(ast);
}

// 作为整个 mini-vue 的出口
function compileToFunction(template) {
    const { code } = baseCompile(template);
    const render = new Function('Vue', code)(runtimeDom);
    return render;
}
registerRuntimeCompiler(compileToFunction);

export { createApp, createVNode as createElementVNode, createRender, createTextVNode, getCurrentInstance, h, inject, nextTick, provide, proxyRefs, ref, registerRuntimeCompiler, renderSlots, toDisplayString };
