$(".forMyServices").on('click', function() {
    // 获取电话
    var tel = $.trim($(".phone").val());
    var reg = /^1[3-9]\d{9}$/;
    var qq = '';
    var telephone = tel;
    var email = '';
    if (RegExp(reg).test(tel)) {
        var data = JSON.stringify({ "Mobile": tel, "Source": document.title + " " + "https://gc.zbj.com/" })
        $.ajax({
            type: 'POST',
            url: "/api/form/1/1",
            data: data,
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                if (result.id > 0) {
                    $('.green').text('提交成功！');
                    $(".phone").val('');
                    console.log(result);
                    setTimeout(function() {
                        alert('稍后联系您!');
                        // $('.green').text('信息保护中，仅官方可见');
                    }, 3000);
                } else {
                    console.log(result);
                }
            }
        });
        // })
    } else {
        alert('填写正确的手机号');
        $(".j-verify-error .j-error-tip").text('填写正确的手机号')
    }
});
$("#onlineConsul").click(function() {
    window.open("//p.qiao.baidu.com/cps/chat?siteId=9257917&userId=20703937&siteToken=a25cb6e03bf7c10ac76134bcc03779b1");
});