<template>
	<div class="song-list">
		<ul class="list">
			<li v-for="(item,index) in song" @click="select(item,index)">
				<div class="rank" v-show="rank">
					<span class="icon" :class="getRankCls(index)" v-text="getRankText(index)"></span>
				</div>
				<div class="content">
					<h3 class="name" v-html="item.name"></h3>
					<p class="desc" v-html="item.singer"></p>
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
		},
    rank: {
      type: Boolean,
      default: false
    }
	},
	mounted () {
	},
	methods: {
		select (item, index) {
			let self = this
      console.log(item)
			self.$emit('select', item, index)
		},
		getRankCls (index) {
			if (index <= 2) {
				return `icon icon${index}`
			} else {
				return 'text'
			}
		},
		getRankText (index) {
			if (index > 2) {
				return `${index}`
			}
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
  			display: -webkit-box;
  			.rank{
  				-webkit-box-flex: 0;
  				    -ms-flex: 0 0 25px;
  				    flex: 0 0 25px;
  				    width: 25px;
  				    margin-right: 30px;
  				    text-align: center;
  				.icon{
  					display: inline-block;
  					width: 25px;
  					height: 24px;
  					background-size: 25px 24px;
  					&.icon0{
  						background-image: url('first.png')
  					}
  					&.icon1{
  					  background-image: url('second.png')
  					}
  					&.icon2{
  					  background-image: url('third.png')
  					}
  				}
  				.text{
  					color: #ffcd32;
  					font-size: 18px;
  				}
  			}
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
