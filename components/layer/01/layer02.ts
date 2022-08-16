/*
// interface
const layer = new Dims({
    width:500, // 기본값은 0
    height:500, // 기본값은 0
    wrapper:"dimsLayer", // 기본 클래스 명
    zIndex:100,
    background:rgba(0,0,0,0.5);
});

// method
layer.open(selector , ?option = {
    width:0,
    height:0,
    zIndex:100
});
layer.close(?selector);
layer.show(?selector);
layer.hide(?selector);
layer.pack(?selector);


// properties
layer.target; // 레이어 중 close 나 hide 가 발생 될 레이어
layer.content; // 레이어 내 있는 엘리먼트
layer.stack; // 등록 된 레이어 목록
layer.isOpen; // 현재 레이어가 있는지 여부(open , close의 영향을 받음)
layer.isVisible; // 현재 레이어가 보이고 있는지 여부 (show , hide 의 영향을 받음)
layer.width // 현재 레이어의 가로값
layer.height // 현재 레이어의 세로값
layer.zIndex // 현재 레이어의 z-index값
*/

interface WrapperStyle {
    "position"?:string,
    "left"?:number,
    "top"?:number,
    "right"?:number,
    "bottom"?:number,
    "display"?:string,
    "background"?:string,
    "z-index"?:number,
    "flex-direction"?:string,
    "justify-content"?:string,
    "class"?:string
}
interface Stack{
    element:Element,
    parent:Element,
    wrapper:HTMLDivElement
}
type openSelector = string|Element;
type closeSelector = string|Element|null;
const DimmedLayer = function(initWrapperStyle?:WrapperStyle):{target:string,open:Function}{
    const me = this;
    const mergeObject = (origin:Object,extend:Object):Object => {
        let result = {};
        if(typeof extend == "object"){
            for(let key in origin){
                result[key] = extend[key] ? extend[key] : origin[key];
            }
        };
        return result;
    };


    // Wrapper 클래스 추가
    const styleEl : HTMLStyleElement = document.createElement("style"); // 필요 CSS 코드 생성, 삽입
    const wrapperDefaultStyle:WrapperStyle = { "position":"fixed", "left":0, "top":0, "right":0, "bottom":0, "display":"flex", "background":"rgba(0,0,0,0.5)", "z-index":100, "flex-direction":"column", "justify-content":"center" };
    const wrapperClassName = (initWrapperStyle.class) ? initWrapperStyle.class : "dimmed";
    const wrapperStyle = mergeObject(wrapperDefaultStyle,initWrapperStyle);
    let styleCode = "";
    for(let key in wrapperStyle){
        styleCode += key+":"+wrapperStyle[key]+";";
    }
    styleEl.textContent = `.${wrapperClassName}{${styleCode}}`;
    document.head.appendChild(styleEl);

    const layerWrapper = document.createElement("div");
    layerWrapper.className = wrapperClassName;


    // 스택 관련 메소드 생성
    me.stack = [];
    const addStack = (element:Element,wrapperElement:Node) => {
        me.stack.unshift({
            element:element,
            parent:element.parentNode,
            wrapper:wrapperElement
        });
        console.log(me.stack);
    };
    const removeStack = (element?:Element) => {
        if(element){
            const idx = me.stack.findIndex((stack)=>{
                return stack.element == element;
            });
            me.stack.splice(idx);
        }else{
            me.stack.shift();
        };
        console.log(me.stack);
    };


    /**
     * 새로운 wrapper을 생성하고, 스타일 시트를 입히고, body에 넣는다.
     * @param element 
     * @param openOption 
     */
    const create = (element:Element,openOption:WrapperStyle) => {
        // body에 넣기
        const wrapper = layerWrapper.cloneNode(true);
        // TODO: openOption 있으면 스타일시트 입히기

        // 스택에 넣기.
        addStack(element,wrapper);

        // 
        wrapper.appendChild(element);
        body.appendChild(wrapper);
    };
    const remove = (element?:Element) => {
        if(element){
            for(let stack of me.stack){
                if( stack.element == element ){
                    stack.parent.append(stack.element);
                    stack.wrapper.remove();
                    setTimeout(()=>{removeStack(stack.element);});
                };
            };
        }else{
            me.stack[0].parent.append(me.stack[0].element);
            me.stack[0].wrapper.remove();
            setTimeout(removeStack);
        };
    };


    

    // 딤드레이어 열기
    // 신규 레이어 전용 케이스를 생성 및 엘리먼트 삽입
    const body = document.getElementsByTagName("body")[0];
    /**
     * 지정된 셀렉터(엘리먼트)를 wrapper로 감싸 딤드시킨다.
     * @param selector 
     * @param openOption 
     */
    me.open = (selector:openSelector,openOption:WrapperStyle) => {
        if(typeof selector == "string"){
            const targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element:Element) {
                create(element,openOption);
            });
        };
    }
    // 딤드레이어 닫기
    me.close = (selector?:closeSelector) => {
        if(typeof selector == "string"){
            const targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element) {
                remove(element);
            });
        }else if(selector instanceof Element){
            for(let stack of me.stack){
                remove(selector);
            };
        }else{
            remove();
        }
    }

    me.closeAll = () => {
        me.stack.forEach((stack:Stack)=>{
            remove(stack.element);
        });
    }

    return me;
}