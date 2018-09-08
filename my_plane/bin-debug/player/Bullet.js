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
var Bullet = (function (_super) {
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
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map