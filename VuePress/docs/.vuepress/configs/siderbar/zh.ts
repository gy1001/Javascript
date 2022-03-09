import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
	'/zh/skill/front/': [
		{
			text: 'HTML5三剑客',
			children: [
				'/zh/skill/front/',
				'/zh/skill/front/html.md',
				'/zh/skill/front/css.md',
				'/zh/skill/front/js.md',

			],
		},
		{
			text: 'JavaScript相关',
			children: [
				'/zh/skill/front/module.md',
				'/zh/skill/front/vue.md',
				'/zh/skill/front/react.md',
				'/zh/skill/front/webpack.md',
				'/zh/skill/front/axios.md',
				'/zh/skill/front/todo.md',
			]
		},
		{
			text: 'mini-前端框架',
			children: [
				"/zh/skill/front/mini/vue.md",
			]
		},
		{
			text: '一些翻译',
			children: [
				"/zh/skill/front/translate/require-js.md",
			]
		}
	],

	'/zh/collect': [
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
	'/zh/other/': [
		{
			text: '其他推荐',
			collapsible: false,
			children: [
				'/zh/other/',
				'/zh/other/video',
			]
		},
	],
}


export const sidebarEn: SidebarConfig = {}