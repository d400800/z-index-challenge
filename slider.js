(function(){
	
	// choosing between animation-fade & animation-swipe
	var sliderAnimation = "animation-swipe";

	//define a slider object
	function slider(element, navigation) {
		this.element = document.getElementById(element);
		this.slides = this.element.querySelector('.slides').getElementsByTagName('li');
		this.slidesNumber = this.slides.length;
		this.arrowsNavigation = document.getElementById(navigation);

		this.selectedSlide = 0;
		this.prevSelectedSlide = 0;
		this.intervalId;
		//check if mouse is over the slide element
		this.hovered = false;

		this.bindEvents();
		this.initAutoPlay();
		this.element.classList.add(sliderAnimation);
	}

	slider.prototype.bindEvents = function() {
		var self = this;

		//swipe on mobile
		var lastTouch = null;
	    self.element.addEventListener('touchmove', function(e){
	        lastTouch = e;
	    });
		self.element.addEventListener('touchstart', function(e){
	        startX = e.targetTouches[0].screenX;
	    });
	    self.element.addEventListener('touchend', function(e){
	    	if (lastTouch != null) {
		        endX = lastTouch.targetTouches[0].screenX;
		        var threshold = Math.abs(startX-endX);
		        if (threshold > 30) {
			    	if (startX < endX){
			    		var newSlideIndex = self.selectedSlide + 1;
			    	}
			    	else {
			    		var newSlideIndex = self.selectedSlide - 1;
			    	}
			    	self.showNewSlide(newSlideIndex);
				    lastTouch = null;
		    	}
	    	}
	    });

		//detect click on arrows
		this.arrowsNavigation.addEventListener('click', function(event){
			if( event.target.tagName.toLowerCase() == 'a' ) {
				event.preventDefault();
				//determine new slide index
				var newSlideIndex = ( event.target.classList.contains('next') )
					? self.selectedSlide + 1
					: self.selectedSlide - 1;

				self.showNewSlide(newSlideIndex);
			}
		});
		//stop autoplay while hovering over the slider
		this.element.addEventListener('mouseenter', function(){
			self.hover = true;
			clearInterval(self.intervalId);
		});
		//initialize autoplay when leaving the slider
		this.element.addEventListener('mouseleave', function(){
			self.hover = false;
			self.initAutoPlay();
		});
	}

	slider.prototype.initAutoPlay = function() {
		var self = this;
		this.intervalId = setInterval(function(){
			self.showNewSlide(self.selectedSlide + 1);
		}, 500000);
	}

	slider.prototype.showNewSlide = function(index) {
		// swipe animation
		if(sliderAnimation == "animation-swipe"){
			clearInterval(this.intervalId);
			if( index < 0 ) index = this.slidesNumber - 1;
			if( index > this.slidesNumber - 1 ) index = 0;
			this.prevSelectedSlide = this.selectedSlide;
			this.selectedSlide = index;

			for( var i = 0; i < this.slidesNumber; i++) {
				if( i < this.selectedSlide ) {
					this.slides[i].classList.add('move-left');
					this.slides[i].classList.remove('selected', 'visible');
				} else if( i == this.selectedSlide ) {
					this.slides[i].classList.add('selected');
					this.slides[i].classList.remove('move-left');
				} else {
					this.slides[i].classList.remove('selected', 'move-left', 'visible');
				}
			}

			this.slides[this.prevSelectedSlide].classList.add('visible');
		}

		// fade animation
		if(sliderAnimation == "animation-fade"){
			clearInterval(this.intervalId);
			if( index < 0 ) index = this.slidesNumber - 1;
			if( index > this.slidesNumber - 1 ) index = 0;
			this.selectedSlide = index;

			for( var i = 0; i < this.slidesNumber; i++) { 
				if( i == this.selectedSlide ) {
					this.slides[i].classList.add('selected');
				} else {
					this.slides[i].classList.remove('selected');
				}
			}
			
			if( !this.hover ) this.initAutoPlay();
		}
	}

	function elementIndex(element) {
		var siblings = element.parentElement.children;
		for ( var i = 0; i < siblings.length; i++ ) {
			if( siblings[i] == element ) return i;
		}
		return -1;
	}

	var dressSlider = new slider('slider-dress', 'dress-slider-navigation');
	var shoesSlider = new slider('slider-shoes', 'shoes-slider-navigation');
})(); //end of the wrapping function