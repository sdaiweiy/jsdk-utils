/**
 * jsdk-utils v.0.0.2 - javascript sdk utils
 * Copyright (c) 2018 [object Object]
 * MIT
 * https://github.com/sdaiweiy/jsdk-utils
 */
this.Jsdk = this.Jsdk || {};

(function (exports,jsdkLang) {
    'use strict';

    var _Information = function () {
        if (!_Information) {
            var userAgent = navigator.userAgent.toLowerCase();
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
                var v1 = userAgent.match(/(?:msie\s([\w.]+))/);
                var v2 = userAgent.match(/(?:trident.*rv:([\w.]+))/);
                if (v1 && v2 && v1[1] && v2[1]) {
                    _Information.version = Math.max(v1[1] * 1, v2[1] * 1);
                }
                else if (v1 && v1[1]) {
                    _Information.version = v1[1] * 1;
                }
                else if (v2 && v2[1]) {
                    _Information.version = v2[1] * 1;
                }
                else {
                    _Information.version = 0;
                }
            }
            else {
                _Information.version = (userAgent.match(/(?:firefox|opera|safari|chrome)[\/: ]([\d.]+)/))[1];
            }
        }
        return _Information;
    }();
    var IBrowser = (function () {
        function IBrowser() {
        }
        IBrowser.isIE = _Information.ie;
        IBrowser.isIE6 = _Information.ie && _Information.version == '6.0';
        IBrowser.isIE7 = _Information.ie && _Information.version == '7.0';
        IBrowser.ieLessThanIE7 = IBrowser.isIE6 || IBrowser.isIE7;
        IBrowser.isIE8 = _Information.ie && _Information.version == '8.0';
        IBrowser.ieLessThanIE78 = IBrowser.isIE6 || IBrowser.isIE7 || IBrowser.isIE8;
        IBrowser.isOpera = _Information.opera;
        IBrowser.isSafari = _Information.safari;
        IBrowser.isFirefox = _Information.isFirefox;
        IBrowser.isChrome = _Information.chrome;
        IBrowser.isGecko = _Information.gecko;
        IBrowser.isWebkit = _Information.webkit;
        IBrowser.isStrict = _Information.strict;
        IBrowser.version = _Information.version;
        return IBrowser;
    }());

    var IColor = (function () {
        function IColor() {
        }
        IColor.toHex = function (color) {
            if (/^(rgb|RGB)/.test(color)) {
                var aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
                var strHex = "#";
                for (var i = 0; i < aColor.length; i++) {
                    var hex = Number(aColor[i]).toString(16);
                    if (hex === "0") {
                        hex += hex;
                    }
                    strHex += hex;
                }
                if (strHex.length !== 7) {
                    strHex = color;
                }
                return strHex;
            }
            else if (this.COLOR_REG.test(color)) {
                var aNum = color.replace(/#/, "").split("");
                if (aNum.length === 6) {
                    return color;
                }
                else if (aNum.length === 3) {
                    var numHex = "#";
                    for (var i = 0; i < aNum.length; i += 1) {
                        numHex += (aNum[i] + aNum[i]);
                    }
                    return numHex;
                }
            }
            else {
                return color;
            }
        };
        IColor.toRgb = function (color) {
            var sColor = color.toLowerCase();
            if (sColor && this.COLOR_REG.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "RGB(" + sColorChange.join(",") + ")";
            }
            else {
                return sColor;
            }
        };
        IColor.COLOR_REG = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        return IColor;
    }());

    var ICookie = (function () {
        function ICookie() {
        }
        ICookie.get = function (key) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        };
        ICookie.hasKey = function (key) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        };
        ICookie.keys = function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var i = 0, len = aKeys.length; i < len; i++) {
                aKeys[i] = decodeURIComponent(aKeys[i]);
            }
            return aKeys;
        };
        ICookie.remove = function (key) {
            if (!key || !this.hasKey(key)) {
                return false;
            }
            this.set(key, '', { expires: -1000 * 60 * 60 * 24 });
            return true;
        };
        ICookie.set = function (key, value, options) {
            if (options === void 0) { options = {}; }
            if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                return false;
            }
            var expires = options.expires, now = new Date();
            now.setTime(now.getTime() + options.expires);
            document.cookie =
                key + "=" + value
                    + (options.path ? "; path=" + options.path : "")
                    + (expires ? "; expires=" + now.toGMTString() : "")
                    + (options.domain ? "; domain=" + options.domain : "")
                    + (options.secure ? "; secure" : '');
            return true;
        };
        return ICookie;
    }());

    var IIdGen = (function () {
        function IIdGen() {
        }
        IIdGen.uuid = function () {
            var uuid = new Array(36), rnd = 0, r;
            for (var i = 0; i < 36; i++) {
                if (i == 8 || i == 13 || i == 18 || i == 23) {
                    uuid[i] = '-';
                }
                else if (i == 14) {
                    uuid[i] = '4';
                }
                else {
                    if (rnd <= 0x02)
                        rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = this.CHARS[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        };
        IIdGen.id = function () {
            return this._id++ + '';
        };
        IIdGen._id = 1;
        IIdGen.CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        return IIdGen;
    }());

    var IPlatform = (function () {
        function IPlatform() {
        }
        IPlatform.isAndroid = /android/i.test(navigator.userAgent);
        IPlatform.isIpad = /ipad/i.test(navigator.userAgent);
        IPlatform.isIphone = /iphone/i.test(navigator.userAgent);
        IPlatform.isMacintosh = /macintosh/i.test(navigator.userAgent);
        IPlatform.isWindows = /windows/i.test(navigator.userAgent);
        return IPlatform;
    }());

    var IRegExp = (function () {
        function IRegExp() {
        }
        IRegExp.isPercent = function (value) {
            return this.PERCENT.test(value);
        };
        IRegExp.isEmail = function (value) {
            return this.EMAIL.test(value);
        };
        IRegExp.isUrl = function (value) {
            return this.URL.test(value);
        };
        IRegExp.isIP = function (value) {
            return this.IP.test(value);
        };
        IRegExp.isMobile = function (value) {
            return this.MOBILE.test(value);
        };
        IRegExp.isPhone = function (value) {
            return this.PHONE.test(value);
        };
        IRegExp.isRgbColor = function (value) {
            return this.RgbColor.test(value);
        };
        IRegExp.isHexColor = function (value) {
            return this.HexColor.test(value);
        };
        IRegExp.PERCENT = /\d+\.?\%/;
        IRegExp.EMAIL = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        IRegExp.URL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        IRegExp.IP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        IRegExp.MOBILE = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
        IRegExp.PHONE = /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/;
        IRegExp.RgbColor = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
        IRegExp.HexColor = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        return IRegExp;
    }());

    var IUrl = (function () {
        function IUrl() {
        }
        IUrl.deSerialize = function (url) {
            if (url === void 0) { url = location.href; }
            var reg_url = /^[^\?]+\?([\w\W]+)$/, reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, arr_url = reg_url.exec(url), ret = {};
            if (arr_url && arr_url[1]) {
                var str_para = arr_url[1], result = void 0;
                while ((result = reg_para.exec(str_para)) != null) {
                    ret[result[1]] = result[2];
                }
            }
            return ret;
        };
        IUrl.getFile = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return (this.link.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1];
        };
        IUrl.getHash = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return this.link.hash.replace('#', '');
        };
        IUrl.getHost = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return this.link.hostname;
        };
        IUrl.getQuery = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return this.link.search;
        };
        IUrl.getPath = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return this.link.pathname.replace(/^([^\/])/, '/$1');
        };
        IUrl.getPort = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return this.link.port;
        };
        IUrl.getProtocol = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return this.link.protocol.replace(':', '');
        };
        IUrl.getSegments = function (url) {
            if (url === void 0) { url = location.href; }
            this.link.href = url;
            return this.link.pathname.replace(/^\//, '').split('/');
        };
        IUrl.getUrl = function () {
            return location.href;
        };
        IUrl.getParameter = function (key, url) {
            if (url === void 0) { url = location.href; }
            var reg = new RegExp("(^|&|\\?|#)" + jsdkLang.IStringEscape.escapeReg(key) + "=([^&#]*)(&|\x24|#)", "");
            var match = url.match(reg);
            if (match) {
                return match[2];
            }
            return null;
        };
        IUrl.serialize = function (object, encode) {
            if (encode === void 0) { encode = false; }
            return this._serialize(object, encode);
        };
        IUrl._serialize = function (object, encode, key) {
            var paramStr = "";
            if (jsdkLang.IString.isString(object) || jsdkLang.INumber.isNumber(object) || jsdkLang.IBoolean.isBoolean(object)) {
                paramStr += "&" + key + "=" + (encode ? encodeURIComponent(object) : object);
            }
            else {
                jsdkLang.IObject.each(object, function (i, o) {
                    var k = key == null ? i : key + (jsdkLang.IArray.isArray(object) ? "[" + i + "]" : "." + i);
                    paramStr += '&' + IUrl._serialize(o, encode, k);
                });
            }
            return paramStr.substr(1);
        };
        IUrl.link = document.createElement('a');
        return IUrl;
    }());

    exports.IBrowser = IBrowser;
    exports.IColor = IColor;
    exports.ICookie = ICookie;
    exports.IIdGen = IIdGen;
    exports.IPlatform = IPlatform;
    exports.IRegExp = IRegExp;
    exports.IUrl = IUrl;

    return exports;

}(window,window));
//# sourceMappingURL=jsdk.utils.es5.js.map
