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
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        _this.createEnemy();
        return _this;
    }
    Enemy.prototype.init = function (speed) {
        this.x = this.rnd(this.width / 2, common.curWidth() - this.width / 2);
        this.y = -this.height;
        this.speed = speed;
        this.visible = true;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    Enemy.prototype.update = function () {
        this.y += this.speed;
        // 对象回收
        if (this.y > common.curHeight() + this.height) {
            Databus.getInstance().removeEnemey(this);
            // console.log(9999)
        }
    };
    Enemy.prototype.playAnimation = function () {
        this.visible = false;
        // this.enemy.visible = false;
        var movieClip = common.LoadMovieClipMovie('bomb', SceneGame.getInstance().planeLayer, 0, 0, 'bomb', 1, 'plane_bomb');
        movieClip.width = 64;
        movieClip.height = 48;
        movieClip.x = this.x - movieClip.width / 2;
        movieClip.y = this.y - movieClip.height / 2;
    };
    Enemy.prototype.shoot = function () {
        // return;
        if (!this.visible)
            return;
        var bullet = Databus.getInstance().pool.getItemByClass('bullet', Bullet, { direction: 'down', owner: this });
        bullet.init(this.x, this.y + 10, this.speed + 5);
        SceneGame.getInstance().planeLayer.addChildAt(bullet, 0);
        Databus.getInstance().bullets.push(bullet);
    };
    Enemy.prototype.createEnemy = function () {
        // console.log('--------')
        var enemy = common.createBitmapByName('enemy_png');
        this.addChild(enemy);
    };
    Enemy.prototype.rnd = function (start, end) {
        return Math.floor(Math.random() * (end - start) + start);
    };
    /**
     * 简单的碰撞检测定义：
     * 另一个精灵的中心点处于本精灵所在的矩形内即可
     * @param {*} sp: Sprite
     * @returns
     * @memberof Enemy
     */
    Enemy.prototype.isCollideWith = function (sp) {
        var spX = sp.x;
        var spY = sp.y;
        if (!this.visible || !sp.visible)
            return false;
        // return !!(spX >= this.x - this.width/2 - sp.width/2
        //   && spX <= this.x + this.width/2 + sp.width/2
        //   && spY >= this.y - this.height/2 - sp.height/2
        //   && spY <= this.y + this.height/2 + sp.height/2)
        return !!(spX >= this.x - this.width / 2
            && spX <= this.x + this.width / 2
            && spY >= this.y - this.height / 2
            && spY <= this.y + this.height / 2);
    };
    return Enemy;
}(egret.Sprite));
