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
/**
 * 移动工具类
 * 这里大家可以扩展一下设置方向，x轴。我这里默认为y轴方向的移动
 */
var MoveUtil = /** @class */ (function (_super) {
    __extends(MoveUtil, _super);
    function MoveUtil(target, isLoop) {
        if (isLoop === void 0) { isLoop = true; }
        var _this = _super.call(this) || this;
        _this._startPos = new egret.Point(0, 0); //默认起点位置
        // private _endPos: egret.Point = new egret.Point(0, Data.stageH);//默认终点位置
        _this._endPos = new egret.Point(0, common.curHeight()); //默认终点位置
        _this._speedY = 2;
        _this._startSpeedY = 2; //初始速度
        _this.obj = null;
        _this.isLoop = true; //是否循环移动,默认为true
        _this._aSpeedY = 0.1;
        _this.isGetDistance = false; // 默认不获取
        _this.preEnterFrameTime = 0; //上一次移动的时间点
        _this.moveFrameNum = 60; //固定时间
        _this.obj = target;
        _this.isLoop = isLoop;
        return _this;
    }
    Object.defineProperty(MoveUtil.prototype, "startPos", {
        set: function (value) {
            if (this._startPos !== value) {
                this._startPos = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveUtil.prototype, "endPos", {
        set: function (value) {
            if (this._endPos !== value) {
                this._endPos = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveUtil.prototype, "speedY", {
        set: function (value) {
            if (this._startSpeedY !== value) {
                this._startSpeedY = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    //是否获取数据，设置全局数据
    MoveUtil.prototype.getDistance = function (isTrue) {
        if (isTrue === void 0) { isTrue = false; }
        this.isGetDistance = isTrue;
    };
    MoveUtil.prototype.onEnterFrame = function () {
        if (!this.obj) {
            return null;
        }
        this.obj.y += Math.floor(this._speedY);
        //设置速度上限
        if (this._speedY >= 36) {
            this._speedY = 36;
        }
        if (this.obj.y >= this._endPos.y && this.isLoop) {
            this.obj.y = this._startPos.y;
        }
        else if (this.obj.y >= this._endPos.y && !this.isLoop) {
            this.obj = null;
            return;
        }
        var time = Date.now();
        if (time - this.preEnterFrameTime > this.moveFrameNum) {
            this.preEnterFrameTime = time;
            // this._speedY += this._aSpeedY;
            // console.log("speedY " + this._speedY);
            if (this.isLoop && this.isGetDistance) {
                // Data.distanceLength += (this._speedY + this._startSpeedY) * 0.5;
                // Data.currentSpeedY = this._speedY;
                // console.log("speed = " + Data.currentSpeedY + " distance = " + Data.distanceLength);
            }
        }
    };
    return MoveUtil;
}(egret.Sprite));
