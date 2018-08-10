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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(properties) {
        var _this = _super.call(this) || this;
        var direction = properties.direction, owner = properties.owner;
        _this.direction = direction;
        _this.createBullet();
        _this.owner = owner;
        return _this;
    }
    Bullet.prototype.createBullet = function () {
        // console.log(6666)
        var bullet;
        if (this.direction == 'up') {
            bullet = common.createBitmapByName('bullet_png');
        }
        else {
            bullet = common.createBitmapByName('bullet_down_png');
        }
        bullet.width = 31;
        bullet.height = 54;
        bullet.anchorOffsetX = bullet.width / 2;
        bullet.anchorOffsetY = bullet.height / 2;
        this.addChild(bullet);
    };
    Bullet.prototype.init = function (x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.visible = true;
    };
    // 每一帧更新子弹位置
    Bullet.prototype.update = function () {
        if (this.direction === 'up') {
            this.y -= this.speed;
            // 超出屏幕外回收自身
            if (this.y < -this.height)
                Databus.getInstance().removeBullets(this);
        }
        else {
            this.y += this.speed;
            // 超出屏幕外回收自身
            if (this.y > common.curHeight() + this.height)
                Databus.getInstance().removeBullets(this);
        }
    };
    return Bullet;
}(egret.Sprite));
