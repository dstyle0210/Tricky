function getClientInfo() {
    const getDevice = (ua) => {
        if (!/iPhone|iPad|iPod|Android/i.test(ua))
            return "pc";
        if (/iPhone|iPod/i.test(ua))
            return "mobile";
        if (/iPad/i.test(ua))
            return "tablet";
        if (/Android/.test(ua))
            return (!/Mobile/i.test(ua)) ? "tablet" : "mobile";
    };
    const getRatio = () => {
        return (4 < window.devicePixelRatio) ? 4 : Math.floor(window.devicePixelRatio);
    };
    const getBrand = (ua) => {
        if (/samsung|shv-|sm-/i.test(ua))
            return "samsung";
        if (/(lg-)|(lgms)/i.test(ua))
            return "lg";
        if (/iphone|ipad|ipod/i.test(ua))
            return "apple";
        return "other";
    };
    const getBrowser = (ua) => {
        var _a;
        const _browserName = (_a = ["Whale", "MSIE", "Trident", "Edge", "Chrome", "Safari", "Firefox", "Opera"].find((name) => {
            return new RegExp(name).test(ua);
        })) !== null && _a !== void 0 ? _a : "other";
        const _browserVersion = ua.match(new RegExp(_browserName + "\\/([\\d\\.]+)"));
        return {
            name: ((_browserName) ? _browserName.toLowerCase() : null),
            version: (_browserVersion) ? _browserVersion[1] : null
        };
    };
    const getOS = (ua) => {
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
        const result = osFilter.find((item) => item.reg.test(ua));
        return result == undefined ? navigator.platform.toLowerCase() : result.name;
    };
    const UA = navigator.userAgent;
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