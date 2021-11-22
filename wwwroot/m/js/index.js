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

 
//tags输入
$(".xqtags").find('button').each(function(){
    $(this).click(function(){
        $(".sy-describe").val($(this).text())
        checkdescribe()
        $(".sy-phone").focus()
    })
})
// 验证需求
function checkdescribe() {
    var val = $(".sy-describe").val();
    if (val=='') {
        $(".describeerror").show();
    } else {
        $(".describeerror").hide();
    }
}
// 验证手机号
function checkphone() {
    if (!/^1[3-9]\d{9}$/.test($(".sy-phone").val())) {
        $(".phoneerror").show();
    } else {
        $(".phoneerror").hide();
    }
}
$(".sysqbtn").on('click', function() {
    // 获取需求
    var content = $(".sy-describe").val();
    // 获取电话
    var tel = $.trim($(".sy-phone").val());
    if(content==''||tel=='') {
        checkdescribe()
        checkphone()
        return
    }
    $('.sysqbtn span').text('正在提交');
    $(".icon-updata").show()
    $('.sysqbtn').attr('disabled',true)
    
    var reg = /^1[3-9]\d{9}$/;
    var qq = '';
    var telephone = tel;
    var email = '';
    if (RegExp(reg).test(tel)) {
        var data = JSON.stringify({
            "Mobile": tel,
            "Content": content,
            "Source": document.title + " " + window.location.href
        })
        $.ajax({
            type: 'POST',
            url: "/api/form/1/1",
            data: data,
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                if (result.id > 0) {
                    $('.sysqbtn span').text('提交成功，请等待客服联系！');
                } else {
                    console.log(result);
                }
            },
            error:function(error){
                $('.sysqbtn span').text(error.responseJSON.message);
                console.log(error);
            },
            complete:function(res){
                setTimeout(function() {
                    $(".icon-updata").hide()
                    $(".sy-describe").val('');
                    $(".sy-phone").val('');
                    $('.sysqbtn span').text('马上为我推荐');
                    $('.sysqbtn').attr('disabled',false)
                }, 5000);
            }
        });
    } else {
        checkphone()
    }
});