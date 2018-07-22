export default class IIdGen {

    //全局唯一的ID
    private static _id: number = 1;

    private static readonly CHARS: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    /**
     * 生成UUID
     * @method uuid
     * @static
     * @return {String} 返回生成的结果
     */
    public static uuid(): string {
        let uuid = new Array(36), rnd = 0, r;
        for (let i = 0; i < 36; i++) {
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

    /**
     * 全局生成唯一id,相当于sequence,保证在同一个页面中的值不会出现重复
     * @method id
     * @static
     * @return {Number}
     */
    public static id(): string {
        return this._id++ + '';
    }
}