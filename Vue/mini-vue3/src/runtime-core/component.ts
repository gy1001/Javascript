import { proxyRefs } from '../reactivity'
import { shallowReadonly } from '../reactivity/reactive'
import { emit } from './componentEmit'
import { initProps } from './componentProps'
import { PublicInstanceProxyHandlers } from './componentPublicInstance'
import { initSlots } from './componentSlots'

let currentInstance = null
export function createComponentInstance(vnode: any, parent) {
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
  }
  // 这里填充第一个参数，用户使用的时候就直接从第二个参数开始调用就可以了
  component.emit = emit.bind(null, component)
  return component
}

export function setupComponent(instance: any) {
  // 初始化props
  initProps(instance, instance.vnode.props)
  // 初始化slots
  initSlots(instance, instance.vnode.children)
  // 初始化事件
  // setupEvent(instance)
  setUpStatefulComponent(instance)
}

export function setUpStatefulComponent(instance) {
  const component = instance.vnode.type
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)
  const { setup } = component
  if (setup) {
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    })
    setCurrentInstance(null)
    // function 或者 object
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult) {
  // object
  //  TODO function类型
  if (typeof setupResult === 'object') {
    instance.setupState = proxyRefs(setupResult) // 达到可以不用写.value的用途
  }
  finishSetupComponent(instance)
}

function finishSetupComponent(instance) {
  const Component = instance.type

  if (_compiler && !Component.render) {
    if (Component.template) {
      Component.render = _compiler(Component.template)
    }
  }

  instance.render = Component.render
}

export function getCurrentInstance() {
  return currentInstance
}

export function setCurrentInstance(instance) {
  currentInstance = instance
}

let _compiler

export function registerRuntimeCompiler(compiler) {
  _compiler = compiler
}
