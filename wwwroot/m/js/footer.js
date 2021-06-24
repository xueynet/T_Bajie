var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?341222a5aa508b29714bfb4370241cf3";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
$(function() {
    $('.consultLink').on("click", function() {
        consultLink();
    });
    function consultLink(){
        console.log("start consult.");
        $('#nb_icon_wrap').click();
    }
});