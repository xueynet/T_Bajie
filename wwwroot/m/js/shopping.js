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
                var result = r.split("|||")[1];
                console.log(result);

                //微信支付jsapi初始方法
                function onBridgeReady() {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": result.appId, //公众号ID，由商户传入     
                            "timeStamp": result.timestamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": result.nonceStr, //随机串     
                            "package": result.package,
                            "signType": result.signType, //微信签名方式：     
                            "paySign": result.signature //微信签名 
                        },
                        function(res) {
                            if (res.err_msg === "get_brand_wcpay_request:ok") {
                                layer.msg('支付完成');
                                location.href = "/home/";
                            } else if (res.err_msg === "get_brand_wcpay_request:fail") {
                                layer.msg('支付失败,请联系客服');
                            }
                        });
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
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
            var ua = navigator.userAgent.toLowerCase();
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


$('.orderLink').on("click", function() {
    orderConfirm();
});