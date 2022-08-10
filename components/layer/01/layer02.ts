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

interface layerOpenOption {
    width?:number,
    height?:number,
    wrapperClassName?:string,
    zIndex?:number,
    background?:string
}
type openSelector = string|Element;
type closeSelector = string|Element|null;
const DimmedLayer = function(initOption?:layerOpenOption):{target:string,open:Function}{
    const me = this;
    const defaultOption = {
        width:0,
        height:0,
        wrapperClassName:"dimLayer",
        zIndex:100,
        background:"rgba(0,0,0,0.5)"
    }
    
    if(typeof initOption == "object"){
        for(let key in defaultOption){
            defaultOption[key] = initOption[key] ? initOption[key] : defaultOption[key];
        }
    };

    

    const create = (element:Element,openOption:layerOpenOption) => {
        // 신규 레이어 전용 케이스를 생성 및 엘리먼트 삽입
        const body = document.getElementsByTagName("body")[0];
        const layerWrapper = document.createElement("div");
        layerWrapper.className = "layerCase";

        addStack(element,layerWrapper); // 스택에 넣기.

        // body에 넣기
        layerWrapper.appendChild(element);
        body.appendChild(layerWrapper);
    }


    me.stack = [];
    const addStack = (element:Element,wrapperElement:HTMLDivElement) => {
        me.stack.unshift({
            element:element,
            parent:element.parentNode,
            wrapper:wrapperElement
        });
    };

    // 딤드레이어 열기
    me.open = (selector:openSelector,openOption:layerOpenOption) => {
        if(typeof selector == "string"){
            const targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element:Element) {
                create(element,openOption);
            });
        }else{

        }
        
    }
    // 딤드레이어 닫기
    me.close = (selector?:closeSelector) => {

        const removeStack = () => {
            
        }

        if(typeof selector == "string"){
            const targets = document.querySelectorAll(selector);
            Array.prototype.slice.call(targets).forEach(function (element) {
                for(let stack of me.stack){
                    if( stack.element == element ){
                        stack.parent.append(stack.element);
                        stack.wrapper.remove();
                    };
                };
            });
        }else if(selector instanceof Element){
            for(let stack of me.stack){
                if( stack.element == selector ){
                    stack.parent.append(stack.element);
                    stack.wrapper.remove();
                };
            };
        }else{
            me.stack[0].parent.append(me.stack[0].element);
            me.stack[0].wrapper.remove();
            me.stack.shift();
        }
    }


    return me;
}