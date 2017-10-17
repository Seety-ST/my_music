<template>
	<scroll class="listView" 
			:data="data" 
			ref="listView" 
			:listenScroll="listenScroll" 
			:probeType = "probeType"
			@scroll="scroll">
		<div >
			<div class="item" v-for="(items,indexs) in data" ref="listGroup">
				<div class="title">{{items.title}}</div>
				<ul class="list">
					<li v-for="(item,index) in items.items" @click="singer(item)">
						<div class="img-item" >
							<img :src="item.avator" alt="">
						</div>	
						<div class="name-txt">
							{{item.name}}
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="list-shortcut" @touchstart="onShortcutTouchstart" @touchmove.stop.prevent="onShortcutTouchMove">
			<ul class="list" >
				<li v-for="(item, index) in shortcutList" :data-index="index" :class="{'cur' : currentIndex===index}">
					{{item}}
				</li>
			</ul>
		</div>
		<div class="fixed-title" v-if="fixedTitle">
			<span class="title">{{fixedTitle}}</span>
		</div>
	</scroll>
</template>

<script>
import scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
export default {
	name: 'listView',
	props: {
		data: {
			type: Array,
			default: []
		}
	},
	data () {
		return {
			scrollY: -1,
			currentIndex: 0
		}
	},
	created () {
		var self = this
		self.touch = {
		}
		self.anchorHeight = 18
		self.listenScroll = true
		self.probeType = 3
		self.groupHeight = []
	},
	mounted () {
	},
	methods: {
		singer (item) {
			let self = this
			self.$emit('singerClick', item)
		},
		onShortcutTouchstart (e) {
			var self = this
			let event = e.touches[0]
			let anchorIndex = getData(e.target, 'index')
			self.touch.y1 = event.pageY
			self.touch.anchorIndex = anchorIndex
			self._scrollTo(anchorIndex)
		},
		onShortcutTouchMove (e) {
			var self = this
			let event = e.touches[0]
			self.touch.y2 = event.pageY
			// let delta = Math.floor((self.touch.y2 - self.touch.y1) / self.anchorHeight) //向下取整
			let delta = (self.touch.y2 - self.touch.y1) / self.anchorHeight | 0
			let anchorIndex = parseInt(self.touch.anchorIndex) + delta
			console.log(anchorIndex)
			self._scrollTo(anchorIndex)
		},
		scroll (pos) {
			let self = this
			self.scrollY = pos.y
		},
		_scrollTo (index) {
			let self = this
			if (!index) {
				return
			}
			if (index < 0) {
				index = 0
			} else if (index > self.groupHeight.length - 2) {
				index = self.groupHeight.length - 2
			}
			self.scrollY = -self.groupHeight[index]
			console.log(index)
			this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
		},
		getGroupHeight () {
			let self = this
			let group = this.$refs.listGroup
			let height = 0
			self.groupHeight.push(height)
			for (let i = 0; i < group.length; i++) {
				height += group[i].clientHeight
				self.groupHeight.push(height)
			}
		}
	},
	components: {
		scroll
	},
	computed: {
		shortcutList () {
			return this.data.map((group) => {
				return group.title.substr(0, 1)
			})
		},
		fixedTitle () {
			let self = this
			if (self.scrollY > 0) {
				return ''
			}
			return self.data[self.currentIndex] ? self.data[self.currentIndex].title : ''
		}
	},
	watch: {
		data () {
			setTimeout(() => {
				this.getGroupHeight()
			}, 20)
		},
		scrollY (newY) {
			let self = this
			const listHeight = self.groupHeight
			if (newY > 0) {
				self.currentIndex = 0
				return
			}
			for (let i = 0; i < listHeight.length - 1; i++) {
				let height1 = listHeight[i]
				let height2 = listHeight[i + 1]
				if (!height2 || (-newY) >= height1 && (-newY) < height2) {
					self.currentIndex = i
					return
				}
			}
			// 当滚动到底部最后一个时
			self.currentIndex = listHeight.length - 2
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.listView{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		.item{
			padding-bottom: 20px;
			.title{
				color: #fff;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				background: #333;
			}
			.list{
				li{
					display: -webkit-box;
					align-items: center;
					padding: 20px 0 0 30px;
					.img-item{
						width: 50px;
						height: 50px;
						img{
							width: 100%;
							border-radius: 25px;
						}
					}
					.name-txt{
						-webkit-box-flex: 1;
						font-size: 14px;
						color: rgba(255, 255, 255, .5);
						margin-left: 20px;
					}
				}
			}
		}
		.list-shortcut{
			position: absolute;
			z-index: 30;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			--webkit-transform: translateY(-50%);
			width: 20px;
			padding: 20px 0;
			border-radius: 10px;
			text-align: center;
			background: rgba(0,0,0,0.3);
			.list{
				li{
					color: rgba(255,255,255,0.5);
					font-size: 12px;
					&.cur{
						color: #ffcd32;
					}
				}
			}
		}
		.fixed-title{
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: #333;
			.title{
				color: #fff;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				background: #333;
			}
		}
	}
  
</style>
