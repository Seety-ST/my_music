<template>
	<div class="recommend-page">
		<slider>
			<div v-for="item in recommends">
				<a :href="item.linkUrl">
					<img class="needsclick"  :src="item.picUrl">
				</a>
			</div>
		</slider>
	</div>
</template>

<script>
import getRecommend from 'api/recommend'
import slider from 'components/slider/slider'
import {ErrOK} from 'api/config'
export default {
	name: 'hello',
	data () {
		return {
			recommends: []
		}
	},
	created () {
		var self = this
		self._getRecommend()
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
		}
	},
	components: {
		slider
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
