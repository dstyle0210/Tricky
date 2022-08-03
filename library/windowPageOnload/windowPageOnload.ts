function windowPageOnload(){
    const html = document.getElementsByTagName("html")[0];
    if(html instanceof Element && !(/-pageOnloaded/gi).test(html.className)){
        html.className = html.className + " -pageOnloaded";
    }
}
window.addEventListener("load",windowPageOnload);