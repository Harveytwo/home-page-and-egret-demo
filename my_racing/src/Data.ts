/**
 * 游戏相关数据
 *
 */
class Data {
  //默认为true,表示是成功的；false表示失败，没有完成任务
  public static gameResult: boolean = true;
  //记录走过的路程距离
  public static distanceLength: number = 0;
  //目标距离
  public static targetDistance: number = 10000;
  //舞台高
  public static stageH: number = 800;
  //舞台宽
  public static stageW: number = 480;
  //当前车速度
  public static currentSpeedY: number = 6;
  // 起始车速度
  public static startSpeed: number = 6;
  // 最大速度
  public static mostSpeed: number = 36;
}