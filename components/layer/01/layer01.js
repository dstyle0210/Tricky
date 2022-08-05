function layer01(selector) {
    var body = document.getElementsByTagName("body")[0];
    var layerWrapper = document.createElement("div");
    var target = document.querySelectorAll(selector);
    Array.prototype.slice.call(target).forEach(function (element) {
        layerWrapper.appendChild(element);
    });
    layerWrapper.className = "layerCase";
    body.appendChild(layerWrapper);
}
