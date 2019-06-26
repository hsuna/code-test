(function () {
    //加search
    var search = location.search;
    var nowTime = new Date().getTime();
    if (!search) {
        location.replace(
            location.origin +
            location.pathname +
            '?v=' +
            nowTime +
            location.hash || ''
        );
        return;
    }
    if (!/v=\d+/.test(search)) {
        location.replace(
            location.origin +
            location.pathname +
            search +
            '&v=' +
            nowTime +
            location.hash || ''
        );
        return;
    }
    var time = parseInt(search.match(/v=(\d+)/)[1]);
    if (nowTime - time > 50000) {
        search = search.replace(/v=(\d+)/, 'v=' + nowTime);
        location.replace(
            location.origin + location.pathname + search + location.hash || ''
        );
    }
})();

(function () {
    if (/cache=clear/.test(location.search)) {
        localStorage.clear();
    }
})();

(function () {
    window.ENV = '';
    if (location.port) ENV = 'local';

    if (/demo/.test(location.hostname)) ENV = 'dev';
    if (/3k\.com/.test(location.hostname)) ENV = 'production';
    if (/3kwan\.com/.test(location.hostname)) ENV = 'production';
    if (/yeahyoo\.com/.test(location.hostname)) ENV = 'production';
    if (/test/.test(location.hostname)) ENV = 'test';
    if (/online\.3k\.com/.test(location.hostname)) ENV = 'online';

    window.hList = {
        local: 'hapitest.3kwan.com',
        test: 'hapitest.3kwan.com',
        dev: 'hapidemo.3kwan.com:83',
        production: 'hapi.3k.com'
    };
    //授权域名
    window.aList = {
        local: 'ptusertest.3kwan.com',
        dev: 'ptuserdemo.3kwan.com:83',
        test: 'ptusertest.3kwan.com',
        online: 'ptuseronline.3k.com',
        production: 'ptuser.3k.com'
    };

    //分享域名
    window.shareList = {
        local: 'hapitest.3kwan.com',
        dev: 'hapitest.3kwan.com',
        test: 'hapitest.3kwan.com',
        online: 'hapi.3k.com',
        production: 'hapi.3k.com'
    };

    window.payList = {
        local: 'ptpaytest.3kwan.com',
        dev: 'ptpaytest.3kwan.com',
        test: 'ptpaytest.3kwan.com',
        production: 'pay.3k.com'
    };

    window.useMock = /mock=1/.test(location.search);
    window.domain = window.useMock ?
        '//120.132.37.237:3000/mock/94/' :
        '//' + hList[ENV] + '/main3.0.php';

    window.shareImg =
        location.protocol +
        '//' +
        location.hostname +
        '/cbzj/' +
        'static/img/share.jpg?' +
        new Date().getTime();
    window.go2login = function () {
        location.replace(
            '//' +
            aList[ENV] +
            '?ct=user&ac=user_oauth&callbackUrl=' +
            encodeURIComponent(
                location.origin + location.pathname + location.search
            )
        );
    };

    if (ENV != 'local') {
        document.cookie.match(
            new RegExp('(^| )' + 'a08e175432b87f39' + '=([^;]*)(;|$)')
        ) == null && window.go2login();
    }
})();

(function () {
    function setFontSize(k) {
        document.documentElement.style.fontSize =
            (((k / 750) * 100) / 16) * 100 + '%';
    }

    function initRem() {
        var W = document.documentElement.clientWidth;
        var H = document.documentElement.clientHeight;
        if (W < H) {
            setFontSize(W);
        } else {
            setFontSize(H);
        }
    }
    initRem();
    var time = null;
    window.addEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        function () {
            if (Math.abs(window.orientation) !== 90) {
                clearTimeout(time);
                time = setTimeout(function () {
                    clearTimeout(time);
                    initRem();
                }, 200);
            }
        },
        false
    );
})();
