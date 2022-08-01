var setObserver = function (selector, option, observerOption) {
    var opt = $.extend({
        isOnce: false,
        intersecting: function () { },
        unintersecting: function () { }
    }, option);
    if (typeof IntersectionObserver != "undefined") {
        var io = new IntersectionObserver(function (entries, observer) {
        });
        return {
            observer: io,
            observe: function (target) {
            },
            unobserve: function (target) {
            }
        };
    }
    else {
        return {
            observer: null,
            observe: function (target) {
            },
            unobserve: function (target) {
            }
        };
    }
};
