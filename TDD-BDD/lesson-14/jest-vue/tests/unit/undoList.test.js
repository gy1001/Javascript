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
        list: [1, 2, 3],
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
        list: [1, 2, 3],
      },
    })
    const deleteBtnEl = wrapper.findAll('[data-test="delete"]').at(1)
    deleteBtnEl.trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0][0]).toBe(1)
  })
})
