var common;
(function (common) {
    //获取当前面板
    function curStage() {
        return egret.MainContext.instance.stage;
    }
    common.curStage = curStage;
    //当前游戏宽度
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    common.curWidth = curWidth;
    //当前游戏宽度
    function curHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    common.curHeight = curHeight;
    // 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    common.createBitmapByName = createBitmapByName;
    // gameover 画面弹出
    function gameOver(type, obj, cb) {
        switch (type) {
            case 1:
                egret.Tween
                    .get(obj)
                    .to({ y: 0 }, 500, egret.Ease.circIn)
                    .call(function () {
                    cb && cb();
                });
                break;
            case 2:
                egret.Tween
                    .get(obj)
                    .to({ y: -common.curHeight() }, 300, egret.Ease.circIn)
                    .call(function () {
                    cb && cb();
                });
                break;
            default:
                break;
        }
    }
    common.gameOver = gameOver;
    //创建播放MovieClip动画： 动画名,加载的容器,x,y,动画组名,播放次数-1为无限,资源名
    function LoadMovieClipMovie(_movieName, _loadMc, _x, _y, GroupName, timers, _jsonname) {
        var data = RES.getRes(_jsonname + "_json");
        var txtr = RES.getRes(_jsonname + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var _mc = new egret.MovieClip(mcFactory.generateMovieClipData(GroupName));
        _mc.x = _x;
        _mc.y = _y;
        _loadMc.addChild(_mc);
        _mc.gotoAndPlay(_movieName, timers);
        _mc.addEventListener(egret.Event.COMPLETE, function (e) {
            //监听播放完毕直接移除掉
            _loadMc.removeChild(_mc);
        }, this);
        return _mc;
    }
    common.LoadMovieClipMovie = LoadMovieClipMovie;
})(common || (common = {}));
//# sourceMappingURL=common.js.map