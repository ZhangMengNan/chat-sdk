import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace'

export default {
  input: 'src/index.tsx', // 替换成你的React组件入口文件路径
  output: {
    file: 'dist/sdk.js', // 替换成你想要的输出文件路径
    format: 'umd',
    name: 'ChatSDK', // 替换成你想要的SDK名称
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser')
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }], // 为Node.js环境进行优化
        ['@babel/preset-react', { development: true }], // 支持JSX语法（用于.tsx文件）
      ],
    }),
    typescript()
  ],
};
