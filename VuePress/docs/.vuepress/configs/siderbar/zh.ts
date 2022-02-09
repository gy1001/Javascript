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
}
