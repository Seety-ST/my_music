import Vue from 'vue'
import vuex from 'vuex'
import * as actions from './action'
import * as getters from './getter'
import state from './state'
import mutations from './mutation'
import creatLogger from 'vuex/dist/logger'
Vue.use(vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new vuex.Store({
	actions,
	getters,
	state,
	mutations,
	plugins: debug ? [creatLogger()] : []
})