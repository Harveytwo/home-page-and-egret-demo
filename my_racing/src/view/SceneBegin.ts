class SceneBegin extends egret.DisplayObjectContainer {
  private btn_start: egret.Bitmap;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.createBg();
  };

  start() {
    this.btn_start.touchEnabled = true;
    this.btn_start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameStart, this);
    this.btn_start.addEventListener(egret.TouchEvent.TOUCH_END, this.gameStart, this);
    this.btn_start.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameStart, this);
  }
  end() {
    this.btn_start.touchEnabled = false;
    this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameStart, this);
    this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_END, this.gameStart, this);
    this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameStart, this);
  }

  private createBg() {
    var bg = common.createBitmapByName('bg_png');
    this.addChild(bg);
    bg.width = common.curWidth();
    bg.height = common.curHeight();

    this.btn_start = common.createBitmapByName('startGameBtn_png');
    this.addChild(this.btn_start);
    this.btn_start.x = (common.curWidth() - this.btn_start.width) / 2;
    this.btn_start.y = common.curHeight() - 200;

    var finish:egret.Bitmap = common.createBitmapByName('startLine_png');
    this.addChild(finish);
    finish.x = (common.curWidth() - finish.width) / 2;
    finish.y = (common.curHeight() - finish.height) / 2 - 20;
  }

  private gameStart(e:egret.TouchEvent) {
    game.touchAction(e, ()=>{
      var toGameEvent: SceneEvents = new SceneEvents(SceneEvents.SCENE_CHANGE);
      toGameEvent.eventType = SceneEvents.TO_GAME;
      toGameEvent.eventObj = this;
      ViewManager.getInstance().dispatchEvent(toGameEvent);
    });
  }
}