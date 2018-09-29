'use strict';

var datas;

//获取所有chrome扩展应用信息
chrome.management.getAll(function (data) {
    datas = JSON.stringify(data);
});


//启用/关闭chrome扩展应用
function extensionSwitch(id, bool) {
    if (bool) {
        chrome.management.setEnabled(id, true);
    } else {
        chrome.management.setEnabled(id, false);
    }
}