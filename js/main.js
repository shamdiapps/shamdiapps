$(function () {
	checkScrolled();

	// Toggle mobile menu classes
	var hamburger = document.getElementById("hamburger");
	if (hamburger) {
		hamburger.addEventListener("click", function() {
			this.classList.toggle("is-active");
			$("header nav").toggleClass("is-open");
			$("body").toggleClass("mobile-menu-is-open");
			gsap.fromTo($(".mobile-background"), {
				height: "0px"
			}, {
				duration: 0.3,
				ease: "power2.inOut",
				height: "100%",
				bottom: "0px",
			});
			gsap.fromTo($("header a"), {
				marginLeft: "20px",
				opacity: "0.3"
			}, {
				duration: 0.5,
				ease: "power2.inOut",
				marginLeft: "0px",
				opacity: "1",
				onComplete: function() {
					gsap.set($("header a"), {clearProps: "all"});
				}
			});
		}, false);
	}

	// On mobile nav link, close the mobile menu
	$("header nav a").on("click", function(){
		if (document.body.clientWidth < 750) {
			this.classList.toggle("is-active");
			$("header nav").toggleClass("is-open");
			$("body").toggleClass("mobile-menu-is-open");
			$("#hamburger").toggleClass("is-active");
		}
	});

	// Add smooth scrolling to all links
	$("a").on('click', function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			scrollTo(hash);
		}
	});

	$('.moreless-button').on("click", function(e) {
		e.preventDefault();
		$('.read-more-text').slideToggle();
		if ($(this).html() == "» Read more") {
			$(this).html("« Read less")
		} else {
			$(this).html("» Read more")
		}
	});

	$(document).scroll(function () {
		checkScrolled();
	});
});

var confettiThrown = false;
var chatAnimated = false;
function checkScrolled() {
	var $body = $("body");
	$body.toggleClass('scrolled', $(this).scrollTop() > 20);
	if ($(this).scrollTop() > 300 && !confettiThrown) {
		throwConfetti();
		confettiThrown = true;
	}
	let chatInView = $(this).scrollTop() > ($(".contact").offset().top - window.innerHeight + 450);
	if (chatInView && !chatAnimated) {
		animateChat();
		chatAnimated = true;
	}

	let headerHeight = $("header").outerHeight();

	if ($(this).scrollTop() + headerHeight >= ($("#contact").offset().top)) {
		$("header nav a").removeClass("active");
		$("#link-contact").addClass("active");
	} else if ($(this).scrollTop() + headerHeight >= ($("#testimonials").offset().top)) {
		$("header nav a").removeClass("active");
		$("#link-testimonials").addClass("active");
	} else if ($(this).scrollTop() + headerHeight >= ($("#intro").offset().top)) {
		$("header nav a").removeClass("active");
		$("#link-intro").addClass("active");
	} else if ($(this).scrollTop() + headerHeight >= ($("#home").offset().top)) {
		$("header nav a").removeClass("active");
		$("#link-home").addClass("active");
	}
}

function scrollTo(hash) {
	// Height offset for fixed header
	var heightOffset = 0;
	if (document.body.clientWidth >= 750) {
		heightOffset = 70;
	} else {
		// Mobile menu
		heightOffset = 60;
	}

	// Using jQuery's animate() method to add smooth page scroll
	// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	$('html, body').animate({
		scrollTop: $(hash).offset().top - heightOffset
	}, 800, function(){
		// Add hash (#) to URL when done scrolling (default click behavior)
		// window.location.hash = hash;
	});
}



function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Confetti
async function throwConfetti() {
	for (var i = 0; i < 100; i++) {
		create(i);
		if (i % 4 == 0) {
			await sleep(2);
		}
	}
}
function create(i) {
	var width = Math.random() * 16;
	var height = width * 0.8;
	var colourIdx = Math.ceil(Math.random() * 3);
	var colour = "red";
	switch(colourIdx) {
		case 1:
			colour = "yellow";
			break;
		case 2:
			colour = "blue";
			break;
		default:
			colour = "red";
	}
	$('<div class="confetti-'+i+' '+colour+'"></div>').css({
		"width" : width+"px",
		"height" : height+"px",
		"top" : -Math.random()*20+"%",
		"left" : Math.random()*100+"%",
		"opacity" : Math.random()+0.5,
		"transform" : "rotate("+Math.random()*360+"deg)"
	}).appendTo('.wrapper-confetti');
	
	drop(i);
}
function drop(x) {
	$('.confetti-'+x).animate({
		top: "100%",
		left: "+="+Math.random()*15+"%"
	}, Math.random()*3000 + 3000, function() {
		// reset(x);
		$('.confetti-'+x).remove();
	});
}
function reset(x) {
	$('.confetti-'+x).animate({
		"top" : -Math.random()*20+"%",
		"left" : "-="+Math.random()*15+"%"
	}, 0, function() {
		drop(x);             
	});
}

function animateChat() {
	var tl = new TimelineMax();
	tl.set($(".messages > .message"), {
		marginTop: 300
	})
	.to($(".messages:first-child > .message"), {
		duration: 0.3,
		ease: Power3.out,
		marginTop: 0,
		opacity: 1
	})
	.to($(".messages:nth-child(2) > .message:nth-child(1)"), {
		delay: 1.5,
		duration: 0.3,
		ease: Power3.out,
		marginTop: 0,
		opacity: 1
	})
	.to($(".messages:nth-child(2) > .message:nth-child(2)"), {
		delay: 1,
		duration: 0.3,
		ease: Power3.out,
		marginTop: 0,
		opacity: 1
	})
	.to($(".messages:nth-child(2) > .message:nth-child(3)"), {
		delay: 2,
		duration: 0.3,
		ease: Power3.out,
		marginTop: 0,
		opacity: 1
	})
	.to($(".messages:nth-child(2) > .message:nth-child(4)"), {
		delay: 2,
		duration: 0.3,
		ease: Power3.out,
		marginTop: 0,
		opacity: 1
	})
	.to($(".messages:nth-child(3) > .message"), {
		delay: 3,
		duration: 0.3,
		ease: Power3.out,
		marginTop: 0,
		opacity: 1
	});
}