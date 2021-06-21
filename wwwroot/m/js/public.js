/*(function(){
	let idealViewWidth = document.documentElement.clientWidth || document.body.clientWidth;
	const basicvalue = 1920;
	document.documentElement.style.fontSize = (idealViewWidth / basicvalue) * 100 + 'px';
})()*/
$(function(){
	$('.tab_head ul li').click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $('.tab_head ul li').index($(this));
		$('.tab_content ul li.tab_content_li').eq(index).show().siblings().hide();
	});
	$('.tab_head1 ul li').hover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $('.tab_head1 ul li').index($(this));
		$('.tab_content1 ul li.tab_content_li').eq(index).show().siblings().hide();
	});
	$(".navicon").click(function(){
		$(".navhide").toggleClass("navhide_active")
	})
	$(".nh_close,.nhbg").click(function(){
		$(".navhide").removeClass("navhide_active")
	})
	var swiper = new Swiper('.swiper-container-bn', {
	  autoHeight: true,
      navigation: {
        nextEl: '.swiper-button-next-bn',
        prevEl: '.swiper-button-prev-bn',
      },
      //effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true,
      observer:true,
	  observeParents:true,
    });
    
    var swiper = new Swiper('.swiper-container-public', {
      slidesPerView: 1.5,
      spaceBetween: 15,
      freeMode: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer:true,
	  observeParents:true,
    });
    
})
