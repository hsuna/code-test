(function() {
    var r = /share_str=([^&]+)/;
    var rMatchShare = /[&\?]is_share=([^&]+)/;
    var search = location.search;
    var isNeedJump = true;
    window.isStopLoading = false;

    if (!search) {
        search = '?';
    }
    var share = search.match(rMatchShare);
    var code = search.match(r);
    var shareState = share ? share[1] : '0';
    var shareCode = code ? code[1] : '';
	window.PREV_CODE = shareCode;
    window.SHARE_STATE = shareState;

    /**
     * - 如果没有分享标识，视为自由用户不需要跳转
     * - 修改分享标识
     * */
    if (shareState !== '1') {
        isNeedJump = false;
        var modifySearch = share
            ? search.replace(/([&\?])is_share=[^&]+/, '$1is_share=1')
            : (search += '&is_share=1');
        history.replaceState(
            {},
            '',
            location.origin + location.pathname + modifySearch
        );
    }

    /**如果没有上一个用户的分享码，视为自由用户不需要跳转 */
    if (!shareCode) {
        window.SHARE_STATE === '1' && (window.SHARE_STATE = '0');
        isNeedJump = false;
    }

    if (!isNeedJump) {
        return;
    }
   
    window.isStopLoading = true;

    var fnname = '_' + new Date().getTime() + '_' + Math.random().toFixed(0);
    var script = document.createElement('script');
    window[fnname] = function(res) {
        window[fnname] = undefined;
        delete window[fnname];
        document.head.removeChild(script);
        if (res.code !== 0) {
            window.isStopLoading = false;
            return;
        }
        if (!res.data.need_jump) {
            window.isStopLoading = false;
            return;
		}
        location.replace(res.data.share_url);
    };
    console.log(' window.isStopLoading', window.isStopLoading)
    script.src =
        window.domain +
        '?ct=hd_chunjie&ac=getShareUrl&share_code=' +
        shareCode +
        '&callback=' +
        fnname;
    document.head.appendChild(script);
})();
