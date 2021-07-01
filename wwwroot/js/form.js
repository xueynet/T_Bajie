$('.xy-form-btn').click(function() {
    $('.ui-popup-order-backdrop').show();
    $('.ui-popup-order').show();
});
$('.ui-dialog-order-close').click(function() {
    $('.ui-popup-order-backdrop').hide();
    $('.ui-popup-order').hide();
});

function initFormTextholder(str) {
    $('.form-textarea__inner').attr('placeholder', str);
}
$('.form-textarea__inner').bind('input propertychange', function() {
    var length = $(".form-textarea__inner").val().length;
    if (length < 3) {
        $(".j-describe-error").show();
        $(".j-describe-error .j-error-tip").text('填写内容不少于2个字')
    } else {
        $(".j-describe-error").hide();
    }
});
$('.form-input__inner').blur(function() {
    if (!/^1[3-9]\d{9}$/.test($(".form-input__inner").val())) {
        $(".j-verify-error").show();
        $(".j-verify-error .j-error-tip").text('填写正确的手机号')
    } else {
        $(".j-verify-error").hide();
    }
})
$(".btn-submit").on('click', function() {
    var tel = $.trim($(".form-input__inner").val());
    var content = $(".form-textarea__inner").val();

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
                    $('.section-form-green').text('发布成功！');
                    $(".form-input__inner").val('');
                    $(".form-textarea__inner").val('');
                    setTimeout(function() {
                        $('.ui-popup-order-backdrop').hide();
                        $('.ui-popup-order').hide();
                        $('.section-form-green').text('信息保护中，仅官方可见');

                    }, 1000);
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