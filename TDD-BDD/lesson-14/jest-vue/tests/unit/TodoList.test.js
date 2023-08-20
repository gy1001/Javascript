import { shallowMount } from '@vue/test-utils'
import TodoList from '@/container/TodoList/TodoList.vue'
import UndoList from '@/components/undoList.vue'
const wrapper = shallowMount(TodoList)

describe('测试 TodoList 组件', () => {
  it('TodoLis 组件初始化时，undoList 应该是空的', () => {
    expect(Array.isArray(wrapper.vm.undoList)).toBeTruthy()
    expect(wrapper.vm.undoList.length).toBe(0)
  })

  it('TodoLis 执行 addItem 的时候，会增加一个内容', () => {
    const str = 'i am first todo'
    wrapper.vm.addItem(str)
    expect(wrapper.vm.undoList.length).toBe(1)
    expect(wrapper.vm.undoList[0]).toEqual({ value: str, status: 'div' })
  })

  it('Todo list 调用 undoList 组件时候，应该传递 list 参数', () => {
    const undoListWrapper = wrapper.findComponent(UndoList)
    expect(undoListWrapper.props('list')).toBeTruthy()
  })

  it('TodoList 中 deleteItem 事件被调用时，undoList 数据应该减少一个', () => {
    wrapper.setData({
      undoList: [
        { value: 1, status: 'div' },
        { value: 2, status: 'div' },
        { value: 3, status: 'div' },
      ],
    })
    wrapper.vm.deleteItem(1)
    expect(wrapper.vm.undoList).toEqual([
      { value: 1, status: 'div' },
      { value: 3, status: 'div' },
    ])
  })

  it('TodoList 中 changItemStatus 事件被调用时，undoList 数据会发生变化', () => {
    wrapper.setData({
      undoList: [
        { value: 1, status: 'div' },
        { value: 2, status: 'div' },
        { value: 3, status: 'div' },
      ],
    })
    wrapper.vm.changItemStatus(1)
    expect(wrapper.vm.undoList).toEqual([
      { value: 1, status: 'div' },
      { value: 2, status: 'input' },
      { value: 3, status: 'div' },
    ])
  })

  it('TodoList 中触发 resetList事件时，input框消失', () => {
    wrapper.setData({
      undoList: [
        { value: 1, status: 'div' },
        { value: 2, status: 'input' },
        { value: 3, status: 'div' },
      ],
    })
    wrapper.vm.resetList()
    expect(wrapper.vm.undoList).toEqual([
      { value: 1, status: 'div' },
      { value: 2, status: 'div' },
      { value: 3, status: 'div' },
    ])
  })

  it('TodoList 触发 changeValue事件，数据变化', () => {
    wrapper.setData({
      undoList: [
        { value: 1, status: 'div' },
        { value: 2, status: 'input' },
        { value: 3, status: 'div' },
      ],
    })
    wrapper.vm.changeValue(1, 'test')
    expect(wrapper.vm.undoList).toEqual([
      { value: 1, status: 'div' },
      { value: 'test', status: 'div' },
      { value: 3, status: 'div' },
    ])
  })
})
