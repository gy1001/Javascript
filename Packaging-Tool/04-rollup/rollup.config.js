import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [
    nodeResolve(),
    babel({
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**', // 只编译我们的代码
    }),
  ],
}
