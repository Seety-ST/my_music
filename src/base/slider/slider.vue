<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
		  <slot>
		  </slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="{active:current_index===index}"></span>
		</div>
	</div>
</template>

<script>
import {addclass} from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
	name: 'slider',
	props: {
		loop: {
			type: Boolean,
			default: true
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		interval: {
			type: Number,
			default: 4000
		}
	},
	data () {
		return {
			dots: [],
			current_index: 0
		}
	},
	mounted () {
		var self = this
		setTimeout(() => {
			self._getwidth()
			self._initDots()
			self.init()
			if (self.autoplay) {
				self._autoplay()
			}
		}, 20)
		window.addEventListener('resize', () => {
			if (!this.slider) {
				return
			}
			self._getwidth(true)
			console.info(BScroll)
			self.slider.refresh()
		})
	},
	methods: {
		_getwidth (isResize) {
			let self = this
			self.children = self.$refs.sliderGroup.children
			let width = 0
			let sliderwidth = self.$refs.slider.clientWidth
			for (let i = 0; i < self.children.length; i++) {
				let child = self.children[i]
				addclass(child, 'slider-item')
				child.style.width = sliderwidth + 'px'
				width += sliderwidth
			}
			if (self.loop && !isResize) {
				width += 2 * sliderwidth
			}
			self.$refs.sliderGroup.style.width = width + 'px'
		},
		_initDots () {
			var self = this
			self.dots = new Array(self.children.length)
		},
		init () {
			let self = this
			this.slider = new BScroll(self.$refs.slider, {
				scrollX: true,
				momentum: false,
				snap: {
					loop: self.loop
				},
				click: true
			})
			self.slider.on('scrollEnd', () => {
				let pageindex = this.slider.getCurrentPage().pageX
				if (this.loop) {
					pageindex -= 1
				}
				self.current_index = pageindex
				if (self.autoplay) {
					self._autoplay()
				}
			})
			this.slider.on('beforeScrollStart', () => {
				if (self.autoplay) {
					clearTimeout(this.timer)
				}
			})
		},
		_autoplay () {
			var self = this
			let pageindex = self.current_index + 1
			if (self.loop) {
				pageindex += 1
			}
			self.timer = setTimeout(() => {
				this.slider.goToPage(pageindex, 0, 400)
			}, self.interval)
		}
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
			background: #fff;
			&.active{
				width: 20px;
		    	border-radius: 5px;
		    	background: #fff;
			}
	      
		}
	}
	  
	  
	    
	    
}
  
</style>
