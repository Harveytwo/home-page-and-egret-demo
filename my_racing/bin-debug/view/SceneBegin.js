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
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneBegin.prototype.init = function () {
        this.createBg();
    };
    ;
    SceneBegin.prototype.start = function () {
        this.btn_start.touchEnabled = true;
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameStart, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_END, this.gameStart, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameStart, this);
    };
    SceneBegin.prototype.end = function () {
        this.btn_start.touchEnabled = false;
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameStart, this);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_END, this.gameStart, this);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameStart, this);
    };
    SceneBegin.prototype.createBg = function () {
        var bg = common.createBitmapByName('bg_png');
        this.addChild(bg);
        bg.width = common.curWidth();
        bg.height = common.curHeight();
        this.btn_start = common.createBitmapByName('startGameBtn_png');
        this.addChild(this.btn_start);
        this.btn_start.x = (common.curWidth() - this.btn_start.width) / 2;
        this.btn_start.y = common.curHeight() - 200;
        var finish = common.createBitmapByName('startLine_png');
        this.addChild(finish);
        finish.x = (common.curWidth() - finish.width) / 2;
        finish.y = (common.curHeight() - finish.height) / 2 - 20;
    };
    SceneBegin.prototype.gameStart = function (e) {
        var _this = this;
        game.touchAction(e, function () {
            var toGameEvent = new SceneEvents(SceneEvents.SCENE_CHANGE);
            toGameEvent.eventType = SceneEvents.TO_GAME;
            toGameEvent.eventObj = _this;
            ViewManager.getInstance().dispatchEvent(toGameEvent);
        });
    };
    return SceneBegin;
}(egret.DisplayObjectContainer));
__reflect(SceneBegin.prototype, "SceneBegin");
//# sourceMappingURL=SceneBegin.js.map