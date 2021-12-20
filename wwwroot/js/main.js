AOS.init({
	duration: 800,
	easing: 'slide'
});

(function ($) {
	"use strict";

	$('#owl-productimg').owlCarousel({
		items: 1,
		loop: true,
		autoPlay: 5000,
		transitionStyle: 'fade',
		pagination: true,
		dots: true,
		autoWidth: false,
		responsiveRefreshRate: 200,
		mouseDrag: false,
		singleItem: true
	});

	$('#owl-xgt-banner').owlCarousel({
		items: 1,
		loop: true,
		autoPlay: 10000,
		transitionStyle: 'fade',
		pagination: true,
		dots: true,
		autoWidth: false,
		responsiveRefreshRate: 200,
		mouseDrag: false,
		singleItem: true
	});

	$('.navmenubtn').click(function () {
		$(".navmenu").slideToggle("fast")
	})

})(jQuery);  