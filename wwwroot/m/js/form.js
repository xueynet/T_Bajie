// 验证需求
$('.xy-describe').bind('input propertychange', function() {
    var length = $(".xy-describe").val().length;
    if (length < 3) {
        $(".xy-describe-error").show();
        $(".xy-describe-error .xy-error-tip").text('填写内容不少于2个字')
    } else {
        $(".xy-describe-error").hide();
    }
});

// 验证手机号
$('.xy-phone').blur(function() {
    if (!/^1[3-9]\d{9}$/.test($(".xy-phone").val())) {
        $(".xy-phone-error").show();
        $(".xy-phone-error .xy-phone-error-tip").text('填写正确的手机号')
    } else {
        $(".xy-phone-error").hide();
    }
})
$(".mipt.msbm .btn.btnbg").on('click', function() {
    console.log(1111);
    // 获取需求
    var content = $(".xy-describe").val();
    // 获取电话
    var tel = $.trim($(".xy-phone").val());
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
                    $('.green').text('提交成功！');
                    $(".xy-describe").val('');
                    $(".xy-phone").val('');
                    setTimeout(function() {
                        $('.green').text('信息保护中，仅官方可见');
                    }, 3000);
                } else {
                    console.log(result);
                }
            }
        });
        // })
    } else {
        $(".j-verify-error .j-error-tip").text('填写正确的手机号')
    }
});