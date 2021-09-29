/*!
 * mobile check and redirect.
 */
jQuery(document).ready(function($) {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    if (flag) {
        var redirectUrl = "/m/";
        location = redirectUrl;
    }
});