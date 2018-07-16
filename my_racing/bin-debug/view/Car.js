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
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(textureName) {
        var _this = _super.call(this) || this;
        _this.startPos = new egret.Point();
        //移动工具类，设置false默认只移动一次
        _this.move = new MoveUtil(_this, false);
        _this.name = textureName;
        _this.texture = RES.getRes(textureName);
        if (_this.texture == null) {
            console.log("car 资源名称不对");
        }
        _this.addEventListener(egret.Event.ADDED, _this.onAdded, _this);
        return _this;
    }
    Car.prototype.init = function (num) {
        if (num === void 0) { num = 0; }
        var startPosX = num == 0 ? 100 : 280;
        this.move.startPos = new egret.Point(0, -this.texture.textureHeight);
        this.move.endPos = new egret.Point(0, common.curHeight());
        this.startPos.x = startPosX;
        this.startPos.y = -this.texture.textureHeight;
    };
    //添加到舞台事件
    Car.prototype.onAdded = function () {
        this.x = this.startPos.x;
        this.y = this.startPos.y;
    };
    Car.prototype.onEnterFrame = function () {
        if (this.move) {
            this.move.onEnterFrame();
            if (this.y > common.curHeight()) {
                this.distory();
            }
        }
    };
    //设置速度
    Car.prototype.setSpeed = function (speed) {
        this.move.speedY = speed;
    };
    Car.prototype.distory = function () {
        if (this && this.parent) {
            this.parent.removeChild(this);
            CarFactory.getInstance().reclaim(this);
        }
    };
    return Car;
}(egret.Bitmap));
