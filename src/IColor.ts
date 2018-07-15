/*
 * 颜色转换工具类
 */
export default class IColor {

    private static readonly COLOR_REG: RegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

    /**
     * RGB颜色转换为16进制
     * @param color 给定的颜色  RGB(255, 255, 255)
     * @returns {string} #fff
     */
    public static toHex(color: string): string {
        if (/^(rgb|RGB)/.test(color)) {
            let aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            let strHex = "#";
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = color;
            }
            return strHex;
        } else if (this.COLOR_REG.test(color)) {
            let aNum = color.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return color;
            } else if (aNum.length === 3) {
                let numHex = "#";
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return color;
        }
    }

    /**
     * 16进制颜色转为RGB格式
     * @param color #fff
     * @returns {string} RGB(255, 255, 255)
     */
    public static toRgb(color: string): string {
        let sColor = color.toLowerCase();
        if (sColor && this.COLOR_REG.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        } else {
            return sColor;
        }
    }
}