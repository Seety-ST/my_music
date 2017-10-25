import * as types from './mutation-type'
const mutations = {
	[types.SET_SINGER] (state, singer) {
		state.singer = singer
	},
	[types.SET_PLAYING] (state, playing) {
		state.playing = playing
	},
	[types.SET_FULLSCREEN] (state, fullScreen) {
		state.fullScreen = fullScreen
	},
	[types.SET_PLAYLIST] (state, playlist) {
		state.playlist = playlist
	},
	[types.SET_SEQUENCELIST] (state, sequencelist) {
		state.sequencelist = sequencelist
	},
	[types.SET_PLAYMODE] (state, playmode) {
		state.playmode = playmode
	},
	[types.SET_CURRENTINDEX] (state, currentIndex) {
		state.currentIndex = currentIndex
	}
}
export default mutations