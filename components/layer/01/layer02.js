var DimmedLayer = function (initWrapperStyle) {
    var me = this;
    var mergeObject = function (origin, extend) {
        var result = {};
        if (typeof extend == "object") {
            for (var key in origin) {
                result[key] = extend[key] ? extend[key] : origin[key];
            }
        }
        ;
        return result;
    };
    var styleEl = document.createElement("style");
    var wrapperDefaultStyle = { "position": "fixed", "left": 0, "top": 0, "right": 0, "bottom": 0, "display": "flex", "background": "rgba(0,0,0,0.5)", "z-index": 100, "flex-direction": "column", "justify-content": "center" };
    var wrapperClassName = (initWrapperStyle.class) ? initWrapperStyle.class : "dimmed";
    var wrapperStyle = mergeObject(wrapperDefaultStyle, initWrapperStyle);
    var styleCode = "";
    for (var key in wrapperStyle) {
        styleCode += key + ":" + wrapperStyle[key] + ";";
    }
    styleEl.textContent = ".".concat(wrapperClassName, "{").concat(styleCode, "}");
    document.head.appendChild(styleEl);
    me.stack = [];
    var addStack = function (element, wrapperElement) {
        me.stack.unshift({
            element: element,
            parent: element.parentNode,
            wrapper: wrapperElement
        });
    };
    var removeStack = function (element) {
        if (element) {
            var idx = me.stack.findIndex(function (stack) {
                return stack.element == element;
            });
            me.stack.splice(idx);
        }
        else {
            me.stack.shift();
        }
        ;
    };
    var body = document.getElementsByTagName("body")[0];
    var create = function (element, openOption) {
        var wrapper = document.createElement("div");
        wrapper.className = wrapperClassName;
        if (openOption) {
            var styleCode_1 = "";
            for (var key in openOption) {
                styleCode_1 += key + ":" + openOption[key] + ";";
            }
            wrapper.setAttribute("style", styleCode_1);
        }
        addStack(element, wrapper);
        wrapper.appendChild(element);
        body.appendChild(wrapper);
    };
    var remove = function (element) {
        var _loop_1 = function (stack) {
            if (stack.element == element) {
                stack.parent.append(stack.element);
                stack.wrapper.remove();
                setTimeout(function () { removeStack(stack.element); });
            }
            ;
        };
        for (var _i = 0, _a = me.stack; _i < _a.length; _i++) {
            var stack = _a[_i];
            _loop_1(stack);
        }
        ;
    };
    me.open = function (target, openOption) {
        if (typeof target == "string") {
            var targets = document.querySelectorAll(target);
            Array.prototype.slice.call(targets).forEach(function (element) {
                create(element, openOption);
            });
        }
        else if (target instanceof Element) {
            create(target, openOption);
        }
        ;
    };
    me.close = function (target) {
        if (typeof target == "string") {
            var targets = document.querySelectorAll(target);
            Array.prototype.slice.call(targets).forEach(function (element) {
                remove(element);
            });
        }
        else if (target instanceof Element) {
            remove(target);
        }
        else {
            remove(me.stack[0].element);
        }
        ;
    };
    me.closeAll = function () {
        me.stack.forEach(function (stack) {
            remove(stack.element);
        });
    };
    return me;
};
