import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

const wrapper = shallowMount(Header)
const input = wrapper.find('input[data-test="input"]')

describe('Header.vue', () => {
  it('Header 包含 input', () => {
    expect(input.exists()).toBe(true)
  })

  it('Header中 input的初始值为空', () => {
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })

  it('Header中 input输入内容时数据更新', () => {
    input.setValue('hello world')
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('hello world')
  })

  it('Header 中input 框输入回车时候，无内容时，无反应', () => {
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })

  it('Header 中input 框输入回车时候，有内容时，向外触发事件 add, 并清空 inputValue', () => {
    input.setValue('111')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
    expect(wrapper.vm.inputValue).toBe('')
  })

  it('header 样式发生改变，做提示', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
