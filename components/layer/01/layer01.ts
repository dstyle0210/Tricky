interface LayerOption {
    width?:number,
    height?:number
}

interface LayerStats {
    isOpen:boolean,
    layers?:[]
}
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
    width:0, "auto"
    height:0,
    zIndex:100,
    open(){
        
    }
});
layer.close(?selector);
layer.show(?selector);
layer.hide(?selector);
layer.pack(?selector);


// properties
layer.target; // 레이어 중 close 나 hide 가 발생 될 레이어
layer.stack; // 등록 된 레이어 목록
layer.isOpen; // 현재 레이어가 있는지 여부(open , close의 영향을 받음)
layer.isVisible; // 현재 레이어가 보이고 있는지 여부 (show , hide 의 영향을 받음)
layer.width // 레이어의 가로값
layer.height // 레이어의 세로값
layer.zIndex // 레이어의 z-index값

*/







const layer = {
    version:"0.1",
    stack:[],
    opt:{
        wraperClassName:"layerCase",
    },
    fn:{
        create(element:Element){
            // 신규 레이어 전용 케이스를 생성 및 엘리먼트 삽입
            const body = document.getElementsByTagName("body")[0];
            const layerWrapper = document.createElement("div");
            layerWrapper.className = "layerCase";
            layerWrapper.appendChild(element);
            body.appendChild(layerWrapper);
        },
        remove(element){
            this.childs.unshift(element);
        },
        addStack(me,element){
            me.stack.unshift(element);
            console.log( me.stack );
        }
    },
    open(selector:string,option:LayerOption){
        const me = this;
        const target = document.querySelectorAll(selector);
        Array.prototype.slice.call(target).forEach(function (element) {
            me.fn.create(element);
            me.fn.addStack(me,element);
        });
    },
    hide(){
        // const target = this.childs.last();
        console.log(this.childs[0]);
        // console.log(target);
    },
    hideAll(){
        console.log("hideAll");
    }
}
Object.freeze(layer);