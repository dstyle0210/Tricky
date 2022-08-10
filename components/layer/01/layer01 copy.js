var DimmedLayer = function (option) {
    var me = this;
    var isOpen = false;
    me.isOpen = isOpen;
    me.open = function (selector, option) {
        console.log("open");
    };
    me.open = function () {
        console.log("open");
    };
};
var dim = new DimmedLayer();
console.log(dim);
dim.open();
var layer = {
    version: "0.1",
    stack: [],
    opt: {
        wraperClassName: "layerCase",
    },
    fn: {
        create: function (element) {
            var body = document.getElementsByTagName("body")[0];
            var layerWrapper = document.createElement("div");
            layerWrapper.className = "layerCase";
            layerWrapper.appendChild(element);
            body.appendChild(layerWrapper);
        },
        remove: function (element) {
            this.childs.unshift(element);
        },
        addStack: function (me, element) {
            me.stack.unshift(element);
            console.log(me.stack);
        }
    },
    open: function (selector, option) {
        var me = this;
        var target = document.querySelectorAll(selector);
        Array.prototype.slice.call(target).forEach(function (element) {
            me.fn.create(element);
            me.fn.addStack(me, element);
        });
    },
    hide: function () {
        console.log(this.childs[0]);
    },
    hideAll: function () {
        console.log("hideAll");
    }
};
Object.freeze(layer);
