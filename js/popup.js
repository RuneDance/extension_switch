'use strict';

window.onload = function () {
    //获取 background.js 参数
    var background = chrome.extension.getBackgroundPage();

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

    var data = JSON.parse(background.datas);

    for (var i = 0; i < data.length; i++) {


        if (data[i].type == 'extension' && data[i].installType == 'normal') {

            var span = document.createElement("span");
            span.innerHTML = subStrings(data[i].shortName);

            var imgs = document.createElement("img");
            imgs.setAttribute('height', '16px');
            imgs.setAttribute('width', 'auto');
            imgs.setAttribute('src', data[i].icons[0].url);

            var li = document.createElement("li");
            li.setAttribute('id', data[i].id);
            li.appendChild(imgs);
            li.getElementsByTagName('img')[0].after(span);

            var ul = document.getElementsByTagName('ul');
            ul[0].appendChild(li);

            //启用
            if (data[i].enabled) {
                li.setAttribute('class', 'enabled')
                //禁用
            } else {
                imgs.setAttribute('class', 'gray');
                span.setAttribute('class', 'span_disabled');
                li.setAttribute('class', 'disabled');
            }
        }
    }

    //启用 li:##d9ffca img:class!=gray span:#000
    //禁用 li:#EAE8E8 img:class=gray span:#949494
    var uls = document.getElementById('ul');
    var lis = uls.getElementsByTagName('li');
    for (var j = 0; j < lis.length; j++) {
        lis[j].addEventListener('click', function (e) {
            //var li = e.currentTarget;
            var id = e.currentTarget.id;
            var img = e.currentTarget.children[0];
            var span = e.currentTarget.children[1];
            var info = JSON.parse(background.datas);

            for (var k = 0; k < info.length; k++) {
                if (info[k].id == id) {
                    var li = document.getElementById(id);
                    //禁用
                    if (info[k].enabled) {
                        img.setAttribute('class', 'gray');
                        span.setAttribute('class', 'span_disabled');
                        li.setAttribute('class', 'disabled');
                        background.extensionSwitch(id, false);
                        uls.removeChild(li);
                        uls.appendChild(li);
                        break;
                    } else {
                        //启用
                        img.setAttribute('class', '');
                        span.setAttribute('class', '');
                        li.setAttribute('class', 'enabled');
                        background.extensionSwitch(id, true);
                        uls.insertBefore(document.getElementById(id), lis[0]);
                        break;
                    }
                }
            }

        });
    }
};