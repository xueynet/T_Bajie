$(function() {
    //1.全局定义
    var ACCESS_TOKEN_NAME = "xy_user_access_token";
    var $token = localStorage.getItem(ACCESS_TOKEN_NAME);

    //2.通用方法
    function publishRequire() {
        layer.open({
            type: 2,
            area: ['100%', '100%'],
            shadeClose: true,
            offset: 't',
            title: '发布需求',
            content: '/m/channels/243.html'
        });
    }

    function connectConsult() {
        layer.open({
            type: 2,
            area: ['100%', '100%'],
            shadeClose: true,
            offset: 't',
            title: '客服咨询',
            content: 'https://p.qiao.baidu.com/cps/chat?siteId=16900753&userId=20703937&siteToken=341222a5aa508b29714bfb4370241cf3'
        });
    }

    function orderConfirm(siteId) {
        console.log(siteId);
        //2.3.1.检测登录状态
        var params = {
            "SiteId": siteId
        };
        $.ajax({
            type: 'GET',
            url: "/api/payment/GetPayType",
            headers: { //请求头
                Accept: "application/json; charset=utf-8",
                Authorization: "Bearer " + $token,
            },
            data: JSON.stringify(params),
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                console.log(result);
                if (!result.isLogin) {
                    window.location.href = "/api/login/auth/Zbj?redirectUrl=" + encodeURIComponent(window.location.href);
                    return;
                }
                //2.3.2.订单信息确认（手机号录入）界面呈现
                var orderConfirmForm = $('#orderConfirmForm').html();

                console.log(orderConfirmForm);
                layer.open({
                    type: 1,
                    area: ['100%', '100%'],
                    shadeClose: true,
                    offset: 't',
                    title: '确认订单信息',
                    content: orderConfirmForm,
                    cancel: function() {
                        layer.msg('已取消订单', { time: 5000, icon: 6 });
                    }
                });
            }
        });
    }

    //3.事件绑定
    $('.requireLink').on("click", function() {
        publishRequire();
    });
    $('.consultLink').on("click", function() {
        connectConsult();
    });
    $('.orderLink').on("click", function() {
        orderConfirm($(this).attr("data-siteId"));
    });
});