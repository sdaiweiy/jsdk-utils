/**
 * 判断平台类型和特性的属性
 * @class Platform
 */
export default class Platform {

    /**
     * 判断是否为android平台
     * @property isAndroid
     * @type{Boolean}
     */
    static isAndroid: boolean = /android/i.test(navigator.userAgent);

    /**
     * 判断是否为Ipad平台
     * @property isIpad
     * @type{Boolean}
     */
    static isIpad: boolean = /ipad/i.test(navigator.userAgent);

    /**
     * 判断是否为iphone平台
     * @property isIphone
     * @type{Boolean}
     */
    static isIphone: boolean = /iphone/i.test(navigator.userAgent);

    /**
     * 判断是否为macintosh平台
     * @property isMacintosh
     * @type{Boolean}
     */
    static isMacintosh: boolean = /macintosh/i.test(navigator.userAgent);

    /**
     * 判断是否为windows平台
     * @property isWindows
     * @type{Boolean}
     */
    static isWindows: boolean = /windows/i.test(navigator.userAgent);

}