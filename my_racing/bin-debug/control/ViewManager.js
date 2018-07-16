var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ViewManager = /** @class */ (function (_super) {
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
        this.sceneGame = new SceneGame();
        this.sceneEnd = new SceneEnd();
        this.start();
    };
    //初始，添加游戏开始界面
    ViewManager.prototype.start = function () {
        this.initListener();
        this.addChild(this.sceneGame);
        this.sceneGame.start();
        // this.addChild(this.sceneBegin);
        // this.sceneBegin.start(); 
    };
    //初始化事件监听
    ViewManager.prototype.initListener = function () {
        this.addEventListener(SceneEvents.SCENE_CHANGE, this.onChangeScene, this);
    };
    ViewManager.prototype.toBegin = function () {
        var _this = this;
        common.gameOver(2, this.sceneEnd, function () {
            _this.sceneBegin.start();
            // this.sceneGame.start();
            _this.removeChild(_this.sceneEnd);
        });
        this.sceneEnd.end();
        this.addChildAt(this.sceneBegin, 0);
        // this.addChildAt(this.sceneGame, 0);
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
        var _this = this;
        common.gameOver(1, this.sceneEnd, function () {
            _this.sceneEnd.start();
        });
        this.sceneGame.end();
        this.addChildAt(this.sceneEnd, 0);
        this.removeChild(this.sceneGame);
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
