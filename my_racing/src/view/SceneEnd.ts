class SceneEnd extends egret.DisplayObjectContainer {
  private btn_restart: egret.Bitmap;
  private img_success: egret.Bitmap;
  private img_fail: egret.Bitmap;
  
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.createScene();
  };

  start() {
    this.btn_restart.touchEnabled = true;
    this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameRestart, this);
    this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_END, this.gameRestart, this);
    this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameRestart, this);
    if(Data.gameResult) {
      this.img_success.alpha = 1;
    } else {
      this.img_fail.alpha = 1;
    }
  }
  end() {
    var that = this;
    this.btn_restart.touchEnabled = false;
    this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameRestart, this);
    this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_END, this.gameRestart, this);
    this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.gameRestart, this);
    // this.y = -common.curHeight();
    setTimeout(()=>{
      that.img_fail.alpha = 0;
      that.img_success.alpha = 0;
    }, 300)
  }

  private createScene() {
    var tipsCon: egret.Sprite = new egret.Sprite();
    var tipsBg: egret.Bitmap = common.createBitmapByName('noticeBg_png');
    this.btn_restart = common.createBitmapByName('playAgainBtn_png');
    this.img_fail = common.createBitmapByName('failedNotice_png');
    this.img_success = common.createBitmapByName('succeededNotice_png');
    tipsCon.addChild(tipsBg);
    tipsCon.addChild(this.img_fail);
    tipsCon.addChild(this.img_success);
    tipsCon.addChild(this.btn_restart);

    tipsCon.x = (common.curWidth() - tipsCon.width) / 2;
    tipsCon.y = (common.curHeight() - tipsCon.height) / 2 - 100;
    this.btn_restart.x = (tipsCon.width - this.btn_restart.width) / 2;
    this.btn_restart.y = tipsBg.height + this.btn_restart.height;
    this.img_fail.x = this.img_success.x = (tipsBg.width - this.img_fail.width) / 2;
    this.img_fail.y = this.img_success.y = (tipsBg.height - this.img_fail.height) / 2;
    this.img_fail.alpha = 0;
    this.img_success.alpha = 0;
    
    this.addChild(tipsCon);
    this.y = -common.curHeight();
  }

  private gameRestart(e:egret.TouchEvent) {
    game.touchAction(e, ()=>{
      var toBeginEvent: SceneEvents = new SceneEvents(SceneEvents.SCENE_CHANGE);
      toBeginEvent.eventType = SceneEvents.TO_BEGIN;
      toBeginEvent.eventObj = this;
      ViewManager.getInstance().dispatchEvent(toBeginEvent);
    });
  }
}