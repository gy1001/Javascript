import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
// shallowMount: 浅层渲染，只渲染外层组件，不处理子组件中的同名属性
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})


import  Vue from "vue"
import helloWorld from "@/components/HelloWorld.vue";

describe("测试 dom 正常渲染", () => {
  it("render props.msg when passed", () => {
    const divEl = document.createElement('div')
    divEl.className = "root"
    document.body.appendChild(divEl)
    new Vue({
      render: h => h(helloWorld),
      props: {
        msg: '我是孙悟空'
      }
    }).$mount(".root")
    expect(document.getElementsByClassName('hello').length).toBe(1)
  })
})
