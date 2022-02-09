import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { sidebarZh } from '../.vuepress/configs/siderbar/zh'

export default defineUserConfig<DefaultThemeOptions>({
	// 站点配置
	lang: 'en-US',
	title: 'gyfly.top',
	description: '文章杂谈',
	theme: '@vuepress/theme-default',
	themeConfig: {
		lastUpdated: true,
		logo: '/images/logo.png',
		navbar: [
			{
				text: '技术相关',
				link: '/skill/front/js',
			},
			{
				text: '美文推荐',
				link: '/collect',
			},
			{
				text: '其他',
				link: '/other',
			},
		],
		locales: {
			'/': {
				sidebar: sidebarZh,
			},
		},
	},
})
