'use strict';

window.onload = function () {
    var ls = window.localStorage;

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

            var img = document.createElement("img");
            img.setAttribute('height', '16px');
            img.setAttribute('width', 'auto');
            img.setAttribute('src', data.icons[0].url);

            var li = document.createElement("li");
            li.setAttribute('class', data.id);
            li.appendChild(img);
            li.getElementsByTagName('img')[0].after(span);

            var ul = document.getElementsByTagName('ul');
            ul[0].appendChild(li);
        }
    }

};