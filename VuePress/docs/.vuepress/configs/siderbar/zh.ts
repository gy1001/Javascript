import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
	'/skill/front/': [
		{
			text: 'HTML5',
			children: [
				'/skill/front/',
				'/skill/front/html.md',
				'/skill/front/css.md',
				'/skill/front/js.md',
				'/skill/front/vue.md',
				'/skill/front/react.md',
				'/skill/front/webpack.md',
				'/skill/front/axios.md',
				'/skill/front/todo.md',
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
							text: '数据结构',
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
	'/other/': [
		{
			text: '其他推荐',
			collapsible: false,
			children: [
				'/other/',
				'/other/video',
			]
			// children: [
			// 	{
			// 		text: '今日头条',
			// 		children: [
			// 			{
			// 				text: '阿斗归来了',
			// 				link: 'https://www.toutiao.com/c/user/token/MS4wLjABAAAARTrXWnm9VgIes8jP2-0grbDX3CZPnkN9Wyl9_Xyb-i0/?'
			// 			},
			// 			{
			// 				text: ''
			// 			}
			// 		],
			// 	},
			// 	{
			// 		text: '哔哩哔哩',
			// 		children: [],
			// 	},
			// ],
		},
	],
}
