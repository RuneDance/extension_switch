'use strict';

window.onload = function () {
    //获取 background.js 参数
    var background = chrome.extension.getBackgroundPage();

    //获取浏览器本地 localStorage 对象
    var ls = window.localStorage;

    /**
     * 截取字符串长度
     * @param str
     * @returns {*}
     */
    function subStrings(str) {
        if (str.length > 15) {
            return str.substring(0, 15) + ' ...';
        } else {
            return str;
        }
    }

    for (var i = 0; i < ls.length; i++) {
        var data = JSON.parse(ls[i]);

        if (data.type == 'extension' && data.installType == 'normal') {
            var span = document.createElement("span");
            span.innerHTML = subStrings(data.shortName);

            var imgs = document.createElement("img");
            imgs.setAttribute('height', '16px');
            imgs.setAttribute('width', 'auto');
            imgs.setAttribute('src', data.icons[0].url);
            if (!data.enabled) {
                imgs.setAttribute('class', 'gray');
                span.style.color = '#949494';
            }

            var li = document.createElement("li");
            if (data.enabled) {
                li.style.backgroundColor = '#d9ffca';
            }
            li.setAttribute('class', data.id);
            li.appendChild(imgs);
            li.getElementsByTagName('img')[0].after(span);

            var ul = document.getElementsByTagName('ul');
            ul[0].appendChild(li);
        }
    }

    //启用 li:##d9ffca img:class!=gray span:#000
    //禁用 li:#EAE8E8 img:class=gray span:#949494
    var lis = document.getElementsByTagName('li');
    for (var j = 0; j < lis.length; j++) {
        lis[j].addEventListener('click', function (e) {
            var id = e.currentTarget.className;
            var img = e.srcElement.children[0];
            var span = e.srcElement.children[1];
            var li = e.currentTarget;
            //var li = document.getElementsByClassName(id);

            for (var k = 0; k < ls.length; k++) {
                var info = JSON.parse(ls[k]);
                if (info.id == id) {
                    //禁用
                    if (info.enabled) {
                        img.setAttribute('class', 'gray');
                        span.style.color = '#949494';
                        li.style.backgroundColor = '#EAE8E8';
                        background.extensionSwitch(id, false);
                        window.location.reload();
                    } else {
                        //启用
                        img.setAttribute('class', '');
                        span.style.color = '#000';
                        li.style.backgroundColor = '#dff0d8';
                        background.extensionSwitch(id, true);
                        window.location.reload();
                    }
                }
            }
        });
    }

};