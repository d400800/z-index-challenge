function getChildNumber(node) {
  return Array.prototype.indexOf.call(node.parentNode.children, node);
}

function toggleClass(element, tClass) {
	element.classList.contains(tClass) ? element.classList.remove(tClass) : element.classList.add(tClass)
}

function removeClass(element, tClass) {
	if(element.classList.contains(tClass)) element.classList.remove(tClass) 
}

function addClass(element, tClass) {
	element.classList.add(tClass) 
}

Array.prototype.manipulate_class = function(tClass, fn) {
	this.forEach((item) => {
		fn(item, tClass)
	})
}

toggle_class = function(obj, tClass) {
	Object.keys(obj).forEach((key) => {
		obj[key].classList.contains(tClass) ? obj[key].classList.remove(tClass) : obj[key].classList.add(tClass)
	})
}

remove_class = function(obj, tClass) {
	Object.keys(obj).forEach((key) => {
		if(obj[key].classList.contains(tClass)) {
			obj[key].classList.remove(tClass)
		}
	})
}