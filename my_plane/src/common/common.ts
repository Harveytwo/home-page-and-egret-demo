module common {
  //获取当前面板
  export function curStage(): egret.Stage {
    return egret.MainContext.instance.stage;
  }

  //当前游戏宽度
  export function curWidth(): number {
    return egret.MainContext.instance.stage.stageWidth;
  }

  //当前游戏宽度
  export function curHeight(): number {
    return egret.MainContext.instance.stage.stageHeight;
  }
  // 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
  export function createBitmapByName(name: string) {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
  }

  // gameover 画面弹出
  export function gameOver(type, obj, cb) {
    switch (type) {
      case 1:
        egret.Tween
          .get(obj)
          .to({ y: 0 }, 500, egret.Ease.circIn)
          .call(() => {
            cb && cb();
          })
        break;
      case 2:
        egret.Tween
          .get(obj)
          .to({ y: -common.curHeight() }, 300, egret.Ease.circIn)
          .call(() => {
            cb && cb();
          })
        break;


      default:
        break;
    }
  }

  //创建播放MovieClip动画： 动画名,加载的容器,x,y,动画组名,播放次数-1为无限,资源名
  export function LoadMovieClipMovie(_movieName: string, _loadMc, _x: number, _y: number, GroupName, timers: number, _jsonname: string) {
    let data = RES.getRes(_jsonname + "_json");
    let txtr = RES.getRes(_jsonname + "_png");
    var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
    var _mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(GroupName));
    _mc.x = _x;
    _mc.y = _y
    _loadMc.addChild(_mc)
    _mc.gotoAndPlay(_movieName, timers);
    _mc.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
      //监听播放完毕直接移除掉
      _loadMc.removeChild(_mc)
    }, this);
    return _mc;
  }


}