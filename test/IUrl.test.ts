import IUrl from "../src/IUrl";
import {expect} from "chai";
import "mocha";

describe("deserialize function", () => {
    it("basic", () => {

    });
});

describe("getFile function", () => {
    it("basic", () => {
        let url = "http://abc.com:8080/dir/index.html?id=255&m=hello#top";
        expect(IUrl.getFile(url)).to.equal("index.html");

        url = "http://abc.com:8080";
        expect(IUrl.getFile(url)).to.equal("");

        url = "http://www.baidu.com";
        expect(IUrl.getFile(url)).to.equal("");
    });
});

describe("getHash function", () => {
    it("basic", () => {

    });
});

describe("getHost function", () => {
    it("basic", () => {
        let url = "http://abc.com:8080/dir/index.html?id=255&m=hello#top";
        expect(IUrl.getHost(url)).to.equal("abc.com");

        url = "http://192.168.0.61:8080/touch/index.html?game=AB01";
        expect(IUrl.getHost(url)).to.equal("192.168.0.61");
    });
});

describe("getQuery function", () => {
    it("basic", () => {

    });
});

describe("getPath function", () => {
    it("basic", () => {

    });
});

describe("getPort function", () => {
    it("basic", () => {
        let url = "http://abc.com:8080/dir/index.html?id=255&m=hello#top";
        expect(IUrl.getPort(url)).to.equal("8080");

        url = "https://abc.com:8080/dir/index.html?id=255&m=hello#top";
        expect(IUrl.getPort(url)).to.equal("8080");

        url = "https://abc.com/dir/index.html?id=255&m=hello#top";
        expect(IUrl.getPort(url)).to.equal("80");
    });
});

describe("getProtocol function", () => {
    it("basic", () => {
        let url = "http://abc.com:8080/dir/index.html?id=255&m=hello#top";
        expect(IUrl.getProtocol(url)).to.equal("http");

        url = "https://abc.com:8080/dir/index.html?id=255&m=hello#top";
        expect(IUrl.getProtocol(url)).to.equal("https");
    });
});

describe("getSegments function", () => {
    it("basic", () => {

    });
});

describe("getUrl function", () => {
    it("basic", () => {

    });
});

describe("getParameter function", () => {
    it("basic", () => {

    });
});

describe("serialize function", () => {
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

        expect(IUrl.serialize(obj)).to.eql("name=tom&class.className=class1&classMates[0].name=lily");
    });
});