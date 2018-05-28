(function($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function(){
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	///////////////////////////
	// Owl Carousel
	$('#about-slider').owlCarousel({
		items:1,
		loop:true,
		margin:15,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots : true,
		autoplay : true,
		animateOut: 'fadeOut'
	});

	$('#testimonial-slider').owlCarousel({
		loop:true,
		margin:15,
		dots : true,
		nav: false,
		autoplay : true,
		responsive:{
			0: {
				items:1
			},
			992:{
				items:2
			}
		}
	});

})(jQuery);

// (function($) {

// 	skel.breakpoints({
// 		wide: '(max-width: 1680px)',
// 		normal: '(max-width: 1280px)',
// 		narrow: '(max-width: 980px)',
// 		narrower: '(max-width: 840px)',
// 		mobile: '(max-width: 736px)'
// 	});

// 	$(function() {

// 		var	$window = $(window),
// 			$body = $('body'),
// 			$header = $('#header'),
// 			$banner = $('#banner');

// 		// Disable animations/transitions until the page has loaded.
// 			$body.addClass('is-loading');

// 			$window.on('load', function() {
// 				$body.removeClass('is-loading');
// 			});

// 		// CSS polyfills (IE<9).
// 			if (skel.vars.IEVersion < 9)
// 				$(':last-child').addClass('last-child');

// 		// Fix: Placeholder polyfill.
// 			$('form').placeholder();

// 		// Prioritize "important" elements on narrower.
// 			skel.on('+narrower -narrower', function() {
// 				$.prioritize(
// 					'.important\\28 narrower\\29',
// 					skel.breakpoint('narrower').active
// 				);
// 			});

// 		// // Scrolly links.
// 		// 	$('.scrolly').scrolly({
// 		// 		speed: 1000,
// 		// 		offset: -10
// 		// 	});

// 		// // Dropdowns.
// 		// 	$('#nav > ul').dropotron({
// 		// 		mode: 'fade',
// 		// 		noOpenerFade: true,
// 		// 		expandMode: (skel.vars.touch ? 'click' : 'hover')
// 		// 	});

// 		// Off-Canvas Navigation.

// 			// Navigation Button.
// 				$(
// 					'<div id="navButton">' +
// 						'<a href="#navPanel" class="toggle"></a>' +
// 					'</div>'
// 				)
// 					.appendTo($body);

// 			// Navigation Panel.
// 				$(
// 					'<div id="navPanel">' +
// 						'<nav>' +
// 							$('#nav').navList() +
// 						'</nav>' +
// 					'</div>'
// 				)
// 					.appendTo($body)
// 					.panel({
// 						delay: 500,
// 						hideOnClick: true,
// 						hideOnSwipe: true,
// 						resetScroll: true,
// 						resetForms: true,
// 						side: 'left',
// 						target: $body,
// 						visibleClass: 'navPanel-visible'
// 					});

// 			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
// 				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
// 					$('#navButton, #navPanel, #page-wrapper')
// 						.css('transition', 'none');

// 		// Header.
// 		// If the header is using "alt" styling and #banner is present, use scrollwatch
// 		// to revert it back to normal styling once the user scrolls past the banner.
// 		// Note: This is disabled on mobile devices.
// 			// if (!skel.vars.mobile
// 			// &&	$header.hasClass('alt')
// 			// &&	$banner.length > 0) {

// 			// 	$window.on('load', function() {

// 			// 		$banner.scrollwatch({
// 			// 			delay:		0,
// 			// 			range:		1,
// 			// 			anchor:		'top',
// 			// 			on:			function() { $header.addClass('alt reveal'); },
// 			// 			off:		function() { $header.removeClass('alt'); }
// 			// 		});

// 			// 	});

// 			// }

// 	});

// })(jQuery);
