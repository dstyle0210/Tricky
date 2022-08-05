function tab01(id:string):void{
    const $tab = $(id);
    const half:number = $tab.width() / 2;
    const $tabs = $tab.find("li");
    let reduce = 0;
    $tabs.each((i,tab) => {
        let $me = $(tab);
        $me.data("posX",reduce - half + ($me.outerWidth() / 2)); // 가운데 정렬 처리
        reduce += $me.outerWidth();
        $me.on("click.tab01",function(){
            $tab.animate({scrollLeft:$(this).data("posX")},300); 
            return false;
        });
    });
    $tab.on("touchstart.tab01",(e)=>{
        e.stopPropagation();
    });
}