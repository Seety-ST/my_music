<template>
	<div class="progress-circle">
		<svg :width="circle" :height="circle" viewBox="0,0,100,100">
		<circle r="50" cx="50" cy="50" class="progress-background" fill="transparent"></circle>
		<circle r="50" cx="50" cy="50" class="progress-bar" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset" fill="transparent"></circle>
		</svg>
		<slot></slot>
	</div>
</template>

<script>
// stroke-dasharray 定义描边的虚线长度
// stroke-dashoffset 定义虚线描边的偏移量
export default {
	name: 'progress',
	props: {
		circle: {
			type: Number,
			default: 100
		},
		percent: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			dasharray: Math.PI * 2 * 50
		}
	},
	created () {
	},
	mounted () {
	},
	methods: {
	},
	computed: {
		dashoffset () {
			return (1 - this.percent) * this.dasharray
		}
	},
	watch: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.progress-circle{
	circle{
		stroke-width: 8px;
		-webkit-transform-origin: center;
		transform-origin: center;
	}
}
.progress-background{
	stroke: rgba(255,205,49,0.5);
	transform: scale(0.9);
}
.progress-bar{
	transform: scale(0.9) rotate(-90deg);
	stroke: #ffcd32;
}
</style>
