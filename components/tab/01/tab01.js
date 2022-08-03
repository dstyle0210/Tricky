function tab01(id) {
    var $tab = $(id);
    var half = $tab.width() / 2;
    var $tabs = $tab.find("li");
    var reduce = 0;
    $tabs.each(function (i, tab) {
        var $me = $(tab);
        $me.data("posX", reduce - half + ($me.outerWidth() / 2));
        reduce += $me.outerWidth();
        $me.on("click.tab01", function () {
            $tab.animate({ scrollLeft: $(this).data("posX") }, 300);
            return false;
        });
    });
    $tab.on("touchstart.tab01", function (e) {
        e.stopPropagation();
    });
}
