import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
	'/skill/front/': [
		{
			text: '前端',
			children: [
				'/skill/front/',
				'/skill/front/css.md',
				'/skill/front/html.md',
				'/skill/front/vue.md',
				'/skill/front/react.md',
				'/skill/front/webpack.md',
				'/skill/front/axios.md',
			],
		},
	],
	'/collect': [
		{
			text: '技术相关',
			collapsible: true,
			children: [
				{
					text: '简书',
					children: [],
				},
				{
					text: '掘金',
					children: [],
				},
			],
		},
		{
			text: '读书笔记',
			collapsible: true,
			children: [
				{
					text: '简书',
					children: [],
				},
				{
					text: '掘金',
					children: [],
				},
			],
		},
	],
	'/other': [
		{
			text: '视频博主推荐',
			collapsible: true,
			children: [
				{
					text: '今日头条',
					children: [],
				},
				{
					text: '哔哩哔哩',
					children: [],
				},
			],
		},
	],
}
