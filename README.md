### 说明

八戒工程站群模板

### 参考文档

* bootstrap 4.1.0 文档：https://v4.bootcss.com/docs/getting-started/introduction/
* font-awesome 4.6 文档：http://www.fontawesome.com.cn/faicons/
* layer3.1.1 弹出层文档：https://layer.layui.com/
* swiper 4.5.0 文档：http://www.idangero.us/swiper/

### 主程序更新至8.0.2时需要更新数据库(MySQL)

``` mysql
update siteserver_20210420_1 set IsMainContent=1,AllowAddSubContent=0,RelatedContentId=0,SubContentNum=0 where IsMainContent is null;
update siteserver_20210420_2 set IsMainContent=1,AllowAddSubContent=0,RelatedContentId=0,SubContentNum=0 where IsMainContent is null;
update siteserver_20210420_3 set IsMainContent=1,AllowAddSubContent=0,RelatedContentId=0,SubContentNum=0 where IsMainContent is null;
update siteserver_20210615_2 set IsMainContent=1,AllowAddSubContent=0,RelatedContentId=0,SubContentNum=0 where IsMainContent is null;
drop table siteserver_20210615_1;
```

### 测试环境搭建

访问域名：wl.zbj.com

docker拉取：xueynet/xycms:8.0.2
使用数据库mysql: T_gcbj  dbuser_test_gcbj   ZXc^&*()8
使用Redis 端口：6311  Password:gczbjcom


### 更新说明

一、主程序更新

1. 版本号由8.0.1更新至8.0.2
2. 主框架.net版本由.net3.1升级至.net5
3. 更新Nuget引用组件包至net5适用的最新版本
4. 相关不适用的方法或类进行替换和修正
5. Docker实现以.net5镜像为基础的新版发布包
6. 内容详情增加产品单位字段，实现产品价格时关联单位，栏目可以设置默认单位（仅为产品时显示此设置）
![图片1](wwwroot/img/md/2.png "图片1")
7. 内容功能增强，实现子新闻功能，子新闻关联主新闻，可实现类似杂志封面和内容，课程封面与课节，小说章节的功能
![图片1](wwwroot/img/md/3.png "图片1")
8. 内容添加编辑，设置从内容中提取封面图片（可选择第几张图片）
![图片1](wwwroot/img/md/1.png "图片1")
9. 接口功能改进，支持配置
10. 后台登录方法优化
11. 后台版本升级更新数据库方法改进
12. 完善相关新闻功能，将tag关键字作为查询条件实现相关新闻功能
13. 修正强制登录无法正常登录的Bug
14. 前端框架升级至最新稳定版 包括

|主要框架|原版本号|新版本号|
|-|-|-|
|jquery|1.9.1|3.6|
|bootstrap|4.1.0|4.6|
|vue|2.5.16||
|elementui|2||

二、插件更新

主框架升级至.net5

订单插件功能更新：
1. 增加我的订单 状态显示:已支付 发货中 
2. 增加订单确认验收功能，由用户确认。后台可设置自动确认收货时间，默认为15天，超过15天自动确认验收。
3. 增加申请退款功能，用户可以提交退款申请，后台审核

三、模板更新




### 移动端模板制作工作

##### 首页模板
1. T_系统首页模板.html  已完成
2. T_系统栏目模板.html  已完成
3. T_算造价.html        已完成
4. T_免费设计.html      已完成
5. T_别墅定制.html      已完成
6. T_建房施工.html      已完成
7. T_效果图.html        已完成
8. T_户型设计.html      已完成
9. T_室内装修.html      已完成
10. T_需求.html         已完成
11. T_服务.html         已完成
12. T_服务列表.html     已完成

##### 内容模板

13. T_系统内容模板.html     已完成
14. T_服务内容.html         已完成
15. T_需求内容.html         已完成


### 移动端栏目规划


```
└─ 首页
   ├─ 需求（商机）
   |  ├─ 算造价
   |  ├─ 免费设计
   |  ├─ 别墅定制
   |  ├─ 建房施工
   |  ├─ 效果图
   |  ├─ 户型设计  
   |  └─ 室内装修
   ├─ 服务（产品、内容有价格属性，可以添加多个内容，可以加入订单在线支付）
   |  ├─ 工程设计
   |  |  ├─ 自建房别墅
   |  |  |  ├─ 室内设计
   |  |  |  ├─ 民宿设计
   |  |  |  ├─ 自建房
   |  |  |  ├─ 别墅设计
   |  |  |  ├─ 住宅设计
   |  |  |  └─ 别墅施工
   |  |  ├─ 效果图
   |  |  |  ├─ 彩平图
   |  |  |  ├─ 室内效果图
   |  |  |  ├─ 建筑效果图
   |  |  |  └─ 鸟瞰图
   |  |  ├─ 建筑设计
   |  |  |  ├─ 小区住宅
   |  |  |  ├─ 厂房设计
   |  |  |  ├─ 钢结构
   |  |  |  └─ 公共建筑
   |  |  └─ 规划景观
   |  |     ├─ 园林景观
   |  |     ├─ 私家庭园
   |  |     ├─ 农业园
   |  |     └─ 规划设计
   |  └─ 企业服务
   |     ├─ 资质服务
   |     |  ├─ 资质新办
   |     |  ├─ 股权转让
   |     |  ├─ 企业并购
   |     |  └─ 人才猎聘
   |     └─ 税筹服务
   |        ├─ 税筹策划
   |        ├─ 票务优化
   |        └─ 灵活用工   
   ├─ 咨询（百度商桥）
   └─ 其他
      ├─ banner
      ├─ icon
      ├─ 广告
      └─ 优惠券(特殊表单提交)
      
```


### Docker 搭建环境

```sh
docker run -d \
    --name bajie \
    -p 80:80 \
    --restart=always \
    -v "$(pwd)"/wwwroot:/app/wwwroot \
    -e XYCMS_SECURITY_KEY=e2a3d303-ac9b-41ff-9154-930710af0845 \
    -e XYCMS_DATABASE_TYPE=SQLite \
    xueynet/xycms:latest
```


```sh
docker run -d --name gcbj-xycms -p 80:80 --restart=always -v D:\Work\T_Bajie\wwwroot:/app/wwwroot -e XYCMS_SECURITY_KEY=e2a3d303-ac9b-41ff-9154-930710af0845 -e XYCMS_DATABASE_TYPE=MySql -e XYCMS_DATABASE_CONNECTION_STRING="Server=10.10.1.11;Database=gcbj;Uid=gcbjuser;Pwd=xuey.net;" xueynet/xycms:8.0.2
```

::: tip
/c/Users/1/source/repos/xueynet/XYS/themes/T_Bajie 为您需要挂载的目录，即前端项目文件夹
/c/Users/1/source/repos/xueynet/XYS/themes/T_Bajie/plugins:/app/plugins 插件挂载目录
数据库更改为线上正式使用的数据库
:::


## 首页发布需求

### html与js

```base
<!--发布需求开始-->
    <div class="ui-popup-order-backdrop">
        <div class="ui-popup-order">
            <h1 class="section-left--title">
                发布需求<span class="section-right--title">让全球千万专业人才快速响应您的需求</span>
            </h1>
            <div class="section-form">
                <div class="section-form-item">
                    <label class="section-form-item--label">
                        我需要<span class="section-form-item--red">*</span>
                    </label>
                    <div class="section-form-item--content">
                        <div class="section-form--input j-placeholder-wrapper" style="position: relative;">
                            <textarea class="form-textarea__inner" id="name" placeholder="工程设计、效果图制作、规划设计、建筑设计、全域旅游、城市公共品牌、文创设计；乡村振兴"></textarea>
                        </div>
                        <p class="j-describe-error">
                            <span class="j-error-tip"></span>
                        </p>
                    </div>
                </div>
                <div class="mobile-wrapper section-form-item">
                    <label class="section-form-item--label">
                        手机号码<span class="section-form-item--red">*</span>
                    </label>
                    <div class="section-form-item--content section-form-item--content__new">
                        <div class="section-form--input eidt-mobile-wrapper">
                            <input class="form-input__inner" type="text" id="tel" name="modifyphone" placeholder="便于筛选合适人才后，接收告知信息">
                        </div>
                        <p class="j-verify-error mt5">
                            <span class="j-error-tip"></span>
                        </p>
                        <p class="J-login-tip hide">
                            点击“提交”您将用该手机号码创建猪八戒网账号，且代表您已同意<a href="http://chengxin.zbj.com/report/rule-g-2319" class="login-agreement" target="_blank">《猪八戒网服务协议》</a>
                        </p>
                    </div>
                </div>
                <div class="section-form-green">信息保护中，仅官方可见</div>
                <div class="section-form-item section-form-item__submit">
                    <label class="section-form-item--label">&nbsp;</label>
                    <div class="section-form-item--content">
                        <button class="btn btn__main btn-submit J-submit" type="submit" data-linkid="10197006">免费发布需求</button>
                    </div>
                </div>
            </div>
            <button i="close" class="ui-dialog-order-close popup-close" title="cancel">×</button>
        </div>
    </div>
    <script>
        $('.search-pub-task').click(function () {
            $('.ui-popup-order-backdrop').show();
            $('.ui-popup-order').show();
        });
        $('.search-pub-task1').click(function () {
            $('.ui-popup-order-backdrop').show();
            $('.ui-popup-order').show();
        });
        $('.ui-dialog-order-close').click(function () {
            $('.ui-popup-order-backdrop').hide();
            $('.ui-popup-order').hide();
        });
        $('.form-textarea__inner').bind('input propertychange', function () {
            var length = $(".form-textarea__inner").val().length;
            if (length < 3) {
                $(".j-describe-error").show();
                $(".j-describe-error .j-error-tip").text('填写内容不少于2个字')
            } else {
                $(".j-describe-error").hide();
            }
        });
        $('.form-input__inner').blur(function () {
            if (!/^1[345789]\d{9}$/.test($(".form-input__inner").val())) {
                $(".j-verify-error").show();
                $(".j-verify-error .j-error-tip").text('填写正确的手机号')
            } else {
                $(".j-verify-error").hide();
            }
        })
        $(".btn-submit").on('click', function () {
            var tel = $.trim($(".form-input__inner").val());
            var content = $(".form-textarea__inner").val();

            var reg = /(^0?[1][34578][\d]{9}$)|(^0[1-9][\d]{1,2}[- ]?[\d]{7,8}[-| ]?[\d]*$)/;
            var qq = '';
            var telephone = tel;
            var email = '';
            if (RegExp(reg).test(tel)) {
                var data = JSON.stringify({ "Mobile": tel, "Content": content })
                $.ajax({
                    type: 'POST',
                    url: "/api/form/1/3",
                    data: data,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (result) {
                        if (result.success == true) {
                            $('.section-form-green').text('发布成功！');
                            $(".form-input__inner").val('');
                            $(".form-textarea__inner").val('');
                            setTimeout(function () {
                                $('.ui-popup-order-backdrop').hide();
                                $('.ui-popup-order').hide();
                                $('.section-form-green').text('信息保护中，仅官方可见');

                            }, 1000);
                        } else {
                        }
                    }
                });
                // })
            } else {
                $(".j-verify-error .j-error-tip").text('填写正确的手机号')
            }
        });
        $(function () {
            $("img.lazy").lazyload({
                threshold: 200
            });
        });
    </script>
    <!--发布需求结束-->
```

### css

```bash
.ui-popup-order-backdrop {
    background: rgba(0, 0, 0,0.7);
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;
    z-index: 1028;
    ;
    display: none;
}

.ui-popup-order {
    position: absolute;
    outline: 0px;
    left: 50%;
    margin-left: -327px;
    top: 135px;
    z-index: 1031;
    width: 654px;
    height: 380px;
    padding: 20px 0 48px 0;
    background-color: #fff;
    display: none;
}

.section-left--title {
    color: #333;
    font-size: 18px;
    font-weight: 700;
    padding-left: 25px;
    margin-left: 15px;
    border-left: 6px solid #f60;
    height: 24px;
    line-height: 24px;
    margin-bottom: 32px;
}

    .section-left--title .section-right--title {
        margin: 0;
        color: #666;
        font-size: 16px;
        font-weight: 400;
        margin-left: 20px;
        display: inline-block;
        vertical-align: top;
    }

.section-form {
    padding-left: 50px;
}

.section-form-item--label {
    float: left;
    width: 86px;
    padding-right: 18px;
    line-height: 35px;
    color: #484848;
    font-size: 14px;
    font-weight: 400;
}

.section-form-item--red {
    color: #e32525;
    margin-left: 5px;
}

.section-form-item--content {
    position: relative;
    font-size: 14px;
    margin-left: 88px;
    margin-right: 54px;
}

.form-textarea__inner {
    outline: none;
    width: 460px;
    min-height: 140px;
    line-height: 1.5;
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
    color: #333;
    resize: vertical;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ddd;
}

.js-placeholder {
    color: #999;
    padding: 10px;
    line-height: 1.5;
    font-size: 12px;
}

.j-describe-error, .j-verify-error {
    display: none;
}

.j-error-tip {
    display: inline-block;
    font-size: 12px;
    color: #ff6e6e;
    background: #ffe4e4;
    padding: 3px 80px 3px 5px;
    width: 462px;
    box-sizing: border-box;
    word-break: break-all;
    border: 1px solid #ff6e6e;
}

    .j-error-tip:before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAqUlEQVQokZXQsW0CAQyF4Q8rgiGyAlKAImQGYAHo0kAqxDhhAhZItjghQKzACBRAQQp8BadTBL/0GvvZenbjOp9LmvjCGO2s7bHCN87wko1X/KDjno/UJ0Y4RG6umhupkg5+0QrMajbX8YZpYPKAuWQS6D0x0I0nzHAJrGsa11SVfbj9uUr1SyWrwBLbB+LssAycMMTmn0hbDHAqjz6gjwUKHFNF1t7T4w9KzSKQZUP9uwAAAABJRU5ErkJggg==) 50% no-repeat;
        margin: 0 5px -2px 0;
    }

.form-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ddd;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 35px;
    line-height: 35px;
    outline: none;
    padding: 0 10px;
    width: 100%;
}

.section-form-green {
    color: #429908;
    margin-left: 88px;
    margin-bottom: 20px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}

.btn__main {
    color: #fff;
    background-color: #f60;
    border: none;
    width: 100%;
    text-align: center;
    line-height: 40px;
}

button.btn.btn__main.btn-submit.J-submit:hover {
    background-color: red
}

.popup-close {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 26px;
}

.ui-dialog-order-close {
    float: right;
    padding: 0 4px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    cursor: pointer;
    background: transparent;
    border: 0;
    -webkit-appearance: none;
}

.search-pub-task1:hover {
    color: white;
    background-color: #ff6900;
}
```


### 友盟统计

```javascript
<script type="text/javascript" src="https://s9.cnzz.com/z_stat.php?id=1279850217&web_id=1279850217"></script>
```

查看统计网址：
https://new.cnzz.com/v1/login.php?siteid=1279850217
