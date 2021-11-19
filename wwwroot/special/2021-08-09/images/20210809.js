
        $(".zxbtn").click(function() {
            window.open("//p.qiao.baidu.com/cps/chat?siteId=16253603&userId=20703937&siteToken=a25cb6e03bf7c10ac76134bcc03779b1");
        })
        
        $(function() {
            initFormTextholder("例如：我有个500平的办公室需要设计");
        });
        $('#formMfbjPhone').blur(function() {
            if (!/^1[3-9]\d{9}$/.test($("#formMfbjPhone").val())) {
                $(".phone_error").show();
                $(".phone_error").text('填写正确的手机号')
            } else {
                // $(".phone_error").hide();
                $(".phone_error").text('')
            }
        });

        $("#mfbjButton").on('click', function() {
            var tel = $.trim($("#formMfbjPhone").val());
            var reg = /^1[3-9]\d{9}$/;
            if (RegExp(reg).test(tel)) {
                var data = JSON.stringify({
                    "Mobile": tel,
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
                            $("#formMfbjPhone").val('');
                            $('.phone_error').text('提交成功！');
                            setTimeout(function() {
                                $('.phone_error').text('信息保护中，仅官方可见');
                            }, 3000);
                        } else {
                            console.log(result);
                        }
                    }
                });
                // })
            } else {
                $(".phone_error").text('填写正确的手机号')
            }
        });