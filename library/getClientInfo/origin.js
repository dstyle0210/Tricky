
function __getbrowser() {
    try {
        var UA_1 = navigator.userAgent;
        var getDevice = function getDevice() {
            var device = "mobile";
            if (!/iPhone|iPad|iPod|Android/i.test(UA_1))
                return "pc";
            if (/iPhone|iPod/i.test(UA_1))
                device = "mobile";
            if (/iPad/i.test(UA_1))
                device = "tablet";
            if (/Android/.test(UA_1)) {
                device = !/Mobile/i.test(UA_1) ? "tablet" : "mobile";
            }
            ;return device;
        };
        var getOS = function getOS() {
            var osFilter = [{
                reg: /Android/,
                name: "android"
            }, {
                reg: /iPhone|iPad|iPod/i,
                name: "ios"
            }, {
                reg: /MacOSX/,
                name: "mac"
            }, {
                reg: /X11/,
                name: "unix"
            }, {
                reg: /Linux/,
                name: "linux"
            }, {
                reg: /Windows NT 6.4|Windows NT 10.0/i,
                name: "win10"
            }, {
                reg: /Windows NT 6.3|Windows NT 6.2/i,
                name: "win8"
            }, {
                reg: /win/i,
                name: "win"
            }];
            var result = osFilter.find(function(item) {
                return item.reg.test(UA_1);
            });
            return result == undefined ? navigator.platform.toLowerCase() : result.name;
        };
        var getBrand = function getBrand() {
            if (/samsung|shv-|sm-/i.test(UA_1))
                return "samsung";
            if (/(lg-)|(lgms)/i.test(UA_1))
                return "lg";
            if (/iphone|ipad|ipod/i.test(UA_1))
                return "apple";
            return "other";
        };
        var getBrowserVersionName = function getBrowserVersionName() {
            var getVersion = function getVersion(reg) {
                return UA_1.match(new RegExp(reg + "\\/([\\d\\.]+)"))[1];
            };
            var browserName = ["Whale", "MSIE", "Trident", "Edge", "Chrome", "Safari", "Firefox", "Opera"].find(function(name) {
                return new RegExp(name).test(UA_1);
            });
            if (!browserName)
                return ["unknown", "unknown"];
            return [browserName.toLowerCase(), getVersion(browserName)];
        };
        var version = getBrowserVersionName();
        var browserBase = {
            device: getDevice(),
            server: /publichs/.test(UA_1) ? "app" : "web",
            serverType: /^m|^w|^a/.test(location.hostname) ? "real" : "dev",
            ratio: 4 < window.devicePixelRatio ? 4 : Math.floor(window.devicePixelRatio),
            brand: getBrand(),
            browserName: version[0],
            browserVersion: version[1],
            os: getOS(),
            isXp: navigator.userAgent.indexOf("Windows NT 5.1") > 0,
            mobileBrowser: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(UA_1.toLowerCase())
        };
        document.documentElement.className = browserBase.os + " " + browserBase.device + " " + browserBase.browserName + " v" + browserBase.browserVersion + " " + browserBase.brand + " " + browserBase.server + " ratio" + browserBase.ratio + " -" + browserBase.serverType;
        return browserBase;
    } catch (e) {
        alert(e);
    }
}