import { mount } from '@vue/test-utils'
import TodoList from '@/container/TodoList/TodoList.vue'
import { nextTick } from 'vue'
import store from '@/store'

it(`
  1. 用户会在 header 输入框输入内容
  2. 用户会点击回车按钮
  3. 列表项应该增加用户输入内容的列表项 
`, async () => {
  const wrapper = mount(TodoList, { store })
  const inputEl = wrapper.find('input.header-input')
  const content = '我是代办事项1'
  inputEl.setValue(content)
  inputEl.trigger('change')
  inputEl.trigger('keyup.enter')
  await nextTick()
  const listItems = wrapper.findAll('li.item')
  expect(listItems.length).toBe(1)
  expect(listItems.at(0).find('.text').text()).toBe(content)
  // 如果不想具体选择，也可以使用 toContain 方法来做判断
  // expect(listItems.at(0).text()).toContain(content)
})
