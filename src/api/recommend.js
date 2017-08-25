import jsonp from 'global/jsonp/index'
import {conmonParams, options} from 'api/config'
export default function getRecommend () {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({}, conmonParams, {
		uin: 0,
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, options)
}