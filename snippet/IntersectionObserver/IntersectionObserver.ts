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
        intersecting:(entry) => {},
        unintersecting:(entry) => {}
    };
    opt.isOnce = (option?.isOnce) ? true : false;
    opt.intersecting = (typeof option?.intersecting == "function") ? option.intersecting : opt.intersecting;
    opt.unintersecting = (typeof option?.unintersecting == "function") ? option.unintersecting : opt.unintersecting;
    console.log(opt.intersecting);


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
        
        if(typeof target == "string"){
            document.querySelectorAll(target).forEach((element)=>{
                io.observe(element);
            });
        }else if(target instanceof Element){
            io.observe(target);
        }else if(target instanceof NodeList || target instanceof HTMLCollection){
            Array.prototype.slice.call(target).forEach((element)=>{
                io.observe(element);
            });
        }

        return {
            observer:io,
            observe:(target) => {
                if(typeof target == "string"){
                    document.querySelectorAll(target).forEach((element)=>{
                        io.observe(element);
                    });
                }else if(target instanceof Element){
                    io.observe(target);
                }else if(target instanceof NodeList || target instanceof HTMLCollection){
                    Array.prototype.slice.call(target).forEach((element)=>{
                        io.observe(element);
                    });
                }
            },
            unobserve:(target) => {
                if(typeof target == "string"){
                    document.querySelectorAll(target).forEach((element)=>{
                        io.unobserve(element);
                    });
                }else if(target instanceof Element){
                    io.unobserve(target);
                }else if(target instanceof NodeList || target instanceof HTMLCollection){
                    Array.prototype.slice.call(target).forEach((element)=>{
                        io.unobserve(element);
                    });
                }
            }
        }
    }else{
        return {
            observer:null,
            observe:(target) => {
                if(typeof target == "string"){
                    document.querySelectorAll(target).forEach((element)=>{
                        opt.intersecting(element);
                    });
                }else if(target instanceof Element){
                    opt.intersecting(target);
                }else if(target instanceof NodeList || target instanceof HTMLCollection){
                    Array.prototype.slice.call(target).forEach((element)=>{
                        opt.intersecting(element);
                    });
                }
            },
            unobserve:(target) => {
                if(typeof target == "string"){
                    document.querySelectorAll(target).forEach((element)=>{
                        opt.unintersecting(element);
                    });
                }else if(target instanceof Element){
                    opt.unintersecting(target);
                }else if(target instanceof NodeList || target instanceof HTMLCollection){
                    Array.prototype.slice.call(target).forEach((element)=>{
                        opt.unintersecting(element);
                    });
                }
            }
        }
    }
}