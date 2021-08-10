function openclosetck() {
    $("#xzxqtck").fadeToggle()
}

function patternjc(phone) {
    var pattern = /^1[3-9]\d{9}$/;
    if (pattern.test(phone) && phone.length == 11) {
        return true;
    } else {
        return false;
    }
}
$(".zxbtn").click(function() {
    window.open("http://p.qiao.baidu.com/cps/chat?siteId=9257917&userId=20703937&siteToken=a25cb6e03bf7c10ac76134bcc03779b1");
})
$("a.close").click(function() {
    openclosetck()

})
$("#mfbj").click(function() {
    var phone = $("#mfbjphone").val()
    var zcyz = patternjc(phone)
    if (zcyz) {
        $("#mfbjphone").val("")
        var data = JSON.stringify({
            "Mobile": phone,
            "Content": document.title,
            "Source": document.title + " " + window.location.href
        })
        $.ajax({
            type: "POST",
            url: "/api/form/1/1",
            contentType: "application/json",
            dataType: "json",
            data: data,
            success: function(data) {
                openclosetck()
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.error(errorThrown)
            }
        })
    } else {
        alert("手机号码错误")
    }

})



$("#ljdzsjtj").click(function() {
    var item1 = $("#ljdzsjxm").val()
    var item2 = $("#ljdzsjdh").val()
    var item3 = $("#ljdzsjim").val()
    var item4 = $("#ljdzsjjj").val()
    var group = []
    if (item1 != '' && item2 != '' && item3 != '' && item4 != '') {
        if (patternjc(item2)) {
            alert("提交成功，敬候佳音")
            group = [{
                "姓名": item1
            }, {
                "电话": item2
            }, {
                "QQ/微信": item3
            }, {
                "房屋情况": item4
            }]
            console.log(group)
        } else {
            alert("提交失败，手机号错误")
        }
    } else {
        alert("提交失败，请完善信息再提交")
    }
})