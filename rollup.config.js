import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import postcssUrl from 'postcss-url';
import json from '@rollup/plugin-json';

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

export default {
  input: 'src/index.tsx', // 替换成你的React组件入口文件路径
  output: {
    file: 'dist/sdk.js', // 替换成你想要的输出文件路径
    format: 'umd',
    name: 'ChatSDK', // 替换成你想要的SDK名称
  },
  externals: {
    'tslib': 'tslib'
  },
  plugins: [
    replace({
      // 'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    resolve(),
    commonjs({namedExports: {
      // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
      'node_modules/react/index.js': ['useState', 'useRef', 'useEffect'],
    }}),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }], // 为Node.js环境进行优化
        ['@babel/preset-react', { development: true }], // 支持JSX语法（用于.tsx文件）
      ],
    }),
    typescript(),
    postcss({
      extensions: ['.scss'],
      plugins: [
        postcssUrl({
          url: 'inline',
          maxSize: 10000, // 最大尺寸，超过会被忽略
          outputFormat: 'esm', // esm, commonjs, css, default commonjs
        }),
      ],
    }),
    terser(),
    json()
  ],
};
