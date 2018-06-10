/**
 * 缓存获取浏览器相关信息
 */
let _Information = function () {
    if (!_Information) {
        let userAgent = navigator.userAgent.toLowerCase();
        _Information = {
            safari: /version.+safari/.test(userAgent),
            chrome: /chrome/.test(userAgent),
            firefox: /firefox/.test(userAgent),
            ie: /(msie\s|trident.*rv:)([\w.]+)/.test(userAgent),
            opera: /opera/.test(userAgent),
            gecko: /gecko/i.test(userAgent) && !/like gecko/i.test(userAgent),
            webkit: /webkit/i.test(userAgent),
            strict: document.compatMode == "CSS1Compat"
        };

        if (_Information.ie) {
            let v1 = userAgent.match(/(?:msie\s([\w.]+))/);
            let v2 = userAgent.match(/(?:trident.*rv:([\w.]+))/);
            if (v1 && v2 && v1[1] && v2[1]) {
                _Information.version = Math.max(<any>v1[1] * 1, <any>v2[1] * 1);
            } else if (v1 && v1[1]) {
                _Information.version = <any>v1[1] * 1;
            } else if (v2 && v2[1]) {
                _Information.version = <any>v2[1] * 1;
            } else {
                _Information.version = 0;
            }
        } else {
            _Information.version = (userAgent.match(/(?:firefox|opera|safari|chrome)[\/: ]([\d.]+)/))[1]
        }
    }
    return _Information;
}();


/**
 * 浏览器信息工具类
 */
export default class Browser {

    static isIE: boolean = _Information.ie;

    /**
     * 判断当前浏览器是否是ie6浏览器
     * @method isIE6
     */
    static isIE6: boolean = _Information.ie && _Information.version == '6.0';

    /**
     * 判断当前浏览器是否是ie7浏览器
     * @method isIE7
     */
    static isIE7: boolean = _Information.ie && _Information.version == '7.0';

    /**
     * 判断当前浏览器是否是是小于等于ie7浏览器,包括IE8的判定
     * @method ieLessThanIE7
     */
    static ieLessThanIE7: boolean = Browser.isIE6 || Browser.isIE7;

    /**
     * 判断当前浏览器是否是ie8浏览器
     * @method isIE8
     */
    static isIE8: boolean = _Information.ie && _Information.version == '8.0';

    /**
     * 判断当前浏览器是否是是小于等于ie8浏览器,包括IE8的判定
     * @method ieLessThanIE8
     */
    static ieLessThanIE78: boolean = Browser.isIE6 || Browser.isIE7 || Browser.isIE8;

    /**
     * 判断是否是opera浏览器
     * @method isOpera
     */
    static isOpera: boolean = _Information.opera;


    /**
     * 判断是否是safari浏览器
     * @method isSafari
     */
    static isSafari: boolean = _Information.safari;

    /**
     * 判断是否是firefox浏览器
     * @method isFirefox
     */
    static isFirefox: boolean = _Information.isFirefox;

    /**
     * 判断是否是Chrome浏览器
     * @method isChrome
     */
    static isChrome: boolean = _Information.chrome;

    /**
     * 判断是否是gecko内核
     * @method isGecko
     */
    static isGecko: boolean = _Information.gecko;

    /**
     * 判断是否是webkit内核
     * @method isWebkit
     */
    static isWebkit: boolean = _Information.webkit;

    /**
     * 判断是否是strict模式
     * @method isStrict
     */
    static isStrict: boolean = _Information.strict;

    /**
     * 获取浏览器版本号
     * @method version
     */
    static version: boolean = _Information.version;

}