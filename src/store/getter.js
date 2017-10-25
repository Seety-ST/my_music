export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequencelist = state => state.sequencelist
export const playmode = state => state.playmode
export const currentIndex = state => state.currentIndex
export const curretsong = (state) => {
	return state.playlist[state.currentIndex] || {}
}