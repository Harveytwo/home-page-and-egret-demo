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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        // 玩家等级，1 到 3，表现为玩家的子弹数量
        _this.playerLevel = 1;
        _this.init();
        return _this;
    }
    Player.prototype.init = function () {
        var hero = common.createBitmapByName('hero_png');
        this.addChild(hero);
        // hero.x = (common.curWidth() - hero.width)/2;
        // hero.y = common.curHeight() - hero.height - 200;
        this.hero = hero;
    };
    Player.getInstance = function () {
        if (!Player.instance) {
            Player.instance = new Player();
        }
        return Player.instance;
    };
    Object.defineProperty(Player.prototype, "level", {
        get: function () {
            return this.playerLevel;
        },
        set: function (level) {
            this.playerLevel = Math.min(level, 3);
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.shoot = function () {
        // return;
        for (var i = 0; i < this.playerLevel; i++) {
            var bullet = Databus.getInstance().pool.getItemByClass('bullet', Bullet, { direction: 'up', owner: this });
            var middle = this.x;
            if (this.level == 2) {
                middle = this.x + 15;
            }
            var x = !i ? middle : (i % 2 === 0 ? middle + 30 : middle - 30);
            bullet.init(x, this.y - 20, 10);
            SceneGame.getInstance().planeLayer.addChildAt(bullet, 0);
            Databus.getInstance().bullets.push(bullet);
        }
    };
    Player.prototype.isCollideWith = function (sp) {
        var spX = sp.x;
        var spY = sp.y;
        if (!this.visible || !sp.visible)
            return false;
        return !!(spX >= this.x - this.width / 2
            && spX <= this.x + this.width / 2
            && spY >= this.y - this.height / 2
            && spY <= this.y + this.height / 2);
    };
    return Player;
}(egret.Sprite));
