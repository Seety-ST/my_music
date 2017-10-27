<template>
	<div class="singer-list" >
		<div class="title-item">
			<i class="icon-back" @click="back"></i>
			<div class="title-txt" v-html="title"></div>
		</div>
		<div class="avator-img" :style="image" ref="bgimg">
			<div class="play-wrapper" ref="playWrap">
				<div class="play" @click="randomplay">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
		</div>
		<div class="bg-layer" ref="bgLayer"></div>
		<scroll @scroll="scroll" :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll">
			<div class="song-list-wrapper">
				<song-list :song="songs" @select="selectItem"></song-list>
			</div>
		</scroll>
	</div>	
</template>

<script>
import scroll from 'base/scroll/scroll'
import songList from 'base/song-list/song-list'
import {prefixstyle} from 'common/js/dom'
import {mapActions} from 'vuex'
const RESEVERT_HEIGHT = 40
const transform = 'transform'
export default {
	name: 'singerList',
	props: {
		title: {
			type: String,
			default: ''
		},
		songs: {
			type: Array,
			default: []
		},
		img: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			msg: [],
			scrollY: 0
		}
	},
	created () {
		var self = this
		self.probeType = 3
		self.listenScroll = true
	},
	mounted () {
		let self = this
		console.log(self.$refs.list)
		self.imageHeiht = self.$refs.bgimg.clientHeight
		self.minTranlateY = -self.imageHeiht + RESEVERT_HEIGHT
		self.$refs.list.$el.style.top = `${self.imageHeiht}px`
	},
	methods: {
		scroll (pos) {
			let self = this
			self.scrollY = pos.y
		},
		back () {
			let self = this
			self.$router.back()
		},
		randomplay () {
			let self = this
			console.log(self.songs)
			self.randomPlay({
				list: self.songs
			})
		},
		selectItem (item, index) {
			let self = this
			self.selectPlay({
				list: self.songs,
				index
			})
		},
		...mapActions([
			'selectPlay',
			'randomPlay'
		])
	},
	watch: {
		scrollY (newY) {
			let self = this
			let zIndex = 0
			let scale = 1
			let translateY = Math.max(self.minTranlateY, newY)
			self.$refs.bgLayer.style[prefixstyle(transform)] = `translate3d(0, ${translateY}px, 0)`
			if (newY > 0) {
				let percent = Math.abs(newY / self.imageHeiht)
				scale = 1 + percent
				zIndex = 10
			}
			if (newY < self.minTranlateY) {
				zIndex = 10
				this.$refs.bgimg.style.height = `${RESEVERT_HEIGHT}px`
				self.$refs.bgimg.style.paddingTop = 0
				self.$refs.playWrap.style.display = 'none'
			} else {
				this.$refs.bgimg.style.height = 0
				this.$refs.bgimg.style.paddingTop = '70%'
				self.$refs.playWrap.style.display = ''
			}
			this.$refs.bgimg.style.zIndex = zIndex
			self.$refs.bgimg.style[prefixstyle(transform)] = `scale(${scale})`
		}
	},
	computed: {
		image () {
			return `background-image:url(${this.img})`
		}
	},
	components: {
		scroll,
		songList
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.song-list-wrapper{
	padding: 20px 30px;
}
.singer-list{
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 100;
	background-color: #222;
	.title-item{
		width: 100%;
		height: 40px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 11;
		.icon-back{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
			display: block;
			padding: 10px;
			font-size: 21px;
			color: #ffcd32;
		}
		.title-txt{
			text-align: center;
			color: #fff;
			font-size: 18px;
			line-height: 40px;

		}
	}
	.avator-img{
		position: relative;
		width: 100%;
		padding-top: 70%;
		background-size: cover;
		background-color: #242424;
		transform-origin: top;
		.play-wrapper{
			position: absolute;
			bottom: 20px;
			z-index: 50;
			width: 100%;
			.play{
				box-sizing: border-box;
				width: 135px;
				padding: 7px 0;
				margin: 0 auto;
				text-align: center;
				border: 1px solid #ffcd32;
				color: #ffcd32;
				border-radius: 100px;
				font-size: 0;
				.icon-play{
					display: inline-block;
					vertical-align: middle;
					margin-right: 6px;
					font-size: 16px;
				}
				.text{
					display: inline-block;
					vertical-align: middle;
					font-size: 12px;
				}
			}
		}
	}
	.list{
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background: #222;
	}
	.bg-layer{
		position: relative;
		height: 100%;
		background-color: #222;
	}
}
</style>
