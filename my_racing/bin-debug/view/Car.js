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
var Car = (function (_super) {
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
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map