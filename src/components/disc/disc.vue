<template>
	<transition name="fade">
		<singer-list :title="title" :img="bgImage" :songs="song"></singer-list>	
	</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import singerList from '../singer-list/singer-list'
import {getSongList} from 'api/recommend'
import {ErrOK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
	name: 'disc',
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
			setTimeout(() => {
				let self = this
				if (!self.disc.dissid) {
					self.$router.push({
						path: '/recommend'
					})
				}
				getSongList(self.disc.dissid).then((res) => {
					if (res.code === ErrOK) {
						self.song = self._normallizeSongList(res.cdlist[0].songlist)
					}
				})
			}, 20)
		},
		_normallizeSongList (list) {
			let ret = []
			list.forEach((item) => {
				if (item.songid && item.albummid) {
					ret.push(createSong(item))
				}
			})
			return ret
		}
	},
	computed: {
		...mapGetters([
			'disc'
		]),
		title () {
			return this.disc.dissname
		},
		bgImage () {
			return this.disc.imgurl
		}
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
