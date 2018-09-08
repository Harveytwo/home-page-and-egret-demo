var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 简易的对象池实现
 * 用于对象的存贮和重复使用
 * 可以有效减少对象创建开销和避免频繁的垃圾回收
 * 提高游戏性能
 */
var Pool = (function () {
    function Pool() {
        this.poolDic = {};
    }
    Pool.getInstance = function () {
        if (!Pool.instance) {
            Pool.instance = new Pool();
        }
        return Pool.instance;
    };
    /**
     * 根据对象标识符
     * 获取对应的对象池
     */
    Pool.prototype.getPoolBySign = function (name) {
        return this.poolDic[name] || (this.poolDic[name] = []);
    };
    /**
    * 根据传入的对象标识符，查询对象池
    * 对象池为空创建新的类，否则从对象池中取
    */
    Pool.prototype.getItemByClass = function (name, className, properties) {
        var pool = this.getPoolBySign(name);
        if (pool.length === 0) {
            return new className(properties);
        }
        ;
        if (!properties) {
            return pool.shift();
        }
        var index = pool.findIndex(function (item) {
            return Object.keys(properties).every(function (property) {
                return item[property] === properties[property];
            });
        });
        // console.log(index);
        return index !== -1 ? pool.splice(index, 1)[0] : new className(properties);
    };
    /**
     * 将对象回收到对象池
     * 方便后续继续使用
     */
    Pool.prototype.recover = function (name, instance) {
        this.getPoolBySign(name).push(instance);
    };
    return Pool;
}());
__reflect(Pool.prototype, "Pool");
