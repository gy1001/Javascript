<template>
	<div>
		<h1>{{msg}}</h1>
		<a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
	</div>
</template>

<script>
export default {
	data() {
		return {
			msg: 'hello vue2+vite',
		}
	},
}
</script>

<style scoped lang="css">
div {
	text-align: center;
}
</style>
