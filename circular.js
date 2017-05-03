const windowElements = {
	clothesIconsWindow: document.getElementById("clothes-icons-container"),
	main: 				document.getElementById("main")
}

const sliders = {
	dressSlider: document.getElementById("slider-dress"),
	shoesSlider: document.getElementById("slider-shoes"),
	dressSliderNav: document.getElementById("dress-slider-navigation"),
	shoesSliderNav: document.getElementById("shoes-slider-navigation"),
}

let menuIcons = document.querySelectorAll(".circle-icon.menu")

let skeleton = document.getElementById("menu-skeleton");
let clothesIcons = document.getElementsByClassName("clothes");

let rings = document.getElementById("rings")
let productWindows = document.getElementsByClassName("product-window")
let shoppingCart = document.getElementById("shopping-cart")

// a transparent container above all layer imitating clicking the add to cart buton
// because of the layer structure (see the page title),
//actual and visual parts of the button have to be separated
let cartBtnActual = document.getElementById("cart-btn")
cartBtnActual.addEventListener("click", function(event) {
	document.querySelector("#cart-counter").classList.add("show")
	
	document.querySelector(".cart-btn-visual span")
	.animate([
	  // keyframes
	  { transform: 'scale(.8)' }, 
	  { transform: 'scale(1)' }
	], { 
	  // timing options
	  duration: 400,
	  easing: "cubic-bezier(.6,.6,.25,1.75)",
	  iterations: 1
	});

	document.querySelector("li.selected")
	.animate([
	  // keyframes
	  { transform: 'scale(.85)' }, 
	  { transform: 'scale(.95)' }
	], { 
	  // timing options
	  duration: 750,
	  easing: "cubic-bezier(.6,.6,.25,1.5)",
	  iterations: 1
	});
})

// Calculating the width of the long line which functions as the 'rails'
// for the running line during the init animation
let shortLine = document.querySelector(".short-line")
let longLine = document.querySelector(".long-line")
let wrapper = document.getElementById("wrapper")

let shortLineRight = parseInt(shortLine.getBoundingClientRect().right)
let wrapperLeft = parseInt(wrapper.getBoundingClientRect().left)
longLine.style.width = (wrapperLeft - shortLineRight + 30)+"px";

// clicking on the launch button
let launcher = document.getElementById("launcher");
launcher.addEventListener('click', function() {
	toggleClass(rings, "show")

	setTimeout(function() {
		toggleClass(rings, "show")
		toggleClass(shoppingCart, "show")
	}, 1750)

	setTimeout(function() {
		toggleClass(skeleton, "draw")
		setTimeout(function() {

			//toggleClass(shoppingCart, "show")
			toggle_class(windowElements, "show")
			toggleClass(sliders.dressSlider, "show")
			toggleClass(dressWindow.icon, "place")
			Array.from(clothesIcons).manipulate_class("place", toggleClass)

			setTimeout(function(){
				toggleClass(document.querySelector(".clothes.dresses"),"toggled")
				toggleClass(document.querySelector(".clothes-icon-halo"),"hide")
			}, 1000)

		}, 600)
	}, 1900)

})

// bouncing animation for circlular icons
Array.from(document.querySelectorAll('.circle-icon')).forEach((icon) => {
	icon.addEventListener("click", function() {
		icon.classList.add("bounce")
		setTimeout(function() {
			icon.classList.remove("bounce")
		}, 800)
	})
})

// clicking on a clothes icon (dresses, shoes, etc.)
windowElements.clothesIconsWindow.addEventListener('click', function(event) {
	if(event.target.classList.contains("clothes") || event.target.parentNode.classList.contains("clothes")) {

		let clickedIcon = event.target.classList.contains("clothes") ? event.target : event.target.parentNode
		
		// if the icon is active, do nothing
		// otherwise change product window and activate the selected icon
		if(clickedIcon.classList.contains("toggled")) {
			return false;
		} else {
			var iconIndex = getChildNumber(clickedIcon)
			var iconData = clickedIcon.getAttribute("data")
			var iconTitle = clickedIcon.getAttribute("data-title")
			var iconPrice = clickedIcon.getAttribute("data-price") 

			// adding white border and rotation clothes icons
			windowElements.clothesIconsWindow.style.transform = 'rotate('+20*iconIndex+'deg)';

			// showing the relevant product window
			Array.from(productWindows).forEach((item) => {
				(item.getAttribute("id") == iconData) ? item.classList.add("active") : item.classList.remove("active")
			})

			// showing the relevant slider
			Object.keys(sliders).forEach((key) => {
				(sliders[key].getAttribute("data") == iconData) ? sliders[key].classList.add("show") : sliders[key].classList.remove("show")
			})

			// showing the relevant menu icon
			Array.from(menuIcons).forEach((item) => {
				(item.getAttribute("data") == iconData) ? item.classList.add("active") : item.classList.remove("active")
			})

			// changing product title and price
			document.querySelector(".product-title").innerHTML = "<p>"+iconTitle+"</p><p>"+iconPrice+"</p>";

			// closing 	
		}
	}
})


// clicking on the dress red color icon
let redDress = document.querySelector(".colour.red")
let slidesContainer = document.querySelector("#slider-dress .slides")

redDress.addEventListener('click', function(event) {
	slidesContainer.innerHTML = "<li style='background-image: url("+'images/slider/Photo-Dress-Red.png'+")' class='selected'></li><li></li><li></li>"
	let selectedSlide = slidesContainer.querySelector(".selected")
	selectedSlide.animate([
	  // keyframes
	  { transform: 'scale(.85)' }, 
	  { transform: 'scale(1)' }
	], { 
	  // timing options
	  duration: 500,
	  easing: "ease",
	  iterations: 1
	});
})