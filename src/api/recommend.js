import jsonp from 'global/jsonp/index'
import {commonParams, options} from 'api/config'
import axios from 'axios'
export function getRecommend () {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({}, commonParams, {
		uin: 0,
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, options)
}
export function getRecommendList () {
	const url = '/api/getDiscList'
	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		sin: 0,
		ein: 29,
		sortId: 5,
		needNewCode: 0,
		categoryId: 10000000,
		rnd: Math.random(),
		format: 'json'
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
export function getSongList (disstid) {
	const url = '/api/getSongList'
	const data = Object.assign({}, commonParams, {
		disstid,
		type: 1,
		format: 'json',
		utf8: 1,
		onlysong: 0,
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
