type BrowserName = "whale"|"msie"|"trident"|"edge"|"chrome"|"safari"|"firefox"|"opera"|"other";
type DeviceBrand = "samsung"|"lg"|"apple"|"other";
type DeviceOS = "android"|"ios"|"mac"|"unix"|"linux"|"win10"|"win8"|"win"|"other";
type Browser = {
    name:BrowserName,
    version:string|null
};
type ClientInfo = {
    device:string,
    ratio:number,
    brand:DeviceBrand,
    browser:Browser,
    os:string,
    isXp:boolean,
    isMobile:boolean
}
function getClientInfo():ClientInfo{

    const getDevice = (ua:string):string => {
        if (!/iPhone|iPad|iPod|Android/i.test(ua)) return "pc";
        if (/iPhone|iPod/i.test(ua)) return "mobile";
        if (/iPad/i.test(ua)) return "tablet";
        if (/Android/.test(ua)) return (!/Mobile/i.test(ua)) ? "tablet" : "mobile";
    };

    const getRatio = ():number => {
        return (4 < window.devicePixelRatio) ? 4 : Math.floor(window.devicePixelRatio);
    };

    const getBrand = (ua:string):DeviceBrand => {
        if (/samsung|shv-|sm-/i.test(ua)) return "samsung";
        if (/(lg-)|(lgms)/i.test(ua)) return "lg";
        if (/iphone|ipad|ipod/i.test(ua)) return "apple";
        return "other";
    }

    const getBrowser = (ua:string):Browser => {

        /* ES5 미호환
        const _browserName = ["Whale", "MSIE", "Trident", "Edge", "Chrome", "Safari", "Firefox", "Opera"].find((name) => {
            return new RegExp(name).test(ua);
        }) ?? "other";
        */

        let _browserName = "other";
        const _browserNames = ["Whale", "MSIE", "Trident", "Edge", "Chrome", "Safari", "Firefox", "Opera"];
        for(let name of _browserNames){
            if( new RegExp(name).test(ua) ){
                _browserName = name;
                break;
            }
        }

        const _browserVersion = ua.match(new RegExp(_browserName + "\\/([\\d\\.]+)"));

        return {
            name:((_browserName) ? _browserName.toLowerCase() : null) as BrowserName,
            version:(_browserVersion) ? _browserVersion[1] : null
        }
    }


    const getOS = (ua:string):DeviceOS => {
        var osFilter = [
            {reg: /Android/,name: "android"},
            {reg: /iPhone|iPad|iPod/i,name: "ios"},
            {reg: /MacOSX/,name: "mac"},
            {reg: /X11/,name: "unix"},
            {reg: /Linux/,name: "linux"},
            {reg: /Windows NT 6.4|Windows NT 10.0/i,name: "win10"},
            {reg: /Windows NT 6.3|Windows NT 6.2/i,name: "win8"},
            {reg: /win/i,name: "win"}
        ];

        /* ES5 미호환 
        const result = osFilter.find((item) => item.reg.test(ua)); 
        return result == undefined ? "other" : result.name;
        */

        let result = "other";
        for (let osInfo of osFilter){
            if( osInfo.reg.test(ua) ){
                result = osInfo.name;
                break;
            };
        }
        return result as DeviceOS;
    }


    const UA = navigator.userAgent;
    return {
        device:getDevice(UA),
        ratio:getRatio(),
        brand:getBrand(UA),
        browser:getBrowser(UA),
        os:getOS(UA),
        isXp:(UA.indexOf("Windows NT 5.1") > 0),
        isMobile:(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(UA.toLowerCase()))
    }

}
