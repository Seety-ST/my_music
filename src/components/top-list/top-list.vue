<template>
	<transition name="fade">
		<singer-list :title="title" :img="bgImage" :songs="song"></singer-list>	
	</transition>
</template>

<script>
import singerList from '../singer-list/singer-list'
import {mapGetters} from 'vuex'
import {songList} from 'api/rank'
import {ErrOK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
	name: 'detail',
	data () {
		return {
			song: []
		}
	},
	created () {
		let self = this
		self._getSongList()
	},
	methods: {
		_getSongList () {
			let self = this
			songList(this.topList.id).then((res) => {
				if (res.code === ErrOK) {
					self.song = self._normalList(res.songlist)
				}
			})
		},
		_normalList (list) {
			let ret = []
			list.forEach((item) => {
				let muiceData = item.data
				if (muiceData.songid && muiceData.albumid) {
					ret.push(createSong(muiceData))
				}
			})
			return ret
		}
	},
	computed: {
		title () {
			return this.topList.topTitle
		},
		bgImage () {
			return this.topList.picUrl
		},
		...mapGetters([
			'topList'
		])
	},
	components: {
		singerList
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.fade-enter-active,.fade-leave-active{
	transition: all .3s ease-in;
}
.fade-enter,.fade-leave-to{
	transform: translateX(100%);
}
</style>
