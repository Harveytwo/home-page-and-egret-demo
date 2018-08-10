class SceneBegin extends egret.DisplayObjectContainer {
  private btn_start: egret.Bitmap;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.createBg();
    this.addMoveClip();
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
    var bg = common.createBitmapByName('bg_jpg');
    this.addChild(bg);
    bg.width = common.curWidth();
    bg.height = common.curHeight();

    this.btn_start = common.createBitmapByName('startGameBtn_png');
    this.addChild(this.btn_start);
    this.btn_start.x = (common.curWidth() - this.btn_start.width) / 2;
    this.btn_start.y = common.curHeight() - 300;
  }

  private gameStart(e:egret.TouchEvent) {
    game.touchAction(e, ()=>{
      var toGameEvent: SceneEvents = new SceneEvents(SceneEvents.SCENE_CHANGE);
      toGameEvent.eventType = SceneEvents.TO_GAME;
      toGameEvent.eventObj = this;
      ViewManager.getInstance().dispatchEvent(toGameEvent);
    });
  }

  private addMoveClip() {
    return;
    var movieClip =  common.LoadMovieClipMovie('bomb',this,0,0,'bomb',1,'plane_bomb')
    movieClip.x = (common.curWidth()-movieClip.width)/2; 
    movieClip.y = (common.curHeight()-movieClip.height)/2 - 100; 
}


}