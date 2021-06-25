$(function() {
    var serviceswiper = new Swiper('.swiper-container-m4 ', {
        speed: 250,
        autoHeight: true,
        on: {
            slideChangeTransitionStart: function() {
                var elemIndex = this.activeIndex;
                $(".m4t span").eq(elemIndex).addClass("active").siblings("span").removeClass("active");
            },
        },
    });
    $('.m4t span ').click(function() {
        $(this).addClass("active").siblings("span").removeClass("active");
        serviceswiper.slideTo($(this).index(), 250, false);
    })
    $('.wall ').jaliswall({ item: '.article ' });
});