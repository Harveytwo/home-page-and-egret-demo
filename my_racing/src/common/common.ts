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

}