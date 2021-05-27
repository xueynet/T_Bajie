AOS.init({
    duration: 800,
    easing: 'slide'
});

(function($) {
    "use strict";

    $(function() {
        $("img.lazy").lazyload({ effect: "fadeIn" });
    });

    //  01. Menu Navvar
    $(".navbar-nav a, .scroll-icon a, .appai-preview .button-group a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function() {
                window.location.hash = hash;
            });
        }
    });

    $(".h5-btns li a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').scrollTop($(hash).offset().top - $(window).height() / 3);
            window.location.hash = hash;
            /*
            $('html, body').animate({
                scrollTop: $(hash).offset().top - $(window).height() / 3
            }, 600, function() {
                window.location.hash = hash;
            });
            */
        }
    });

    $(".down-btn").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function() {
                window.location.hash = hash;
            });
        }
    });

    // 02. Nav Var Remove Add
    $(document).on("click", ".navbar-nav a", function() {
        $(".navbar-nav").find("li").removeClass("active");
        $(this).closest("li").addClass("active");
    });

    // 03. Scrool Spy
    $('body').scrollspy({ target: '#navigation' })

    // 04. Sticky Header
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 0) {
            $('#header-top').addClass("navbar-fixed-top");
        } else {
            $('#header-top').removeClass("navbar-fixed-top");
        }
    });

    // 05. Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });



    // 12. Screenshot Slider
    $('.screenshot-slider').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3,
        dots: false,
        arrows: false,
        autoplay: true,
        prevArrow: '<button class="slick-prev ss2-prev" type="button"><i class="icofont icofont-thin-left"></i></i></button>',
        nextArrow: '<button class="slick-next ss2-next" type="button"><i class="icofont icofont-thin-right"></i></button>',
    });

    // 13. scrollUp
    /*
      $.scrollUp({
        scrollText: '<i class="bi-arrow-bar-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
      });
    */

    $('#owl-banner').owlCarousel({
        items: 1,
        autoPlay: true,
        loop: true,
        autoPlay: 8000,
        transitionStyle: 'fade',
        pagination: true,
        dots: true,
        autoWidth: false,
        responsiveRefreshRate: 200,
        mouseDrag: false,
        singleItem: true
    });

    $('.navmenubtn').on('click', function() {
            $(".navmenu").slideToggle("fast")
        })
        // 14. Wow JS
    new WOW().init();



})(jQuery);
