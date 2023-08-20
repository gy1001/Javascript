import { shallowMount } from '@vue/test-utils'
import undoList from '@/components/undoList'
const wrapper = shallowMount(undoList, {
  propsData: {
    list: [],
  },
})

describe('测试 undoList组件', () => {
  it('undo-list 参数为 [], count 应该为0，且列表无内容', () => {
    const countEl = wrapper.find('[data-test="count"]')
    const ListItems = wrapper.findAll('[data-test="item"]')
    expect(countEl.text()).toBe('0')
    expect(ListItems.exists()).toBe(false)
    expect(ListItems.length).toEqual(0)
  })

  it('undo-list 参数为 [1,2,3时候], count 应该为3，且列表有内容,且存在删除按钮', () => {
    const wrapper = shallowMount(undoList, {
      propsData: {
        list: [
          { value: 1, status: 'div' },
          { value: 2, status: 'div' },
          { value: 3, status: 'div' },
        ],
      },
    })
    const countEl = wrapper.find('[data-test="count"]')
    const ListItems = wrapper.findAll('[data-test="item"]')
    const deleteBtnEls = wrapper.findAll('[data-test="delete"]')
    expect(countEl.text()).toBe('3')
    expect(ListItems.exists()).toBe(true)
    expect(ListItems.length).toEqual(3)
    expect(deleteBtnEls.exists()).toBe(true)
    expect(deleteBtnEls.length).toEqual(3)
  })

  it('undo-list 存在删除按钮时触发 delete 事件', () => {
    const wrapper = shallowMount(undoList, {
      propsData: {
        list: [
          { value: 1, status: 'div' },
          { value: 2, status: 'div' },
          { value: 3, status: 'div' },
        ],
      },
    })
    const deleteBtnEl = wrapper.findAll('[data-test="delete"]').at(1)
    deleteBtnEl.trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0][0]).toBe(1)
  })

  it('undoList 列表项目被点击，向外触发 change 事件', async () => {
    const wrapper = shallowMount(undoList, {
      propsData: {
        list: [
          { value: 1, status: 'div' },
          { value: 2, status: 'div' },
          { value: 3, status: 'div' },
        ],
      },
    })
    const ListItems = wrapper.findAll('[data-test="item"]')
    ListItems.at(1).trigger('click')
    expect(wrapper.emitted('change', 1)).toBeTruthy()
  })

  it('undoList 根据传入数据显示一个输入框', () => {
    const wrapper = shallowMount(undoList, {
      propsData: {
        list: [
          { value: 1, status: 'div' },
          { value: 2, status: 'input' },
          { value: 3, status: 'div' },
        ],
      },
    })
    const inputEls = wrapper.findAll('input[data-test="input"]')
    expect(inputEls.length).toBe(1)
  })

  it('undoList 中的 input 触发 blur事件时候，重置数据与状态', () => {
    const wrapper = shallowMount(undoList, {
      propsData: {
        list: [
          { value: 1, status: 'div' },
          { value: 2, status: 'input' },
          { value: 3, status: 'div' },
        ],
      },
    })
    const inputEl = wrapper.find('input[data-test="input"]')
    inputEl.setValue('123')
    inputEl.trigger('blur')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  it('输入框变化时，向外触发 change 事件', () => {
    const wrapper = shallowMount(undoList, {
      propsData: {
        list: [
          { value: 1, status: 'div' },
          { value: 7899, status: 'input' },
          { value: 3, status: 'div' },
        ],
      },
    })
    wrapper.find('input[data-test="input"]').trigger('keyup.enter')
    expect(wrapper.emitted('changeValue')).toBeTruthy()
  })
})
