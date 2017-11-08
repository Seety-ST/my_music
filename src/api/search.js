import jsonp from 'global/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
export function getHotKey () {
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, options)
}
export function getSuggest (query, page, zhida) {
	const url = 'api/getSuggest'
	const data = Object.assign({}, commonParams, {
		w: query,
		p: page,
		format: 'json',
		catZhida: zhida ? 1 : 0,
		g_tk: '5381',
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		zhidaqu: 1,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		n: 20,
		perpage: 20,
		remoteplace: 'txt.mqq.all'
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}