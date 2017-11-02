import jsonp from 'global/jsonp/index'
import {commonParams, options} from 'api/config'
import axios from 'axios'
export function rankList () {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
	const data = Object.assign({}, commonParams, {
		g_tk: 689514020,
		uin: 2113706825,
		format: 'json',
		notice: 0,
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, options)
}
export function songList (topid) {
	const url = '/api/rankSongList'
	const data = Object.assign({}, commonParams, {
		topid,
		g_tk: '689514020',
		uin: '2113706825',
		format: 'json',
		needNewCode: 1,
		notice: 0,
		tpl: 3,
		page: 'detail',
		type: 'top',
		platform: 'h5'
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}