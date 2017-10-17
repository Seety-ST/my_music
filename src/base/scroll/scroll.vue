<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
	name: 'scroll',
	props: {
		probeType: {
			type: Number,
			default: 1
		},
		click: {
			type: Boolean,
			default: true
		},
		data: {
			type: Array,
			default: null
		},
		listenScroll: {
			type: Boolean,
			default: false
		}
	},
	mounted () {
		var self = this
		setTimeout(() => {
			self._setscrollList()
		}, 20)
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	methods: {
		_setscrollList () {
			var self = this
			var wraper = self.$refs.wrapper
			if (!wraper) {
				return
			}
			self.scroll = new Bscroll(wraper, {
				probeType: self.probeType,
				click: self.click
			})
			if (self.listenScroll) {
				self.scroll.on('scroll', (pos) => {
					self.$emit('scroll', pos)
				})
			}
		},
		enable () {
			var self = this
			self.scroll && self.scroll.enable()
		},
		disable () {
			var self = this
			self.scroll && self.scroll.disable()
		},
		refresh () {
			var self = this
			self.scroll && self.scroll.refresh()
		},
		scrollTo () {
			var self = this
			self.scroll && self.scroll.scrollTo.apply(self.scroll, arguments)
		},
		scrollToElement () {
			var self = this
			self.scroll && self.scroll.scrollToElement.apply(self.scroll, arguments)
		}
	},
	watch: {
		data () {
			var self = this
			setTimeout(() => {
				self.refresh()
			}, 20)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
