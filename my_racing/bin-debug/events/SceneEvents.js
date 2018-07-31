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
var SceneEvents = (function (_super) {
    __extends(SceneEvents, _super);
    function SceneEvents(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    SceneEvents.SCENE_CHANGE = "scene_change";
    SceneEvents.TO_BEGIN = "to_begin";
    SceneEvents.TO_GAME = "to_game";
    SceneEvents.TO_END = "to_end";
    return SceneEvents;
}(egret.Event));
__reflect(SceneEvents.prototype, "SceneEvents");
//# sourceMappingURL=SceneEvents.js.map