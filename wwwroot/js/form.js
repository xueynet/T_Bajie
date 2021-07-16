var frmTitle;
var frmPlaceholder;
var frmSuccessTxt;
var frmHref;
$('.xy-form-btn').click(function() {
    if (!$.isEmptyObject($(this).attr("data-title"))) {
        frmTitle = $(this).attr("data-title");
    } else {
        frmTitle = document.title;
    }
    if (!$.isEmptyObject($(this).attr("data-placeholder"))) {
        frmPlaceholder = $(this).attr("data-placeholder");
    } else if ($.isEmptyObject(frmPlaceholder)) {
        frmPlaceholder = "工程设计、效果图制作、规划设计、建筑设计、全域旅游、城市公共品牌、文创设计；乡村振兴"
    }
    initFormTextholder(frmPlaceholder);
    if (!$.isEmptyObject($(this).attr("data-successTxt"))) {
        frmSuccessTxt = $(this).attr("data-successTxt");
    } else {
        frmSuccessTxt = "发布成功！";
    }
    if (!$.isEmptyObject($(this).attr("data-href"))) {
        frmHref = $(this).attr("data-href");
    } else {
        frmHref = window.location.href;
    }
    $('.ui-popup-order-backdrop').show();
    $('.ui-popup-order').show();
});
$('.ui-dialog-order-close').click(function() {
    $('.ui-popup-order-backdrop').hide();
    $('.ui-popup-order').hide();
});

function initFormTextholder(str) {
    frmPlaceholder = str;
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
    if (RegExp(reg).test(tel)) {
        var data = JSON.stringify({
            "Mobile": tel,
            "Content": content,
            "Source": frmTitle + " " + frmHref
        })
        $.ajax({
            type: 'POST',
            url: "/api/form/1/1",
            data: data,
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                if (result.id > 0) {
                    layer.msg(frmSuccessTxt);
                    $('.section-form-green').text(frmSuccessTxt);
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