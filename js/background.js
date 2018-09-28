'use strict';

var ls = window.localStorage;

//获取chrome扩展应用信息
function getExtensionInfo(id, num) {
    chrome.management.get(id, function (info) {
        ls.setItem(num, JSON.stringify(info));
    });
}

//获取所有chrome扩展应用Id
chrome.management.getAll(function (data) {
    data.forEach(function (info, num) {
        getExtensionInfo(info.id, num);
    });
});

//启用/关闭chrome扩展应用
function extensionSwitch(id, bool) {
    if (bool) {
        chrome.management.setEnabled(id, true);
    } else {
        chrome.management.setEnabled(id, false);
    }
}

