import IUrl from "../src/IUrl";
import {expect} from "chai";
import "mocha";


describe("objectToParam function", () => {
    it("basic", () => {
        let obj = {
            "name": 'tom',
            "class": {
                "className": 'class1'
            },
            "classMates": [{
                "name": 'lily'
            }]
        };

        expect(IUrl.objectToParam(obj)).to.eql("name=tom&class.className=class1&classMates[0].name=lily");
    });
});