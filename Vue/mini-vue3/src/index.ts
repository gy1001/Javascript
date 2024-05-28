// 作为整个 mini-vue 的出口
export * from './runtime-dom'
export * from './reactivity'
import { baseCompile } from './compiler-core/src'
import * as runtimeDom from './runtime-dom'

function compileToFunction(template: string) {
  const { code } = baseCompile(template)
  const render = new Function('Vue', code)(runtimeDom)
  return render
}

runtimeDom.registerRuntimeCompiler(compileToFunction)
