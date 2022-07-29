type Browser = {
    name:"Whale"|"MSIE"|"Trident"|"Edge"|"Chrome"|"Safari"|"Firefox"|"Opera"|null,
    version:string|null
};
type ClientInfo = {
    device:string,
    ratio:number,
    brand:("samsung"|"lg"|"apple"|"other"),
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

    const getBrand = (ua:string):string => {
        if (/samsung|shv-|sm-/i.test(ua)) return "samsung";
        if (/(lg-)|(lgms)/i.test(ua)) return "lg";
        if (/iphone|ipad|ipod/i.test(ua)) return "apple";
        return "other";
    }

    const getBrowser = (ua:string):Browser => {
        const _browserName = ["Whale", "MSIE", "Trident", "Edge", "Chrome", "Safari", "Firefox", "Opera"].find((name) => {
            return new RegExp(name).test(ua);
        }) || null;
        const _browserVersion = (_browserName) ? ua.match(new RegExp(_browserName + "\\/([\\d\\.]+)")) : null;

        return {
            name:_browserName,
            version:_browserVersion
        }
    }




    const UA = navigator.userAgent;
    return {
        device:getDevice(UA),
        ratio:getRatio(),
        brand:getBrand(UA),
        browser:string,
        os:string,
        isXp:boolean,
        isMobile:boolean
    }

}
