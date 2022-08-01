
type Observer = {
    observer:IntersectionObserver|null,
    observe:Function,
    unobserve:Function
};
const setObserver = (selector:string,option,observerOption) : Observer => {
    const opt = $.extend({
        isOnce: false,
        intersecting:() => {},
        unintersecting:() => {}
    },option);

    if (typeof IntersectionObserver != "undefined") {
        const io = new IntersectionObserver(function(entries, observer) {

        });
        return {
            observer:io,
            observe:(target:Element):void => {

            },
            unobserve:(target:Element):void => {

            }
        }
    }else{
        return {
            observer:null,
            observe:(target:Element):void => {

            },
            unobserve:(target:Element):void => {

            }
        }
    }
}