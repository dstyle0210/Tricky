function getClientInfo() {
    var getDevice = function (ua) {
        if (!/iPhone|iPad|iPod|Android/i.test(ua))
            return "pc";
        if (/iPhone|iPod/i.test(ua))
            return "mobile";
        if (/iPad/i.test(ua))
            return "tablet";
        if (/Android/.test(ua))
            return (!/Mobile/i.test(ua)) ? "tablet" : "mobile";
    };
    var getRatio = function () {
        return (4 < window.devicePixelRatio) ? 4 : Math.floor(window.devicePixelRatio);
    };
    var getBrand = function (ua) {
        if (/samsung|shv-|sm-/i.test(ua))
            return "samsung";
        if (/(lg-)|(lgms)/i.test(ua))
            return "lg";
        if (/iphone|ipad|ipod/i.test(ua))
            return "apple";
        return "other";
    };
    var getBrowser = function (ua) {
        var _browserName = "other";
        var _browserNames = ["Whale", "MSIE", "Trident", "Edge", "Chrome", "Safari", "Firefox", "Opera"];
        for (var _i = 0, _browserNames_1 = _browserNames; _i < _browserNames_1.length; _i++) {
            var name_1 = _browserNames_1[_i];
            if (new RegExp(name_1).test(ua)) {
                _browserName = name_1;
                break;
            }
        }
        var _browserVersion = ua.match(new RegExp(_browserName + "\\/([\\d\\.]+)"));
        return {
            name: ((_browserName) ? _browserName.toLowerCase() : null),
            version: (_browserVersion) ? _browserVersion[1] : null
        };
    };
    var getOS = function (ua) {
        var osFilter = [
            { reg: /Android/, name: "android" },
            { reg: /iPhone|iPad|iPod/i, name: "ios" },
            { reg: /MacOSX/, name: "mac" },
            { reg: /X11/, name: "unix" },
            { reg: /Linux/, name: "linux" },
            { reg: /Windows NT 6.4|Windows NT 10.0/i, name: "win10" },
            { reg: /Windows NT 6.3|Windows NT 6.2/i, name: "win8" },
            { reg: /win/i, name: "win" }
        ];
        var result = "other";
        for (var _i = 0, osFilter_1 = osFilter; _i < osFilter_1.length; _i++) {
            var osInfo = osFilter_1[_i];
            if (osInfo.reg.test(ua)) {
                result = osInfo.name;
                break;
            }
            ;
        }
        return result;
    };
    var UA = navigator.userAgent;
    return {
        device: getDevice(UA),
        ratio: getRatio(),
        brand: getBrand(UA),
        browser: getBrowser(UA),
        os: getOS(UA),
        isXp: (UA.indexOf("Windows NT 5.1") > 0),
        isMobile: (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(UA.toLowerCase()))
    };
}
