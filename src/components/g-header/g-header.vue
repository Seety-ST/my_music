<template>
	<div class="g-header-item">
		<i class="icon"></i>
		<h3 class="title">ST Music</h3>
		<div class="mine-item">
			<i class="icon-mine"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'hello',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.g-header-item{
	text-align: center;
	height: 40px;
	color: #ffcd32;
	position: relative;
	.icon{
		width: 30px;
		height: 32px;
		display: inline-block;
		vertical-align: middle;
		margin-right: 9px;
		background: url("logo@2x.png");
		background-size: cover;
	}
	.title{
		display: inline-block;
		vertical-align: middle;
		font-size: 18px;
		margin-top: 5px;
	}
	.mine-item{
		position: absolute;
		top: 0;
		right: 0;
		.icon-mine{
			display: block;
			padding: 12px;
			font-size: 20px;
			color: #ffcd32; 
		}
	}
}
</style>
