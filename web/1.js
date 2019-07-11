if (d) {
    if ("true" !== i && "false" !== i) {
        try {
            document.domain = "qq.com";
            var j = window.top.location.host.toLowerCase();
            j && (window.location = h)
        } catch(k) {
            window.top.location = h
        }
    } else if ("true" === i) {
        try {
            window.location = h
        } catch(k) {
            window.top.location = h
        }
    } else {
        window.top.location = h;
    }
} else {
    window.location = h;
}