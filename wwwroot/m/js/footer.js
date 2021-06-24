$(function() {
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
    $('.requireLink').on("click", function() {
        publishRequire();
    });
    $('.consultLink').on("click", function() {
        connectConsult();
    });
});