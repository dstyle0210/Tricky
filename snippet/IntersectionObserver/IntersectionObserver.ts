type ObserverTarget = string|Element|NodeListOf<Element>|HTMLCollection
type ObserverCallBack = (target:ObserverTarget) => void
interface Observer {
    observer:IntersectionObserver|null,
    observe:ObserverCallBack,
    unobserve:ObserverCallBack
}
interface ObserverOption {
    isOnce:boolean,
    intersecting:ObserverCallBack,
    unintersecting:ObserverCallBack
}
const setObserver = (target:ObserverTarget,option:ObserverOption,observerOption:IntersectionObserverInit) : Observer => {
    const opt = { 
        isOnce: false,
        intersecting:(element?:Element) => {},
        unintersecting:(element?:Element) => {}
    };
    opt.isOnce = (option?.isOnce) ? true : false;
    opt.intersecting = (typeof option?.intersecting == "function") ? option.intersecting : opt.intersecting;
    opt.unintersecting = (typeof option?.unintersecting == "function") ? option.unintersecting : opt.unintersecting;


    // target의 인스턴스에 맞추어 실행
    function targetCallback(target:ObserverTarget,cb:Function):void{
        if(typeof target == "string"){
            document.querySelectorAll(target).forEach((element)=>{
                cb(element);
            });
        }else if(target instanceof Element){
            cb(target);
        }else if(target instanceof NodeList || target instanceof HTMLCollection){
            Array.prototype.slice.call(target).forEach((element)=>{
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
        targetCallback(target,(element:Element)=>{io.observe(element)}); // 초기등록(observe)

        return {
            observer:io,
            observe:(target) => {
                targetCallback(target,(element:Element)=>{io.observe(element)}); // 등록 (observe)
            },
            unobserve:(target) => {
                targetCallback(target,(element:Element)=>{io.unobserve(element)}); // 해제 (unobserve)
            }
        }
    }else{
        return {
            observer:null,
            observe:(target) => {
                targetCallback(target,(element:Element)=>{opt.intersecting(element)}); // 옵져버가 없다면 즉시 실행 후 끝
            },
            unobserve:(target) => {
                // targetCallback(target,(element:Element)=>{opt.unintersecting(element)}); 무의미(1회 실행 후 끝남) : IE11 해당
            }
        }
    }
}