import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
	'/skill/front/': [
		{
			text: 'HTML5',
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
		{
			text: 'mini-前端框架',
			children: [
				"/skill/front/mini/vue.md",
			]
		}
	],

	'/collect': [
		{
			text: '技术相关',
			collapsible: false,
			children: [
				{
					text: '简书',
					children: [],
				},
				{
					text: '掘金',
					children: [],
				},
				{
					text: '其他',
					children: [
						{
							text: "设计模式",
							link: 'https://refactoringguru.cn/design-patterns'
						},
						{
							text: '设计结构',
							link: "https://mp.weixin.qq.com/s/PzncE_ofS4M0b6KB9ESWnA"
						}
					]
				}
			],
		},
		{
			text: '读书笔记',
			collapsible: false,
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
			collapsible: false,
			children: [
				{
					text: '今日头条',
					children: [
						// {
						// 	text: '阿斗归来了',
						// 	link: ''
						// }
					],
				},
				{
					text: '哔哩哔哩',
					children: [],
				},
			],
		},
	],
}
