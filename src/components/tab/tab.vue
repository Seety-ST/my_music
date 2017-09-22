<template>
	<div class="top-tab-item">
		<ul class="list">
			<router-link tag="li" to="/recommend"><span class="txt">推荐</span></router-link>
			<router-link tag="li" to="/singer"><span class="txt">歌手</span></router-link>
			<router-link tag="li" to="/rank"><span class="txt">排行</span></router-link>
			<router-link tag="li" to="/search"><span class="txt">搜索</span></router-link>
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
			color: #fff;
			text-align: center;
			font-size: 14px;
			padding: 14px 0px;
			border-bottom: 2px solid #222;
			&.router-link-active{
				color: #ffcd32;
				border-bottom-color: #ffcd32;
			}
		}
	}
}
</style>
