import {IObject, IString, INumber, IBoolean, IArray, IStringEscape} from 'jsdk-lang';

export default class IUrl {

    private static link: HTMLAnchorElement = document.createElement('a');

    /**
     * 解析目标URL中的参数成json对象
     * @method deSerialize
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {Object} - 解析为结果对象
     */
    static deSerialize(url: string = location.href): object {
        let reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
            arr_url = reg_url.exec(url),
            ret = {};

        if (arr_url && arr_url[1]) {
            let str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }

    /**
     * 获取访问路径,如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是index.html
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getFile(url: string = location.href): string {
        this.link.href = url;
        return (this.link.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1]
    }

    /**
     * 锚点值,如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是top
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getHash(url: string = location.href): string {
        this.link.href = url;
        return this.link.hash.replace('#', '');
    }

    /**
     * 获取主机(域名或IP)如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,截取的是abc.com
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getHost(url: string = location.href): string {
        this.link.href = url;
        return this.link.hostname;
    }

    /**
     * 查询条件如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,截取的是?id=255&m=hello
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getQuery(url: string = location.href): string {
        this.link.href = url;
        return this.link.search;
    }

    /**
     * 获取访问路径,如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是/dir/index.html
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getPath(url: string = location.href): string {
        this.link.href = url;
        return this.link.pathname.replace(/^([^\/])/, '/$1');
    }

    /**
     * 获取端口号
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getPort(url: string = location.href): string {
        this.link.href = url;
        return this.link.port;
    }

    /**
     * 获取url的协议,如http/https等
     * @method getProtocol
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getProtocol(url: string = location.href): string {
        this.link.href = url;
        return this.link.protocol.replace(':', '');
    }

    /**
     * 获取访问片段,如:http://abc.com:8080/dir/index.html?id=255&m=hello#top,获取的是['dir', 'index.html']
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String}
     */
    static getSegments(url: string = location.href): string[] {
        this.link.href = url;
        return this.link.pathname.replace(/^\//, '').split('/');
    }

    /***
     * 获取当前页面的url信息
     * @returns {string}
     */
    static getUrl(): string {
        return location.href;
    }

    /**
     * 根据参数名从目标URL中获取参数值
     * @method getParameter
     * @param {String} key 要获取的参数名
     * @optional
     * @param {String} url 目标url,默认为浏览器当前的地址
     * @return {String|null} - 获取的参数值，其中URI编码后的字符不会被解码，获取不到时返回null
     */
    static getParameter(key: string, url: string = location.href): string | null {
        let reg = new RegExp("(^|&|\\?|#)" + IStringEscape.escapeReg(key) + "=([^&#]*)(&|\x24|#)", "");
        let match = url.match(reg);
        if (match) {
            return match[2];
        }
        return null;
    }

    /***
     * 将json对象转换为url参数
     * @param {Object} object 目标对象
     * @param {Boolean} encode 是否需要编码,默认值为false
     * @returns {String} 转换后的参数
     * @example
     * let obj = {"name": 'tom', "class": {"className": 'class1'}, "classMates": [{"name": 'lily'}]};
     * IUrl.objectToParam(obj);   =>  name=tom&class.className=class1&classMates[0].name=lily
     */
    static serialize(object: object, encode: boolean = false): string {
        return this._serialize(object, encode);
    }

    private static _serialize(object: object, encode: boolean, key?: string): string {
        let paramStr = "";
        if (IString.isString(object) || INumber.isNumber(object) || IBoolean.isBoolean(object)) {
            paramStr += "&" + key + "=" + (encode ? encodeURIComponent(<any>object) : object);
        } else {
            IObject.each(object, function (i, o) {
                let k = key == null ? i : key + (IArray.isArray(object) ? "[" + i + "]" : "." + i);
                paramStr += '&' + IUrl._serialize(o, encode, k);
            });
        }
        return paramStr.substr(1);
    }
}