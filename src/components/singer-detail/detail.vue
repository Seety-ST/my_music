<template>
	<transition name="fade">
		<div class="singer-detail" >
			
		</div>	
	</transition>
</template>

<script>

export default {
	name: 'detail',
	data () {
		return {
			msg: ''
		}
	},
	created () {
		console.log(this.$route.params.id)
	},
	methods: {
	},
	components: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.singer-detail{
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 100;
	background-color: #222;
}
.fade-enter-active,.fade-leave-active{
	transition: all .3s ease-in;
}
.fade-enter,.fade-leave-to{
	transform: translateX(100%);
}
</style>
