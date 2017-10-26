<template>
  <div class="player" v-if="playlist" v-show="playlist.length>0">
  	<transition name="normal">
		  	<div class="normal-player" v-show="fullScreen">
				<div class="top">
					<div class="back" @click="back"><i  class="icon-back"></i></div>
					<h1 class="title">{{curretsong.album}}</h1>
					<h2 class="subtitle">{{curretsong.singer}}</h2>
				</div>
				<div class="middle">
					<div class="middle-l">
						<div class="cd-wrapper">
							<div class="cd" :class="rotate">
								<img class="image" :src="curretsong.image" alt="">
							</div>
						</div>	
					</div>
				</div>
				<div class="bottom">
					<div class="dot-wrapper">
						<span class="dot"></span>
						<span class="dot"></span>
					</div>
					<div class="progress-wrapper">
						<span class="time time-l">{{formapTime(currentTime)}}</span>
						<div class="progress-bar-wrapper">
							<progress-bar :percent="percent" @changeProgress="changeProgress"></progress-bar>
						</div>	
						<span class="time time-r">{{formapTime(curretsong.duration)}}</span>
					</div>
					<div class="operators">
						<div class="icon i-left">
							<i class="icon-sequence"></i>
						</div>
						<div class="icon i-left" @click="prev">
							<i class="icon-prev"></i>
						</div>
						<div class="icon i-center" @click="toggle_palying" >
							<i :class="playIcon"></i>
						</div>
						<div class="icon i-right" @click="next">
							<i class="icon-next" ></i>
						</div>
						<div class="icon i-right">
							<i class="icon icon-not-favorite"></i>
						</div>
					</div>
				</div>
		  	</div>
  	</transition>
  	
  	<transition name="mini">
		<div class="min-player" v-show="!fullScreen" @click="open">
			<div class="icon">
				<img  width="40" height="40" class="play pause" :src="curretsong.image">
			</div>
			<div class="text">
				<h2 class="name">{{curretsong.album}}</h2>
				<p class="desc">{{curretsong.singer}}</p>
			</div>
			<div class="control">
				<div class="progress-circle" @click.stop.prevent="toggle_palying">
					<i class="icon-mini" :class="miniIcon"></i>
				</div>
				
			</div>
			<div class="control" >
				<i class="icon-playlist"></i>
			</div>
		</div>
  	</transition>
  	<audio ref="audio" :src="curretsong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import progress from 'base/progress/progress'
export default {
	name: 'player',
	data () {
		return {
			singer: [],
			songReady: false,
			currentTime: ''
		}
	},
	created () {
		console.log(this.currentTime)
	},
	computed: {
		playIcon () {
			return this.playing ? 'icon-pause' : 'icon-play'
		},
		miniIcon () {
			return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
		},
		rotate () {
			return this.playing ? 'play' : 'play pause'
		},
		percent () {
			return (this.currentTime / this.curretsong.duration)
		},
		...mapGetters([
			'fullScreen',
			'playlist',
			'curretsong',
			'playing',
			'currentIndex'
		])
	},
	methods: {
		back () {
			let self = this
			self.setFullScreen(false)
		},
		open () {
			let self = this
			self.setFullScreen(true)
		},
		toggle_palying () {
			let self = this
			self.setPlaying(!self.playing)
		},
		prev () {
			let self = this
			if (!self.songReady) {
				return
			}
			let index = self.currentIndex - 1
			if (index < -1) {
				index = self.playlist.length - 1
			}
			self.setCurrentIndex(index)
			if (!self.playing) {
				self.toggle_palying()
			}
			self.songReady = false
		},
		next () {
			let self = this
			if (!self.songReady) {
				return
			}
			let index = self.currentIndex + 1
			if (index > self.playlist.length) {
				index = 0
			}
			self.setCurrentIndex(index)
			if (!self.playing) {
				self.toggle_palying()
			}
			self.songReady = false
		},
		ready () {
			let self = this
			self.songReady = true
		},
		error () {
			let self = this
			self.songReady = true
		},
		updateTime (e) {
			let self = this
			self.currentTime = e.target.currentTime
		},
		changeProgress (progress) {
			let self = this
			self.$refs.audio.currentTime = self.curretsong.duration * progress
			if (!self.playing) {
				self.toggle_palying()
			}
		},
		formapTime (interval) {
			interval = interval | 0
			let min = (interval / 60) | 0 // | 0 的作用是向下取整 和Math.float(interval/60)效果一样
			let second = this._pad((interval % 60))// 获取秒
			return `${min}:${second}`
		},
		_pad (num) {
			let n = 2 // 表示几位数处理
			let len = num.toString().length
			while (len < n) {
				num = '0' + num
				len++
			}
			return num
		},
		...mapMutations({
			setFullScreen: 'SET_FULLSCREEN',
			setPlaying: 'SET_PLAYING',
			setCurrentIndex: 'SET_CURRENTINDEX'
		})
	},
	components: {
		'progress-bar': progress
	},
	watch: {
		curretsong () {
			let self = this
			self.$nextTick(() => {
				self.$refs.audio.play()
			})
		},
		playing (newPlaying) {
			let self = this
			let audio = self.$refs.audio
			self.$nextTick(() => {
				newPlaying ? audio.play() : audio.pause()
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.player{
	.normal-player{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 150;
		background: #222;
		.top{
			position: relative;
			margin-bottom: 25px;
			.back{
				position: absolute;
				top: 0;
				left: 6px;
				z-index: 50;
				.icon-back{
					display: block;
					padding: 9px;
					font-size: 22px;
					color: #ffcd32;
					-webkit-transform: rotate(-90deg);
					transform: rotate(-90deg);
				}
			}
			.title{
				width: 70%;
				margin: 0 auto;
				line-height: 40px;
				text-align: center;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				font-size: 18px;
				color: #fff;
			}
			.subtitle{
				line-height: 20px;
				text-align: center;
				font-size: 14px;
				color: #fff;
			}
		}
		.middle{
			position: fixed;
			width: 100%;
			top: 80px;
			bottom: 170px;
			white-space: nowrap;
			font-size: 0;
			.middle-l{
				display: inline-block;
				vertical-align: top;
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 80%;
				.cd-wrapper{
					position: absolute;
					left: 10%;
					top: 0;
					width: 80%;
					height: 100%;
					.cd{
						width: 100%;
						height: 100%;
						box-sizing: border-box;
						border: 10px solid rgba(255,255,255,0.1);
						border-radius: 50%;
						.image{
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
						&.play{
							animation: rotate 20s linear infinite;
						}
						&.pause{
							animation-play-state: paused;
						}
					}
				}
			}
		}
		.bottom{
			position: absolute;
			bottom: 50px;
			width: 100%;
			.dot-wrapper{
				text-align: center;
				font-size: 0;
				.dot{
					display: inline-block;
					vertical-align: middle;
					margin: 0 4px;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: rgba(255,255,255,0.5);
					&.dot-active{
						width: 20px;
						border-radius: 5px;
						background: rgba(255,255,255,0.8);
					}
				}
			}
			.progress-wrapper{
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				width: 80%;
				margin: 0px auto;
				padding: 10px 0;
				.time{
					color: #fff;
					font-size: 12px;
					-webkit-box-flex: 0;
					-ms-flex: 0 0 30px;
					flex: 0 0 30px;
					line-height: 30px;
					width: 30px;
					.time-l{
						text-align: left;
					}
					.time-r{
						text-align: right;
					}
				}
				.progress-bar-wrapper{
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
					
				}
			}
			.operators{
				text-align: center;
				font-size: 0;
				display: -webkit-box;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				.icon{
					-webkit-box-flex: 1;
					color: #ffcd32;
					i{
						font-size: 30px;
					}
					&.i-left{
						text-align: right;
					}
					&.i-center{
						padding: 0 20px;
						text-align: center;
					}
					&.i-right{
						text-align: left;
					}
				}
			}
		}
		&.normal-enter-active, &.normal-leave-active{
			transition: all 0.4s;
			.top, .bottom{
				transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
			}
		}
		&.normal-enter, &.normal-leave-to{
			opacity: 0;
			.top{
			  transform: translate3d(0, -100px, 0);
			}
			.bottom{
			  transform: translate3d(0, 100px, 0);
			}
		}
	}
	.min-player{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 180;
		width: 100%;
		height: 60px;
		background: #333;
		&.mini-enter-active, &.mini-leave-active{
			transition: all .4s;
		}
		&.mini-enter, &.mini-leave-to{
			opacity: 0;
		}
		.icon{
			-webkit-box-flex: 0;
			-ms-flex: 0 0 40px;
			flex: 0 0 40px;
			width: 40px;
			padding: 0 10px 0 20px;
			img{
				border-radius: 50%;
			}
		}
		.text{
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			-webkit-box-flex: 1;
			-ms-flex: 1;
			flex: 1;
			line-height: 20px;
			overflow: hidden;
			.name{
				margin-bottom: 2px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				font-size: 14px;
				color: #fff;
			}
			.desc{
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				font-size: 12px;
				color: rgba(255,255,255,0.3);
			}
		}
		.control{
			-webkit-box-flex: 0;
			-ms-flex: 0 0 30px;
			flex: 0 0 30px;
			width: 30px;
			padding: 0 10px;
			.progress-circle{
				position: relative;
				.icon-mini{
					font-size: 32px;
					position: absolute;
					left: 0;
					top: -15px;
					color: rgba(255,205,49,0.5);
					&.icon-pause-mini{
						
					}
				}
			}
			.icon-playlist{
				font-size: 30px;
				color: rgba(255,205,49,0.5);
			}
			
		}
	}
}
@keyframes rotate {
	0%{
		transform: rotate(0)
	}
	100%{
		transform: rotate(360deg)
	}
}
</style>
