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
var CarFactory = /** @class */ (function (_super) {
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
