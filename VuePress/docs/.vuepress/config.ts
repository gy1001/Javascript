import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { sidebarZh } from '../.vuepress/configs/siderbar/zh'
import { copyCode } from "vuepress-plugin-copy-code2";
export default defineUserConfig<DefaultThemeOptions>({
	head: [
		['meta', { name: 'referrer', content: 'no-referrer' }],
	],
	// 站点配置
	lang: 'en-US',
	title: 'gyfly.top',
	description: '随便写写',
	theme: '@vuepress/theme-default',
	themeConfig: {
		contributors: false,
		lastUpdated: true,
		lastUpdatedText: '上次更新',
		logo: '/images/logo.png',
		navbar: [
			{
				text: '技术相关',
				link: '/skill/front/',
			},
			{
				text: '美文推荐',
				link: '/collect',
			},
			{
				text: '其他',
				link: '/other/',
			},
			{
				text: '休闲娱乐',
				children: [
					{
						text: '更新日志',
						link: 'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
					},
				]
			}
		],
		locales: {
			'/': {
				sidebar: sidebarZh,
			},
		},
	},
	plugins: [
		['@vuepress/nprogress', true],
		['@vuepress/back-to-top', true],
		copyCode({
			showInMobile: true,
			pure: false,
			locales: {
				'/': {
					copy: '复制',
					hint: '复制成功'
				}
			}
		})
	]
})
