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
    var bannetSwiper = new Swiper('.swiper-container-bn', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        lazy: { loadPrevNext: true, },

    });
    bannetSwiper.autoplay.stop();

    // 监听轮播图加载情况,等轮播图都加载完毕再执行轮播
    let swiperImg = $('.bannerImages');
    let time = setInterval(() => {
        let val = swiperImg.map((i, v) => {
            if (v.complete) {
                return true
            }
        })
        if (val.length === swiperImg.length) {
            clearInterval(time)
            console.log('轮播图都加载完了')
                // 继续轮播
            bannetSwiper.autoplay.start();
            // 跳到下一张轮播图，为了用户体验更好
            bannetSwiper.slideNext();
        }
    }, 1000);




});