import typescript from '@rollup/plugin-typescript'
import * as fs from 'fs'

const packageConfig = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

export default {
  input: './src/index.ts',
  output: [
    // 1. cjs
    // 2. esm
    {
      format: 'cjs',
      file: packageConfig.main,
    },
    {
      format: 'es',
      file: packageConfig.module,
    },
  ],
  plugins: [typescript()],
}
