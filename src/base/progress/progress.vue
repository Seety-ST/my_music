<template>
	<div class="progress-bar" ref="progressBar" @click="clickProgress">
		<div class="bar-inner">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper" ref="progressBtn" 
				@touchstart="touchstart"
				@touchmove="touchmove"
				@touchend="touchend"
				>
				<div class="progress-btn"></div>
			</div>	
		</div>	
	</div>
</template>

<script>
import {prefixstyle} from 'common/js/dom'
const transform = prefixstyle('transform')
const btnWidth = 16
export default {
	name: 'progress',
	props: {
		percent: {
			type: Number,
			default: 0
		}
	},
	created () {
		let self = this
		self.touch = {}
	},
	mounted () {
		console.log(this.percent)
	},
	methods: {
		touchstart (e) {
			let self = this
			self.touch.initial = true
			self.touch.startX = e.touches[0].pageX
			self.touch.curretLeft = self.$refs.progress.clientWidth
		},
		touchmove (e) {
			let self = this
			if (!self.touch.initial) {
				return
			}
			const delta = e.touches[0].pageX - self.touch.startX
			const offsetWidth = Math.min(self.$refs.progressBar.clientWidth - btnWidth, Math.max(0, self.touch.curretLeft + delta))
			self._offsetWidth(offsetWidth)
		},
		touchend () {
			let self = this
			self.touch.initial = false
			self._toggleProgress()
		},
		clickProgress (e) {
			console.log(e.offsetX)
			let self = this
			self._offsetWidth(e.offsetX)
			self._toggleProgress()
		},
		_toggleProgress () {
			let self = this
			let progress = self.$refs.progress.clientWidth / (self.$refs.progressBar.clientWidth - btnWidth)
			self.$emit('changeProgress', progress)
		},
		_offsetWidth (progress) {
			let self = this
			self.$refs.progress.style.width = `${progress}px`
			self.$refs.progressBtn.style[transform] = `translate3d(${progress}px,0,0)`
		}
	},
	watch: {
		percent (newpercent) {
			let self = this
			if (newpercent > 0 && !self.touch.initial) {
				let progressWidth = (self.$refs.progressBar.clientWidth - btnWidth) * newpercent
				self._offsetWidth(progressWidth)
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .progress-bar{
  	height: 30px;
  	.bar-inner{
  		position: relative;
  		top: 13px;
  		height: 4px;
  		background: rgba(0,0,0,0.3);
  		.progress{
  			position: absolute;
  			height: 100%;
  			background: #ffcd32;
  			
  		}
  		.progress-btn-wrapper{
  			position: absolute;
  			left: -8px;
  			top: -13px;
  			width: 30px;
  			height: 30px;
  			.progress-btn{
  				position: relative;
  				top: 7px;
  				left: 7px;
  				box-sizing: border-box;
  				width: 16px;
  				height: 16px;
  				border: 3px solid #fff;
  				border-radius: 50%;
  				background: #ffcd32;
  			}
  		}
  	}
  }
</style>
