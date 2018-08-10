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
var SceneEvents = /** @class */ (function (_super) {
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
