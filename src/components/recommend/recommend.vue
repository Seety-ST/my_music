<template>
	<div class="recommend">
		<scroll ref="scroll" :data="recomentList" class="recommend-content">
			<div>
				<div class="recommend-page" v-if="recommends.length" >
					<slider>
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<img @load="imgonload" class="needsclick"  :src="item.picUrl">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="(item,index) in recomentList" class="item">
							<div class="icon">
								<img :src="item.imgurl">
							</div>
							<div class="text">
								<h2 class="name" >{{item.creator.name}}</h2>
								<p class="desc" >{{item.dissname}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script>
import {getRecommend, getRecommendList} from 'api/recommend'
import scroll from 'base/scroll/scroll'
import slider from 'base/slider/slider'
import {ErrOK} from 'api/config'
export default {
	name: 'hello',
	data () {
		return {
			recommends: [],
			recomentList: []
		}
	},
	created () {
		var self = this
		self._getRecommend()
		self._getRecommendList()
		console.log(scroll)
	},
	methods: {
		_getRecommend () {
			var self = this
			getRecommend().then((res) => {
				console.log(res)
				if (res.code === ErrOK) {
					self.recommends = res.data.slider
				}
			})
		},
		_getRecommendList () {
			var self = this
			getRecommendList().then((res) => {
				self.recomentList = res.data.list
			})
		},
		imgonload () {
			var self = this
			if (!self.checkload) {
				self.$refs.scroll.refresh()
				self.checkload = true
			}
		}
	},
	components: {
		slider,
		scroll
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.recommend{
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;
	.recommend-content{
		height: 100%;
		overflow: hidden;
		.recommend-page{
			position: relative;
		    width: 100%;
		    overflow: hidden; 
		}
		.recommend-list{
			.list-title{
				height: 65px;
				line-height: 65px;
				text-align: center;
				font-size: 14px;
				color: #ffcd32;
			}
			.item{
				display: flex;
				box-sizing: border-box;
				align-items: center;
				padding: 0 20px 20px 20px;
				.icon{
					flex: 0 0 60px;
					width: 60px;
					height: 60px;
					padding-right: 20px;
					img{
						width: 100%;
						display: block;
					}
				}
				.text{
					display: flex;
					flex-direction: column;
					justify-content: center;
					flex: 1;
					line-height: 20px;
					overflow: hidden;
					font-size: 14px;
					.name{
						margin-bottom: 10px;
						color: #fff;
					}
					.desc{
						color:  rgba(255,255,255,0.3);
					}
				}
			}
		}	
	}
}


</style>
