$(function() {
    //1.微信初始化
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') != -1) {
        console.log('Current PageUrl:' + link)
        var postData = JSON.stringify({
            Url: link
        });
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/api/wx/getJsSdk/" + siteId,
            contentType: "application/json;charset=UTF-8", //指定消息请求类型
            data: postData,
            success: function(result) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: result.appId, // 必填，公众号的唯一标识
                    timestamp: result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: result.nonceStr, // 必填，生成签名的随机串
                    signature: result.signature, // 必填，签名
                    jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2。详见：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
                });
                wx.error(function(res) {
                    console.log(res);
                    //alert('验证失败');
                });
                wx.ready(function() {
                    //转发到朋友圈
                    wx.onMenuShareTimeline({
                        title: title,
                        link: link,
                        imgUrl: imgUrl,
                        success: function() {
                            alert('转发成功！');
                        },
                        cancel: function() {
                            alert('转发失败！');
                        }
                    });
                    //转发给朋友
                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: imgUrl,
                        type: 'link',
                        dataUrl: '',
                        success: function() {
                            alert('转发成功！');
                        },
                        cancel: function() {
                            alert('转发失败！');
                        }
                    });
                });
            }
        });
    }

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

    //3.事件绑定
    $('.requireLink').off().on("click", function() {
        publishRequire();
    });
    $('.consultLink').off().on("click", function() {
        connectConsult();
    });
});