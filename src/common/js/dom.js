export function addclass (el, classname) {
	if (hasclass(el, classname)) {
		return
	}
	let newClassName = el.className.split(' ')
	newClassName.push(classname)
	el.className = newClassName.join(' ')
}
export function hasclass (el, classname) {
	let reg = new RegExp('(^|\\s)' + classname + '(\\s|$)')
	return reg.test(el.className)
}
export function getData (el, name, val) {
	name = 'data-' + name
	if (val) {
		return el.setAttribute(name, val)
	} else {
		return el.getAttribute(name)
	}
}

let elementStyle = document.createElement('div').style
let vendor = (() => {
	let transformName = {
		webkit: 'webkitTransform',
		Moz: 'mozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}
	for (let key in transformName) {
		if (elementStyle[transformName[key]] !== undefined) {
			return key
		}
	}
	return false
})()
export function prefixstyle (style) {
	if (vendor === false) {
		return false
	}
	if (vendor === 'standard') {
		return style
	}
	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
