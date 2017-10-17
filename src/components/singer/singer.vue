<template>
  <div class="singer">
  	<listView :data="singer" @singerClick="go_detail"></listView>
  	<router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ErrOK} from 'api/config'
import Singer from 'common/js/singer'
import listView from 'base/listView/listView'
const HotName = '热门'
const HotSingerLen = 10
export default {
	name: 'hello',
	data () {
		return {
			singer: []
		}
	},
	created () {
		const self = this
		self._getSingerList()
	},
	methods: {
		go_detail (singer) {
			let self = this
			self.$router.push({
				path: `/singer/${singer.id}`
			})
		},
		_getSingerList () {
			let self = this
			getSingerList().then((res) => {
				if (res.code === ErrOK) {
					console.log(res)
					self.singer = self._normal_rank_list(res.data.list)
				}
			})
		},
		_normal_rank_list (list) {
			let map = {
				hot: {
					title: HotName,
					items: []
				}
			}
			list.forEach((item, index) => {
				if (index < HotSingerLen) {
					map.hot.items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))
				}
				let key = item.Findex
				if (!map[key]) {
					map[key] = {
						title: key,
						items: []
					}
				}
				map[key].items.push(new Singer({
					id: item.Fsinger_mid,
					name: item.Fsinger_name
				}))
			})
			let hot = []
			let ret = []
			for (let key in map) {
				if (map[key].title.match(/[a-zA-Z]/)) {
					ret.push(map[key])
				} else {
					hot.push(map[key])
				}
			}
			ret.sort((a, b) => {
				return a.title.charCodeAt(0) - b.title.charCodeAt(0)
			})
			return hot.concat(ret)
		}
	},
	components: {
		listView
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.singer{
	position: fixed;
	top: 90px;
	bottom: 0;
	width: 100%;
}
</style>
