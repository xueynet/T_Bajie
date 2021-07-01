 // 验证手机号
 $('.phone').blur(function() {
         if (!/^1[3-9]\d{9}$/.test($(".phone").val())) {
             $(".phone-error").show();
             $(".phone-error").text('填写正确的手机号')
         } else {
             $(".phone-error").hide();
         }
     })
     // 验证问题
 $('.describe').bind('input propertychange', function() {
     var length = $(".describe").val().length;
     if (length < 3) {
         $(".content-error").show();
         $(".content-error").text('填写内容不少于2个字')
     } else {
         $(".content-error").hide();
     }
 });

 // 提交数据
 $(".mipt.msbm .btn.btnbg").on('click', function() {
     // 获取需求
     var content = $(".content").val();
     // 获取电话
     var tel = $.trim($(".phone").val());
     // 获取姓名
     var name = $('.name').val();
     var reg = /^1[3-9]\d{9}$/;
     var qq = '';
     if (RegExp(reg).test(tel)) {
         var data = JSON.stringify({
             "Mobile": tel,
             "Name": name,
             "Content": content,
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
                     $('.green').text('发布成功！');
                     $(".name").val('');
                     $(".content").val('');
                     $(".phone").val('');
                     setTimeout(function() {
                         $('.green').text('信息保护中，仅官方可见');
                     }, 3000);
                     console.log(result);
                 } else {
                     console.log(result);
                 }
             }
         });
         // })
     } else {
         $(".phone-error").text('填写正确的手机号');
     }
 });