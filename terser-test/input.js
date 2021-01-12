var a = 1;
let b = 1;
const c = !0;
const IS_DEV = false;

if (a == 1) {
    console.log('a == 1');
}

if (b == 1) {
    alert('b == 1');
}

if (c) {
    alert('c == 1');
}

if (true) {
    alert('true');
}

if (false) {
    alert('false');
}

function getApiHost() {
    if (IS_DEV) {
        return `//${window.location.host}/api`;
    }

    return API_CONFIG.host;
}

getApiHost()