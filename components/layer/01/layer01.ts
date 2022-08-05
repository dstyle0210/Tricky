function layer01(selector:string){
    const body = document.getElementsByTagName("body")[0];
    const layerWrapper = document.createElement("div");
    const target = document.querySelectorAll(selector);
    Array.prototype.slice.call(target).forEach(function (element) {
        layerWrapper.appendChild(element);
    });

    layerWrapper.className = "layerCase";
    body.appendChild(layerWrapper);
}