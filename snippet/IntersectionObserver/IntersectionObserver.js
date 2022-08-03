var setObserver = function (target, option, observerOption) {
    var opt = {
        isOnce: false,
        intersecting: function (entry) { },
        unintersecting: function (entry) { }
    };
    opt.isOnce = (option === null || option === void 0 ? void 0 : option.isOnce) ? true : false;
    opt.intersecting = (typeof (option === null || option === void 0 ? void 0 : option.intersecting) == "function") ? option.intersecting : opt.intersecting;
    opt.unintersecting = (typeof (option === null || option === void 0 ? void 0 : option.unintersecting) == "function") ? option.unintersecting : opt.unintersecting;
    console.log(opt.intersecting);
    if (typeof IntersectionObserver != "undefined") {
        var io_1 = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    opt.intersecting(entry.target);
                }
                else {
                    opt.unintersecting(entry.target);
                }
                ;
                if (opt.isOnce) {
                    io_1.unobserve(entry.target);
                }
                ;
            });
        }, observerOption);
        if (typeof target == "string") {
            document.querySelectorAll(target).forEach(function (element) {
                io_1.observe(element);
            });
        }
        else if (target instanceof Element) {
            io_1.observe(target);
        }
        else if (target instanceof NodeList || target instanceof HTMLCollection) {
            Array.prototype.slice.call(target).forEach(function (element) {
                io_1.observe(element);
            });
        }
        return {
            observer: io_1,
            observe: function (target) {
                if (typeof target == "string") {
                    document.querySelectorAll(target).forEach(function (element) {
                        io_1.observe(element);
                    });
                }
                else if (target instanceof Element) {
                    io_1.observe(target);
                }
                else if (target instanceof NodeList || target instanceof HTMLCollection) {
                    Array.prototype.slice.call(target).forEach(function (element) {
                        io_1.observe(element);
                    });
                }
            },
            unobserve: function (target) {
                if (typeof target == "string") {
                    document.querySelectorAll(target).forEach(function (element) {
                        io_1.unobserve(element);
                    });
                }
                else if (target instanceof Element) {
                    io_1.unobserve(target);
                }
                else if (target instanceof NodeList || target instanceof HTMLCollection) {
                    Array.prototype.slice.call(target).forEach(function (element) {
                        io_1.unobserve(element);
                    });
                }
            }
        };
    }
    else {
        return {
            observer: null,
            observe: function (target) {
                if (typeof target == "string") {
                    document.querySelectorAll(target).forEach(function (element) {
                        opt.intersecting(element);
                    });
                }
                else if (target instanceof Element) {
                    opt.intersecting(target);
                }
                else if (target instanceof NodeList || target instanceof HTMLCollection) {
                    Array.prototype.slice.call(target).forEach(function (element) {
                        opt.intersecting(element);
                    });
                }
            },
            unobserve: function (target) {
                if (typeof target == "string") {
                    document.querySelectorAll(target).forEach(function (element) {
                        opt.unintersecting(element);
                    });
                }
                else if (target instanceof Element) {
                    opt.unintersecting(target);
                }
                else if (target instanceof NodeList || target instanceof HTMLCollection) {
                    Array.prototype.slice.call(target).forEach(function (element) {
                        opt.unintersecting(element);
                    });
                }
            }
        };
    }
};
