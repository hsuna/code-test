const API_CONFIG:Record<string, Record<string, string>> = {
  dev: {
    API_URL: '//hwapidemo.3kwan.com:82',
    API_LOG: '//hwapidemo.3kwan.com:82'
  },
  test: {
    API_URL: '//hwapitest.3kwan.com',
    API_LOG: '//hwapitest.3kwan.com'
  },
  prod: {
    API_URL: '//api.ftegame.com/',
    API_LOG: '//api.ftegame.com/'
  },
  host: {
    API_URL: `//${location.host}/`,
    API_LOG: `//${location.host}/`
  }
};

let env:string = "host";
//json请求接口判断
if (/(demo)/.test(location.hostname)) env = 'dev';
else if (/(192|localhost|test)/.test(location.hostname)) env = 'test';
else if (/\.(joycrit)\.com/.test(location.hostname)) env = 'prod';

export const {
  API_URL,
  API_LOG
} = API_CONFIG[env];
