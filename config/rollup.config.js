import path from 'path'
import rollupTypescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import { DEFAULT_EXTENSIONS } from '@babel/core'
// import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'
import pkg from '../package.json'

const paths = {
	input: path.join(__dirname, '../src/index.ts'),
	output: path.join(__dirname, '../lib')
}

// rollup 配置项
const rollupConfig = [{
	input: paths.input,
	output: [
		// 输出 commonjs 规范的代码
		{
			file: path.join(paths.output, 'index.js'),
			format: 'cjs',
			name: pkg.name,
			sourcemap: true
		},
		// 输出 es 规范的代码
		{
			file: path.join(paths.output, 'index.esm.js'),
			format: 'esm',
			name: pkg.name,
			sourcemap: true
		}
	],
	external: [
		'react',
		'react-dom',
	],
	plugins: [
		peerDepsExternal({
			packageJsonPath: '../package.json',
			includeDependencies: true,
		}),
		// 验证导入的文件
		eslint({
			throwOnError: true, // lint 结果有错误将会抛出异常
			throwOnWarning: true,
			include: ['src/**/*.ts'],
			exclude: ['node_modules/**', '*.js', 'dist/**']
		}),

		// 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
		commonjs(),

		// 配合 commnjs 解析第三方模块
		resolve({
			// 将自定义选项传递给解析插件
			customResolveOptions: {
				moduleDirectory: 'node_modules'
			}
		}),
		rollupTypescript(),
		babel({
			runtimeHelpers: true,
			// 只转换源代码，不运行外部依赖
			exclude: 'node_modules/**',
			tsconfig: '../tsconfig.json',
			include: '../src',
			// babel 默认不支持 ts 需要手动添加
			extensions: [...DEFAULT_EXTENSIONS, '.ts']
		}),
		// terser()

	]
}, {
	input: paths.input,
	output: [{
		// filename: 'index.d.ts',
		file: path.join(paths.output, 'es/type/index.d.ts'),
		// file: 'index.d.ts',
		// dir: path.join(paths.output, 'es/type'),
		format: 'esm'
	}],
	plugins: [dts()]
}
]

export default rollupConfig
