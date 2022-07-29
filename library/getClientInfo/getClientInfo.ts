type BrowserName = "whale"|"msie"|"trident"|"edge"|"chrome"|"safari"|"firefox"|"opera"|null;
type BrowserBrand = "samsung"|"lg"|"apple"|"other";
type Browser = {
    name:BrowserName,
    version:string|null
};
type ClientInfo = {
    device:string,
    ratio:number,
    brand:BrowserBrand,
    browser:Browser,
    os:string,
    isXp:boolean,
    isMobile:boolean
}
function getClientInfo():ClientInfo{

    const getDevice = (ua:string):string => {
        return "";
    };

    const getRatio = ():number => {
        return (4 < window.devicePixelRatio) ? 4 : Math.floor(window.devicePixelRatio);
    };

    const getBrand = (ua:string):BrowserBrand => {
        if (/samsung|shv-|sm-/i.test(ua)) return "samsung";
        if (/(lg-)|(lgms)/i.test(ua)) return "lg";
        if (/iphone|ipad|ipod/i.test(ua)) return "apple";
        return "other";
    }

    const getBrowser = (ua:string):Browser => {
        const _browserName = ["Whale", "MSIE", "Trident", "Edge", "Chrome", "Safari", "Firefox", "Opera"].find((name) => {
            return new RegExp(name).test(ua);
        }) || null;

        const _browserVersion = ua.match(new RegExp(_browserName + "\\/([\\d\\.]+)"));

        return {
            name:((_browserName) ? _browserName.toLowerCase() : null) as BrowserName,
            version:(_browserVersion) ? _browserVersion[1] : null
        }
    }


    const UA = navigator.userAgent;
    return {
        device:getDevice(UA),
        ratio:getRatio(),
        brand:getBrand(UA),
        browser:{
            name:"msie",
            version:"string"
        },
        os:"string",
        isXp:true,
        isMobile:true
    }

}
