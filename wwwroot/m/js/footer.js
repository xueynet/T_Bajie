function Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function apiShoppingCartAdd(channel, subtype) {
    switch (channel) {
        case "WeChatPay":
            console.log("开始微信支付" + subtype);
            break;
        case "AliPay":
            console.log("开始支付宝支付" + subtype);
            break;
    }
    var data = {
        SiteId: siteId,
        ChannelId: channelId,
        ProductId: productId,
        TelPhone: $('.layui-layer-content input[name="telphone"]').val(),
        Message: $('.layui-layer-content input[name="orderRequire"]').val(),
        Channel: channel,
        SubType: subtype,
        Count: num,
        SessionId: Guid()
    };
    console.log(JSON.stringify(data));

    $.ajax({
        type: "POST",
        url: "/api/shopping/cart/submit",
        headers: { //请求头
            Accept: "application/json; charset=utf-8",
            Authorization: "Bearer " + $token,
        },
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(r) {
            console.log(r);
            if (!r.isLogin) {
                //跳转到微信授权登录
                window.location.href = "/api/login/auth/Weixin?userId=" + result.userIdKey + "&redirectUrl=" + encodeURIComponent(window.location.href);
            }
            if (r.status) {
                var orderId = r.orderId;
                var orderNo = r.orderNo;
                apiPay(orderId, orderNo, channel, subtype);
            } else {
                console.log(r.message);
            }
        }
    });
}

function apiPay(orderId, orderNo, channel, subtype) {
    var returnUrl = window.location.protocol + "//" + window.location.host + "/assets/shopping/layer/paysuccess.html?siteId=" + siteId
    var data = {
        SiteId: siteId,
        OrderNo: orderNo,
        ProductId: productId,
        ProductName: title,
        Message: $('.layui-layer-content input[name="orderRequire"]').val(),
        Fee: parseFloat(price) * num,
        Channel: channel,
        SubType: subtype,
        OrignChannel: channel,
        OrignSubType: subtype,
        OpenId: openId,
        ReturnUrl: returnUrl + "&channel=" + channel
    };
    console.log(JSON.stringify(data));

    $.ajax({
        type: "POST",
        url: "/api/payment/Pay",
        headers: { //请求头
            Accept: "application/json; charset=utf-8",
            Authorization: "Bearer " + $token,
        },
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(r) {
            console.log(r);
            if (subtype == "PubPay") {
                console.log("发起微信支付...");
            }
            if (r.isRedirect) {
                if (channel == "AliPay") {
                    location.href = r.url;
                } else {
                    location.href = r.url + "&redirect_url=" + encodeURIComponent(returnUrl + "&channel=WeChatPay" + "&orderId=" + orderId + "&producturl=" + window.location.href);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            /*输出jqXHR对象的信息*/
            console.log(jqXHR);
            /*输出其他两个参数的信息*/
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

$(function() {

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

    function orderConfirm() {
        //2.3.1.检测登录状态
        var params = {
            "SiteId": siteId
        };
        var channel;
        var subtype;
        $.ajax({
            type: "GET",
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
                //2.3.2 当前为微信浏览器
                if (ua.indexOf('micromessenger') != -1) {
                    //获取微信OpenId
                    $.ajax({
                        type: "GET",
                        url: "/api/login/auth/Weixin/getuniqueId",
                        headers: { //请求头
                            Accept: "application/json; charset=utf-8",
                            Authorization: "Bearer " + $token,
                        },
                        data: JSON.stringify(params),
                        contentType: "application/json",
                        dataType: "json",
                        success: function(t) {
                            openId = t.data;
                            if (openId == null || openId == "") {
                                window.location.href = "/api/login/auth/Weixin?userId=" + result.userIdKey + "&redirectUrl=" + encodeURIComponent(window.location.href)
                            }
                        }
                    });
                }
                //2.3.3 订单信息确认界面呈现
                $('#orderConfirmForm .card .card-footer>div.row').empty();
                var hasPayChannel = false;
                if (result.isWeChatPay) {
                    hasPayChannel = true;
                    channel = "WeChatPay";
                    if (ua.indexOf('micromessenger') != -1) {
                        subtype = "PubPay";
                    } else {
                        subtype = "H5Pay";
                    }
                    $('#orderConfirmForm .card .card-footer>div.row').append('<div class="col"><button type="button" class="btn btn-warning text-white" onclick="apiShoppingCartAdd(\'' + channel + '\',\'' + subtype + '\')">微信支付</button></div>');
                }
                //当前不为微信浏览器
                if (ua.indexOf('micromessenger') == -1 && result.isAliPay) {
                    hasPayChannel = true;
                    channel = "AliPay";
                    subtype = "WapPay";
                    $('#orderConfirmForm .card .card-footer>div.row').append('<div class="col"><button id="btn_alipay" type="button" class="btn btn-warning text-white" onclick="apiShoppingCartAdd(\'' + channel + '\',\'' + subtype + '\')">支付宝支付</button></div>');
                }

                if (!hasPayChannel) {
                    $('#orderConfirmForm input').attr("disabled", "disabled");
                    $('#orderConfirmForm .card .card-footer>div.row').append('<div class="col text-danger">系统未配置支付渠道，不可支付！</div>');
                }
                var orderConfirmForm = $('#orderConfirmForm').html();
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
        orderConfirm();
    });
});