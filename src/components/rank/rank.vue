<template>
	<div class="rank">
		<scroll :data="topList" class="toplist" ref="toplist">
			<div>
				<div class="item" v-for="(items,indexs) in topList" @click="goTopList(items)">
						<div class="lbox">
							<img :src="items.picUrl" alt="">
						</div>
						<div class="rbox">
							<p class="song" v-for="(item,index) in items.songList">
								<span class="num">{{index+1}}</span>
								<span class="song-txt">{{item.songname}}-{{item.singername}}</span>
							</p>
						</div>
				</div>
			</div>
		</scroll>
		<router-view></router-view>	
	</div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {rankList} from 'api/rank'
import {ErrOK} from 'api/config'
import {mapMutations} from 'vuex'
export default {
	name: 'rank',
	data () {
		return {
			topList: []
		}
	},
	created () {
		let self = this
		self._getRankList()
	},
	computed: {
	},
	methods: {
		_getRankList () {
			let self = this
			rankList().then((res) => {
				if (res.code === ErrOK) {
					self.topList = res.data.topList
				}
			})
		},
		goTopList (item) {
			let self = this
			self.$router.push({
				path: `/rank/${item.id}`
			})
			self.setTopList(item)
		},
		...mapMutations({
			setTopList: 'SET_TOPLIST'
		})
	},
	components: {
		Scroll
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rank{
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;
	.toplist{
		height: 100%;
		overflow: hidden;
		.item{
			display: -webkit-box;
			margin: 20px 20px 0px;
			
			&:last-child{
				padding-bottom: 40px;
			}
			.lbox{
				width: 100px;
				height: 100px;
				img{
					width: 100%;display: block;
				}
			}
			.rbox{
				-webkit-box-flex: 1;
				padding: 0px 20px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				background: #333;
				.song{
					line-height: 26px;
					color: rgba(255,255,255,0.3);
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
	}
}
</style>
