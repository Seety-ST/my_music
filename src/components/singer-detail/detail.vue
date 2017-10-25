<template>
	<transition name="fade">
		<singer-list :title="title" :img="bgImage" :songs="song"></singer-list>	
	</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {createSong} from 'common/js/song'
import singerList from '../singer-list/singer-list'
export default {
	name: 'detail',
	data () {
		return {
			song: []
		}
	},
	created () {
		let self = this
		if (!this.singer.id) {
			self.$router.push({path: '/singer'})
			return
		}
		self._getDetail(this.singer.id)
	},
	methods: {
		_getDetail (singerId) {
			let self = this
			getSingerDetail(singerId).then((res) => {
				console.log(res)
				self.song = self._normalSong(res.data.list)
			})
		},
		_normalSong (list) {
			let ret = []
			list.forEach((item) => {
				let {musicData} = item
				ret.push(createSong(musicData))
			})
			return ret
		}
	},
	computed: {
		...mapGetters([
			'singer'
		]),
		title () {
			return this.singer.name
		},
		bgImage () {
			return this.singer.avator
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
