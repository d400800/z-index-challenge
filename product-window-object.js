function initWindow(element, icon, menu) {
	this.element 		= document.getElementById(element)
	this.icon 			= document.getElementById(icon)
	this.menu 			= document.getElementById(menu)
	this.sizeIcons 		= this.element.getElementsByClassName("size")
	this.colourIcons 	= this.element.getElementsByClassName("colour")
	this.returnIcon 	= this.element.querySelector(".return")
	this.navigation 	= this.element.querySelectorAll(".navigation")
	this.options 		= this.element.querySelectorAll(".option")
	this.cartBtnVisual	= document.querySelector(".cart-btn-visual")

	this.bindEvents();
}

initWindow.prototype.bindEvents = function() {
	var self = this;
	self.icon.addEventListener("click", function() {
		Array.from(self.sizeIcons).manipulate_class("move", toggleClass)
		Array.from(clothesIcons).manipulate_class("fade-out", toggleClass)
		toggleClass(self.menu, "show")
		toggleClass(self.icon, "hide")
		toggleClass(document.querySelector(".clothes-icon-halo"), "hide")
		toggleClass(windowElements.clothesIconsWindow, "show")
		toggleClass(self.cartBtnVisual, "toggled")
		toggleClass(cartBtnActual, "toggled")
		// toggleClass(windowElements.clothesIconsWindow, "hide")
	})

	self.returnIcon.addEventListener("click", function() {
		self.icon.click()
	})

	Array.from(self.navigation).forEach((icon) => {
		icon.addEventListener("click", function() {
			if(icon.classList.contains("toggled")) {
				Array.from(self.element.getElementsByClassName(icon.getAttribute("data")))
					.manipulate_class("move", removeClass)
				icon.classList.remove("toggled")
			} else {
				Array.from(self.options).manipulate_class("move", removeClass)
				Array.from(self.element.getElementsByClassName(icon.getAttribute("data")))
					.manipulate_class("move", addClass)
				Array.from(self.navigation).manipulate_class("toggled", removeClass)
				icon.classList.add("toggled")
			}
		})
	})

	Array.from(self.options).forEach((option) => {
		option.addEventListener("click", function() {
			if(option.classList.contains("toggled")) {
				option.classList.remove("toggled")
			} else {
				Array.from(self.options).manipulate_class("toggled", removeClass)
				option.classList.add("toggled")
			}
		})
	})
}

let dressWindow = new initWindow("dress-window", "dress-menu-icon", "dress-menu");
let shoesWindow = new initWindow("shoes-window", "shoes-menu-icon", "shoes-menu");