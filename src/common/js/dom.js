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