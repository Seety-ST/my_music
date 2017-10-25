<template>
	<div class="song-list">
		<ul class="list">
			<li v-for="(item,index) in song" @click="select(item,index)">
				<div class="content">
					<h3 class="name" v-html="item.singer"></h3>
					<p class="desc" v-html="item.name"></p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	name: 'songList',
	props: {
		song: {
			type: Array,
			default: []
		}
	},
	mounted () {
	},
	methods: {
		select (item, index) {
			let self = this
			self.$emit('select', item, index)
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .song-list{
  	.list{
  		li{
  			margin-top: 10px;
  			.content{
  				.name{
  					color: #fff;
  					font-size: 14px;
  				}
  				.desc{
  					color: rgba(255,255,255,0.3);
  					margin-top: 5px;
  					font-size: 14px;
  				}
  			}
  		}
  	}
  }
</style>
