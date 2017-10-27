import * as types from './mutation-type'
import {playmode} from 'common/js/config'
import {shuffle} from 'common/js/until'
export const selectPlay = function ({commit, state}, {list, index}) {
	commit(types.SET_PLAYLIST, list)
	commit(types.SET_SEQUENCELIST, list)
	commit(types.SET_FULLSCREEN, true)
	commit(types.SET_PLAYING, true)
	commit(types.SET_CURRENTINDEX, index)
}
export const randomPlay = function ({commit, state}, {list}) {
	commit(types.SET_PLAYMODE, playmode.random)
	commit(types.SET_SEQUENCELIST, list)
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST, randomList)
	commit(types.SET_CURRENTINDEX, 0)
	commit(types.SET_FULLSCREEN, true)
	commit(types.SET_PLAYING, true)
}