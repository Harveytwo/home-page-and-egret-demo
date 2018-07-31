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
var CarFactory = (function (_super) {
    __extends(CarFactory, _super);
    function CarFactory() {
        var _this = _super.call(this) || this;
        _this.cache = {};
        _this.liveCarArray = [];
        return _this;
    }
    CarFactory.getInstance = function () {
        if (CarFactory.instance == null) {
            CarFactory.instance = new CarFactory();
        }
        return CarFactory.instance;
    };
    //生产
    CarFactory.prototype.produce = function (textureName) {
        if (this.cache[textureName] == null) {
            this.cache[textureName] = [];
        }
        var car;
        var cars = this.cache[textureName];
        if (cars.length) {
            car = cars.shift();
        }
        else {
            car = new Car(textureName);
        }
        this.liveCarArray.push(car);
        return car;
    };
    //回收
    CarFactory.prototype.reclaim = function (car) {
        if (this.cache[car.name] == null) {
            this.cache[car.name] = [];
        }
        var cars = this.cache[car.name];
        if (cars.indexOf(car) == -1) {
            this.cache[car.name].push(car);
        }
        var index = this.liveCarArray.indexOf(car);
        if (index != -1) {
            this.liveCarArray.splice(index, 1);
        }
    };
    return CarFactory;
}(egret.Sprite));
__reflect(CarFactory.prototype, "CarFactory");
//# sourceMappingURL=CarFactory.js.map