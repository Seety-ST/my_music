<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
		  <slot>
		  </slot>
		</div>
		<div class="dots">
		  <span class="dot" ></span>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	name: 'slider',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	mounted () {
		var self = this
		new BScroll(self.$ref.sliderGroup)
	},
	methods: {

	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slider{
	min-height: 1px;
	.slider-group{
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		.slider-item{
			float: left;
			box-sizing: border-box;
			overflow: hidden;
			text-align: center;
			a{
				display: block;
				width: 100%;
				overflow: hidden;
				text-decoration: none;
			}
			  
			img{
				display: block;
				width: 100%;
			}
			  
		}  
	}
	  
	  
	.dots{
		position: absolute;
		right: 0;
		left: 0;
		bottom: 12px;
		text-align: center;
		font-size: 0;
		.dot{
			display: inline-block;
			margin: 0 4px;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			&.active{
				width: 20px;
		    	border-radius: 5px;
		    	background: #fff;
			}
	      
		}
	}
	  
	  
	    
	    
}
  
</style>
