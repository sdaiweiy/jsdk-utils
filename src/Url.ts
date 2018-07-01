import {IStringEscape} from 'jsdk-lang';

export default class Url {

    /**
     * 给定的访问地址,如果不提供默认为location.href的值
     * @property url
     * @type {String}
     * @default location.href
     */
    url: string;

    /**
     * 协议http/https等
     * @property protocol
     * @type {String}
     * @default null
     */
    protocol: string;

    /**
     * 主机(域名或IP)
     * @property host
     * @type {String}
     * @default null
     */
    host: string;

    /**
     * 端口号
     * @property port
     * @type {String}
     * @default null
     */
    port: string;

    /**
     * 查询条件如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,截取的是?id=255&m=hello
     * @property query
     * @type {String}
     * @default null
     */
    query: string;

    /**
     * 访问的文件如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是index.html
     * @property file
     * @type {String}
     * @default null
     */
    file: string;

    /**
     * 锚点值,如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是top
     * @property hash
     * @type {String}
     * @default null
     */
    hash: string;

    /**
     * 访问路径,如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是/dir/index.html
     * @property path
     * @type {String}
     * @default null
     */
    path: string;

    /**
     * 如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是['dir', 'index.html']
     * @property segments
     * @type {String[]}
     * @default null
     */
    segments: string[];

    /***
     * @param url {String} url 目标URL,如果不传递url,默认以当前页面的地址作为URL解析
     * var url = new Dev.Utils.Url("http://abc.com:8080/dir/index.html?id=255&m=hello#top");<br/>
     * url.port ==> 8080
     */
    constructor(url: string = location.href) {
        let a = document.createElement('a');
        a.href = url;

        this.url = url;
        this.protocol = a.protocol.replace(':', '');
        this.host = a.hostname;
        this.port = a.port;
        this.query = a.search;
        this.file = (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1];
        this.hash = a.hash.replace('#', '');
        this.path = a.pathname.replace(/^([^\/])/, '/$1');
        this.segments = a.pathname.replace(/^\//, '').split('/');
    }

    /**
     * 根据参数名从目标URL中获取参数值
     * @method getQueryString
     * @param {String} key 要获取的参数名
     * @return {String|null} - 获取的参数值，其中URI编码后的字符不会被解码，获取不到时返回null
     */
    getQueryString(key: string): string | null {
        let reg = new RegExp("(^|&|\\?|#)" + IStringEscape.escapeReg(key) + "=([^&#]*)(&|\x24|#)", "");
        let match = this.url.match(reg);
        if (match) {
            return match[2];
        }
        return null;
    }

    /**
     * 解析目标URL中的参数成json对象
     * @method queryToJson
     * @return {Object} - 解析为结果对象
     */
    paramToJson(): object {
        let reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
            arr_url = reg_url.exec(this.url),
            ret = {};

        if (arr_url && arr_url[1]) {
            let str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }
}