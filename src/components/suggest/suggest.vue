<template>
	<scroll class="wrap" :data="result">
		<ul class="suggest-list">
			<li class="suggest-item" v-for="(item, index) in result">
				<div class="icon">
					<i :class="getClass(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getName(item)"></p>
				</div>
			</li>
		</ul>
	</scroll>	
</template>

<script>
import {getSuggest} from 'api/search'
import {ErrOK} from 'api/config'
import {createSong} from 'common/js/song'
import scroll from 'base/scroll/scroll'
const TYPE_SINGER = 'singer'
export default {
	name: 'suggest',
	data () {
		return {
			page: 1,
			singerType: true,
			result: []
		}
	},
	props: {
		query: {
			type: String,
			default: ''
		}
	},
	created () {
	},
	methods: {
		_getResult (query) {
			let self = this
			getSuggest(query, self.page, self.singerType).then((res) => {
				if (res.code === ErrOK) {
					self.result = self._genResult(res.data)
					console.log(self.result)
				}
			})
		},
		getClass (item) {
			if (item.type === TYPE_SINGER) {
				return 'icon-mine'
			} else {
				return 'icon-music'
			}
		},
		getName (item) {
			if (item.type === TYPE_SINGER) {
				return item.singername
			} else {
				return `${item.name} - ${item.singer}`
			}
		},
		_genResult (data) {
			let ret = []
			let self = this
			if (data.zhida && data.zhida.singerid) {
				ret.push({...data.zhida, ...{type: TYPE_SINGER}})
			}
			if (data.song) {
				ret = ret.concat(self._normalList(data.song.list))
			}
			return ret
		},
		_normalList (list) {
			let ret = []
			list.forEach((musicData) => {
				if (musicData.songid && musicData.albumid) {
					ret.push(createSong(musicData))
				}
			})
			return ret
		}
	},
	computed: {
	},
	watch: {
		query (newquery) {
			let self = this
			self._getResult(newquery)
		}
	},
	components: {
		scroll
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.wrap{
		height: 100%;
		overflow: hidden;
		.suggest-list{
			padding: 0 30px;
			.suggest-item{
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				padding-bottom: 20px;
				.icon{
					-webkit-box-flex: 0;
					-ms-flex: 0 0 30px;
					flex: 0 0 30px;
					width: 30px;
					i{
						font-size: 14px;
						color: rgba(255,255,255,0.3);
					}
				}
				.name{
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1; 
					font-size: 14px;
					color: rgba(255,255,255,0.3);
					overflow: hidden;
					.text{
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
