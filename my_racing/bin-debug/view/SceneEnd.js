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
var SceneEnd = (function (_super) {
    __extends(SceneEnd, _super);
    function SceneEnd() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneEnd.prototype.init = function () {
        this.createScene();
    };
    ;
    SceneEnd.prototype.start = function () {
        this.btn_restart.touchEnabled = true;
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameRestart, this);
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_END, this.gameRestart, this);
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameRestart, this);
        if (Data.gameResult) {
            this.img_success.alpha = 1;
        }
        else {
            this.img_fail.alpha = 1;
        }
    };
    SceneEnd.prototype.end = function () {
        var that = this;
        this.btn_restart.touchEnabled = false;
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameRestart, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_END, this.gameRestart, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameRestart, this);
        // this.y = -common.curHeight();
        setTimeout(function () {
            that.img_fail.alpha = 0;
            that.img_success.alpha = 0;
        }, 300);
    };
    SceneEnd.prototype.createScene = function () {
        var tipsCon = new egret.Sprite();
        var tipsBg = common.createBitmapByName('noticeBg_png');
        this.btn_restart = common.createBitmapByName('playAgainBtn_png');
        this.img_fail = common.createBitmapByName('failedNotice_png');
        this.img_success = common.createBitmapByName('succeededNotice_png');
        tipsCon.addChild(tipsBg);
        tipsCon.addChild(this.img_fail);
        tipsCon.addChild(this.img_success);
        tipsCon.addChild(this.btn_restart);
        tipsCon.x = (common.curWidth() - tipsCon.width) / 2;
        tipsCon.y = (common.curHeight() - tipsCon.height) / 2 - 100;
        this.btn_restart.x = (tipsCon.width - this.btn_restart.width) / 2;
        this.btn_restart.y = tipsBg.height + this.btn_restart.height;
        this.img_fail.x = this.img_success.x = (tipsBg.width - this.img_fail.width) / 2;
        this.img_fail.y = this.img_success.y = (tipsBg.height - this.img_fail.height) / 2;
        this.img_fail.alpha = 0;
        this.img_success.alpha = 0;
        this.addChild(tipsCon);
        this.y = -common.curHeight();
    };
    SceneEnd.prototype.gameRestart = function (e) {
        var _this = this;
        game.touchAction(e, function () {
            var toBeginEvent = new SceneEvents(SceneEvents.SCENE_CHANGE);
            toBeginEvent.eventType = SceneEvents.TO_BEGIN;
            toBeginEvent.eventObj = _this;
            ViewManager.getInstance().dispatchEvent(toBeginEvent);
        });
    };
    return SceneEnd;
}(egret.DisplayObjectContainer));
__reflect(SceneEnd.prototype, "SceneEnd");
//# sourceMappingURL=SceneEnd.js.map