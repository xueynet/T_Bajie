// 验证手机号
$('.phone').blur(function() {
    if (!/^1[3-9]\d{9}$/.test($(".phone").val())) {
        $(".phone-error").show();
        $(".phone-error").text('填写正确的手机号')
    } else {
        $(".phone-error").hide();
    }
});

$("#calculateSubmit").on('click', function() {
    // 获取建房地区
    var address = $('.address').val();
    // 获取开间
    var studio = $('.studio').val();
    // 获取进深
    var depth = $('.depth').val();
    // 获取层数
    var layerNumber = $('.layerNumber').val();
    // 拼接地址，开间，进深，层数放入content里面
    var content = '建房地区:' + address + ',开间:' + studio + '，进深:' + depth + '，层数：' + layerNumber;
    console.log(content);
    // 获取电话
    var tel = $.trim($(".phone").val());
    var reg = /^1[3-9]\d{9}$/;
    var email = '';
    if (RegExp(reg).test(tel)) {
        var data = JSON.stringify({ "Mobile": tel, "Content": content, "Source": document.title + " " + window.location.href })
        $.ajax({
            type: 'POST',
            url: "/api/form/1/1",
            data: data,
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                console.log(result);
                if (result.id > 0) {
                    $('.green').text('提交成功！');
                    $('.address').val('');
                    $('.studio').val('');
                    $('.depth').val('');
                    $('.phone').val('');
                    $('.layerNumber').val('')
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
        $(".phone-error").text('填写正确的手机号')
    }
});