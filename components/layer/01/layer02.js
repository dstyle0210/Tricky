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
    var layerWrapper = document.createElement("div");
    layerWrapper.className = wrapperClassName;
    me.stack = [];
    var addStack = function (element, wrapperElement) {
        me.stack.unshift({
            element: element,
            parent: element.parentNode,
            wrapper: wrapperElement
        });
        console.log(me.stack);
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
        console.log(me.stack);
    };
    var create = function (element, openOption) {
        var wrapper = layerWrapper.cloneNode(true);
        addStack(element, wrapper);
        wrapper.appendChild(element);
        body.appendChild(wrapper);
    };
    var remove = function (element) {
        if (element) {
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
        }
        else {
            me.stack[0].parent.append(me.stack[0].element);
            me.stack[0].wrapper.remove();
            setTimeout(removeStack);
        }
        ;
    };
    var body = document.getElementsByTagName("body")[0];
    me.open = function (selector, openOption) {
        if (typeof selector == "string") {
            var targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element) {
                create(element, openOption);
            });
        }
        ;
    };
    me.close = function (selector) {
        if (typeof selector == "string") {
            var targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element) {
                remove(element);
            });
        }
        else if (selector instanceof Element) {
            for (var _i = 0, _a = me.stack; _i < _a.length; _i++) {
                var stack = _a[_i];
                remove(selector);
            }
            ;
        }
        else {
            remove();
        }
    };
    me.closeAll = function () {
        me.stack.forEach(function (stack) {
            remove(stack.element);
        });
    };
    return me;
};
