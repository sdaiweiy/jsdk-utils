/**
 * 常用的正则表达式
 * @class RegExp
 * @static
 */
export default class RegExp {

    /**
     * 百分比判定正则
     * @property PERCENT
     * @type{RegExp}
     */
    static PERCENT: RegExp = /\d+\.?\%/;

    /**
     * 邮箱判定正则
     * @property EMAIL
     * @type{RegExp}
     */
    static EMAIL: RegExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    /**
     * URL地址判定正则
     * todo 这个可能需要改动
     * @property URL
     * @type{RegExp}
     */
    static URL: RegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    /**
     * IP地址判定正则
     * @property IP
     * @type{RegExp}
     */
    static IP: RegExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    /**
     * 手机号码判定正则<br/>
     * 随着时间推移还要继续加入
     * 已包括13/15/18/145/147/149/166/170/171/173/175/176/177/178/198/199
     * @property MOBILE
     * @type{RegExp}
     */
    static MOBILE: RegExp = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;

    /**
     * 区号+电话号码判定正则
     * @property PHONE
     * @type{RegExp}
     */
    static PHONE: RegExp = /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/;

    /**
     * rgb形式表达的颜色,如rgb(1,1,1)
     * @property RgbColor
     * @type{RegExp}
     */
    static RgbColor: RegExp = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;

    /**
     * hex形式表达的颜色,如#123456 , #ccc
     * @property HexColor
     * @type{RegExp}
     */
    static HexColor: RegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

    /**
     * 判定给定的数值是否是百分比的形式
     * 12.3% true  123 false
     * @method isPercent
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isPercent(value: string): boolean {
        return PERCENT.test(value);
    };

    /**
     * 判定给定的数值是否是邮箱的形式
     * @method isEmail
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isEmail(value: string): boolean {
        return EMAIL.test(value);
    };

    /**
     * 判定给定的数值是否是URL的形式
     * @method isUrl
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isUrl(value: string): boolean {
        return URL.test(value);
    };

    /**
     * 判定给定的数值是否是IP的形式
     * @method isIP
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isIP(value: string): boolean {
        return IP.test(value);
    };

    /**
     * 判定给定的数值是否是手机号码的形式
     * @method isMobile
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isMobile(value: string): boolean {
        return MOBILE.test(value);
    };

    /**
     * 判定给定的数值是否是区号+电话号码判定的形式
     * @method isPhone
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isPhone(value: string): boolean {
        return PHONE.test(value);
    };

    /**
     * 判定是否是rgb形式表达的颜色字符串,如rgb(1,1,1)
     * @method isRgbColor
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isRgbColor(value: string): boolean {
        return RgbColor.test(value);
    };

    /**
     * 判定是否是hex形式表达的颜色,如#123456 , #ccc
     * @method isHexColor
     * @param {String} value 判定字符串
     * @static
     * @return true/false
     */
    static isHexColor(value: string): boolean {
        return HexColor.test(value);
    };
}