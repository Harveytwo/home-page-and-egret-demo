/**
 * 游戏相关数据
 *
 */
var Data = /** @class */ (function () {
    function Data() {
    }
    //默认为true,表示是成功的；false表示失败，没有完成任务
    Data.gameResult = true;
    //记录走过的路程距离
    Data.distanceLength = 0;
    //目标距离
    Data.targetDistance = 10000;
    //舞台高
    Data.stageH = 800;
    //舞台宽
    Data.stageW = 480;
    //当前车速度
    Data.currentSpeedY = 6;
    // 起始车速度
    Data.startSpeed = 6;
    // 最大速度
    Data.mostSpeed = 36;
    return Data;
}());
