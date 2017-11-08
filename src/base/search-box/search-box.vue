<template>
	<div class="search-box-wrapper">
        <div class="search-box">
            <i class="icon-search"></i>
            <input  :placeholder="placeholder" class="box" v-model="query">
            <i class="icon-dismiss" v-show="query" @click="clear"></i>
        </div>
    </div>
</template>

<script>

export default {
	name: 'songList',
	props: {
		placeholder: {
			type: String,
			default: '搜索歌曲、歌手'
		}
	},
    data () {
        return {
            query: ''
        }
    },
    created () {
        let self = this
        self.$watch('query', (newQuery) => {
            self.$emit('query', newQuery)
        })
    },
	mounted () {
	},
    methods: {
        clear () {
            let self = this
            self.query = ''
        },
        setQuery (query) {
            let self = this
            self.query = query
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search-box-wrapper{
    margin: 20px;
    .search-box{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        /* box-sizing: border-box; */
        width: 100%;
        padding: 0 6px;
        height: 40px;
        background: #333;
        border-radius: 6px;
        .icon-search{
            font-size: 24px;
            color: #222;
        }
        .box{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin: 0 5px;
            line-height: 18px;
            background: #333;
            color: #fff;
            font-size: 14px;
        }
        .icon-miss{
            font-size: 16px;
            color: #222;
        }
    }
  }
</style>
