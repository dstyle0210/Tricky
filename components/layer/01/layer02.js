var DimmedLayer = function (initOption) {
    var me = this;
    var defaultOption = {
        width: 0,
        height: 0,
        wrapperClassName: "dimLayer",
        zIndex: 100,
        background: "rgba(0,0,0,0.5)"
    };
    if (typeof initOption == "object") {
        for (var key in defaultOption) {
            defaultOption[key] = initOption[key] ? initOption[key] : defaultOption[key];
        }
    }
    ;
    var create = function (element, openOption) {
        var body = document.getElementsByTagName("body")[0];
        var layerWrapper = document.createElement("div");
        layerWrapper.className = "layerCase";
        addStack(element, layerWrapper);
        layerWrapper.appendChild(element);
        body.appendChild(layerWrapper);
    };
    me.stack = [];
    var addStack = function (element, wrapperElement) {
        me.stack.unshift({
            element: element,
            parent: element.parentNode,
            wrapper: wrapperElement
        });
    };
    me.open = function (selector, openOption) {
        if (typeof selector == "string") {
            var targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element) {
                create(element, openOption);
            });
        }
        else {
        }
    };
    me.close = function (selector) {
        var removeStack = function () {
        };
        if (typeof selector == "string") {
            var targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element) {
                for (var _i = 0, _a = me.stack; _i < _a.length; _i++) {
                    var stack = _a[_i];
                    if (stack.element == element) {
                        stack.parent.append(stack.element);
                        stack.wrapper.remove();
                    }
                    ;
                }
                ;
            });
        }
        else if (selector instanceof Element) {
            for (var _i = 0, _a = me.stack; _i < _a.length; _i++) {
                var stack = _a[_i];
                if (stack.element == selector) {
                    stack.parent.append(stack.element);
                    stack.wrapper.remove();
                }
                ;
            }
            ;
        }
        else {
            me.stack[0].parent.append(me.stack[0].element);
            me.stack[0].wrapper.remove();
            me.stack.shift();
        }
    };
    return me;
};
