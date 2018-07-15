/***
 * @property path cookie路径
 * @property expires cookie过期时间，Number型，单位为毫秒。
 * @property domain cookie域名
 * @property secure cookie是否安全传输
 */
export interface ICookieConfig {
    path?: string,
    expires?: number,
    domain?: string,
    secure?: boolean
}

export default class ICookie {

    /**
     * 读取key对应的cookie的值
     * @method get
     * @static
     * @param {String} key 给定的key
     * @return {String|null}
     */
    static get(key: string): string | null {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    };

    /**
     * 判断是否将给定的key设置了cookie
     * @method hasKey
     * @static
     * @param {String} key
     * @return {Boolean}
     */
    static hasKey(key: string): boolean {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    };

    /**
     * 获取所有cookie对应的key
     * @method keys
     * @static
     * @return {Array}
     */
    static keys(): string[] {
        let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (let i = 0, len = aKeys.length; i < len; i++) {
            aKeys[i] = decodeURIComponent(aKeys[i]);
        }
        return aKeys;
    };

    /**
     * 移除cookie
     * @method remove
     * @static
     * @param {String} key 给定的key
     * @return {Boolean}
     */
    static remove(key: string): boolean {
        if (!key || !this.hasKey(key)) {
            return false;
        }
        this.set(key, '', {expires: -1000 * 60 * 60 * 24});
        return true;
    };

    /**
     * 设置cookie
     * @method set
     * @static
     * @param {String} key key
     * @param {String} value value
     * @param {ICookieConfig} options 可选参数
     */
    static set(key: string, value: string, options: ICookieConfig = {}): boolean {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            return false;
        }

        let expires = options.expires,
            now = new Date();

        now.setTime(now.getTime() + options.expires);

        document.cookie =
            key + "=" + value
            + (options.path ? "; path=" + options.path : "")
            + (expires ? "; expires=" + (<any>now).toGMTString() : "")
            + (options.domain ? "; domain=" + options.domain : "")
            + (options.secure ? "; secure" : '');

        return true;
    };

}