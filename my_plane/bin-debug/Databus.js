var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Databus = (function () {
    function Databus() {
        this.pool = Pool.getInstance();
        this.reset();
    }
    Databus.getInstance = function () {
        if (!Databus.instance) {
            Databus.instance = new Databus();
        }
        return Databus.instance;
    };
    Databus.prototype.reset = function () {
        this.frame = 0;
        this.scores = 0;
        this.bullets = [];
        this.enemys = [];
        this.gameOver = false;
    };
    /**
    * 回收敌人，进入对象池
    * 此后不进入帧循环
    */
    Databus.prototype.removeEnemey = function (enemy) {
        // const index = this.enemys.findIndex(b => b === enemy);
        // enemy.visible = false
        // this.enemys.splice(index, 1);
        // this.pool.recover('enemy', enemy)
        // return;
        var temp = this.enemys.shift();
        temp.visible = false;
        // this.pool.recover('enemy', enemy);
        Pool.getInstance().recover('enemy', enemy);
    };
    /**
     * 回收子弹，进入对象池
     * 此后不进入帧循环
     */
    Databus.prototype.removeBullets = function (bullet) {
        var index = this.bullets.findIndex(function (b) { return b === bullet; });
        bullet.visible = false;
        this.bullets.splice(index, 1);
        this.pool.recover('bullet', bullet);
    };
    return Databus;
}());
__reflect(Databus.prototype, "Databus");
//# sourceMappingURL=Databus.js.map