var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    ViewManager.getInstance = function () {
        if (!ViewManager.instance) {
            ViewManager.instance = new ViewManager();
        }
        return ViewManager.instance;
    };
    ViewManager.prototype.init = function () {
        this.sceneBegin = new SceneBegin();
        // this.sceneGame = new SceneGame();
        this.sceneGame = SceneGame.getInstance();
        this.start();
    };
    //初始，添加游戏开始界面
    ViewManager.prototype.start = function () {
        this.initListener();
        // this.addChild(this.sceneGame);
        // this.sceneGame.start();
        this.addChild(this.sceneBegin);
        this.sceneBegin.start();
    };
    //初始化事件监听
    ViewManager.prototype.initListener = function () {
        this.addEventListener(SceneEvents.SCENE_CHANGE, this.onChangeScene, this);
    };
    ViewManager.prototype.toBegin = function () {
        var _this = this;
        ScreenMovies.MovieStart(5, function () {
            _this.sceneBegin.start();
        });
        this.sceneGame.end();
        this.addChildAt(this.sceneBegin, 0);
        this.removeChild(this.sceneGame);
    };
    ViewManager.prototype.toGame = function () {
        var _this = this;
        ScreenMovies.MovieStart(5, function () {
            _this.sceneGame.start();
        });
        this.sceneBegin.end();
        this.addChildAt(this.sceneGame, 0);
        this.removeChild(this.sceneBegin);
    };
    ViewManager.prototype.toEnd = function () {
        // common.gameOver(1, this.sceneEnd,() => {
        //     this.sceneEnd.start();
        // });
        // this.sceneGame.end();
        // this.addChildAt(this.sceneEnd, 0);
        // this.removeChild(this.sceneGame);
    };
    ViewManager.prototype.onChangeScene = function (e) {
        //移除所有子对象
        // this.removeChildren();
        //判断事件，接下来添加哪个场景在舞台展现
        switch (e.eventType) {
            case SceneEvents.TO_BEGIN:
                this.toBegin();
                break;
            case SceneEvents.TO_GAME:
                this.toGame();
                break;
            case SceneEvents.TO_END:
                this.toEnd();
                break;
            default: break;
        }
    };
    return ViewManager;
}(egret.DisplayObjectContainer));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map