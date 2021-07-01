 // 姓名验证
 $('.name').bind('input propertychange', function() {
     var length = $(".name ").val().length;
     if (length < 3) {
         $(".name-error ").show();
         $(".name-error .error-tip ").text('填写内容不少于2个字')
     } else {
         $(".xy-describe-error ").hide();
     }
 });

 // 验证手机号
 $('.phone').blur(function() {
     if (!/^1[3-9]\d{9}$/.test($(".phone ").val())) {
         $(".phone-error ").show();
         $(".phone-error .phone-error-tip ").text('填写正确的手机号')
     } else {
         $(".phone-error ").hide();
     }
 })
 $(".mipt.msbm .btn.btnbg ").on('click', function() {
     // 获取姓名
     var name = $(".name ").val();
     var content = $('.address').val();
     // 获取电话
     var tel = $.trim($(".phone ").val());
     var reg = /^1[3-9]\d{9}$/;
     var qq = '';
     var telephone = tel;
     var email = '';
     if (RegExp(reg).test(tel)) {
         var data = JSON.stringify({ "Mobile ": tel, "Content ": content, "Name ": name, "Source ": document.title + " " + window.location.href })
         $.ajax({
             type: 'POST',
             url: "/api/form/1/1 ",
             data: data,
             contentType: "application/json ",
             dataType: "json ",
             success: function(result) {
                 if (result.id > 0) {
                     $('.green').text('提交成功！');
                     $(".name ").val('');
                     $(".phone ").val('');
                     $(".address ").val('');
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
         $(".j-verify-error .j-error-tip ").text('填写正确的手机号')
     }
 });