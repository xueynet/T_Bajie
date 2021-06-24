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

    // 首页轮播图
    var swiper = new Swiper('.swiper-container-bn', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        observer:true,
        observeParents:true,
      });
});




