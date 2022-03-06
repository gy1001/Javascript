import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { sidebarZh } from '../.vuepress/configs/siderbar/zh'

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
		[
			'vuepress-plugin-comment',
			{
				choosen: 'valine',
				// options选项中的所有参数，会传给Valine的配置
				options: {
					el: '#valine-vuepress-comment',
					appId: 'G2osIAGrkQkOPu3B17DR2lAQ-gzGzoHsz',
					appKey: 'cfCR0oqsDLtt6zcIzCoHOhrX',
					placeholder: '同道中人，文明留言...',  // 评论框占位提示符
					lang: 'zh-cn', // 支持中文
				}
			}
		]]
})
