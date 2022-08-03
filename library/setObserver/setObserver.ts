type ObserverTarget = string|Element|NodeListOf<Element>|HTMLCollection
type ObserverMethod = (target:ObserverTarget) => void
type ObserverCallBack = (element:Element) => void
interface Observer {
    observer:IntersectionObserver|null,
    observe:ObserverMethod,
    unobserve:ObserverMethod
}
interface ObserverOption {
    isOnce:boolean,
    intersecting:ObserverCallBack,
    unintersecting:ObserverCallBack
}
const setObserver = (target:ObserverTarget,option:ObserverOption,observerOption:IntersectionObserverInit) : Observer => {
    const opt = { 
        isOnce: false,
        intersecting:(element:Element) => {},
        unintersecting:(element:Element) => {}
    };
    opt.isOnce = (option?.isOnce) ? true : false;
    opt.intersecting = (typeof option?.intersecting == "function") ? option.intersecting : opt.intersecting;
    opt.unintersecting = (typeof option?.unintersecting == "function") ? option.unintersecting : opt.unintersecting;

    function targetCallback(target:ObserverTarget, cb:ObserverCallBack) {
        if (typeof target == "string") {
            document.querySelectorAll(target).forEach(function (element) {
                cb(element);
            });
        }
        else if (target instanceof Element) {
            cb(target);
        }
        else if (target instanceof NodeList || target instanceof HTMLCollection) {
            Array.prototype.slice.call(target).forEach(function (element) {
                cb(element);
            });
        }
    }


    if (typeof IntersectionObserver != "undefined") {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    opt.intersecting(entry.target);
                }else{
                    opt.unintersecting(entry.target);
                };
                if(opt.isOnce){
                    io.unobserve(entry.target);
                };
            });
        },observerOption);

        targetCallback(target,(element) => { io.observe(element); });

        return {
            observer: io,
            observe: function (target) {
                targetCallback(target,(element) => { io.observe(element); });
            },
            unobserve: function (target) {
                targetCallback(target,(element) => { io.unobserve(element); });
            }
        };

    }else{ 
        return {
            observer:null,
            observe: function (target) {
                targetCallback(target,(element) => { opt.intersecting(element); });
            },
            unobserve: function () {
            }
        }
    }
}