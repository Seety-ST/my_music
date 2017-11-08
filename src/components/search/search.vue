<template>
  <div class="search">
  	<search-box ref="searchBox" @query="changeQuery"></search-box>
  	<div class="shortcut-wrapper" v-show="!query">
  		<div class="hot-key">
  			<h3 class="result-tit">热门搜索</h3>
  			<div class="result-tags">
  				<ul class="list">
  					<li v-for="(item, index) in hotkey" @click="addQuery(item.k)">{{item.k}}</li>
  				</ul>
  			</div>	
  		</div>
  	</div>
  	<div class="suggest-wrap" v-show="query">
  		<suggest :query="query"></suggest>
  	</div>
  </div>
</template>

<script>
import searchBox from 'base/search-box/search-box'
import {getHotKey} from 'api/search'
import {ErrOK} from 'api/config'
import suggest from '../suggest/suggest'
export default {
	name: 'hello',
	data () {
		return {
			hotkey: [],
			query: ''
		}
	},
	created () {
		let self = this
		self.gethotkey()
	},
	methods: {
		gethotkey () {
			let self = this
			getHotKey().then((res) => {
				console.log(res)
				if (res.code === ErrOK) {
					self.hotkey = res.data.hotkey.slice(0, 10)
				}
			})
		},
		addQuery (query) {
			let self = this
			self.$refs.searchBox.setQuery(query)
		},
		changeQuery (query) {
			let self = this
			self.query = query
		}
	},
	components: {
		searchBox,
		suggest
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.search{
		.hot-key{
			margin: 0 20px 20px 20px;
			.result-tit{
				color: rgba(255,255,255,0.5);
				margin-bottom: 20px;
				font-size: 14px;
			}
			.result-tags{
				.list{
					li{
						display: inline-block;
						padding: 5px 10px;
						margin: 0 20px 10px 0;
						border-radius: 6px;
						background: #333;
						font-size: 14px;
						color: rgba(255,255,255,0.3);
					}
				}
			}
		}
		.suggest-wrap{
			position: fixed;
			width: 100%;
			top: 178px;
			bottom: 0;
		}
		
	}
</style>
