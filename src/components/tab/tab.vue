<template>
	<div class="top-tab-item">
		<ul class="list">
			<li><span class="txt">推荐</span></li>
			<li><span class="txt">歌手</span></li>
			<li><span class="txt">排行</span></li>
			<li><span class="txt">搜索</span></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'tab',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-tab-item{
	.list{
		display: -webkit-box;
		li{
			-webkit-box-flex: 1;
			color: #222;
		}
	}
}
</style>
