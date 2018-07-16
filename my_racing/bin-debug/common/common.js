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
})(common || (common = {}));
