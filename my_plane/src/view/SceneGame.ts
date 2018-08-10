class SceneGame extends egret.DisplayObjectContainer {
  private bg01: egret.Bitmap;
  private bg02: egret.Bitmap;
  private bg01MoveUtil: MoveUtil;
  private bg02MoveUtil: MoveUtil;
  private heroCon: egret.Sprite = new egret.Sprite();
  private player: egret.Sprite;

  private isTouching: boolean = false;
  planeLayer: egret.Sprite = new egret.Sprite();// plane 和 bullet 的容器
  private userScores: egret.BitmapText = new egret.BitmapText();
  private overScores: egret.TextField = new egret.TextField();

  private restartBtn: egret.Sprite;

  private back_home: egret.Sprite;

  private over_panel: egret.Sprite = new egret.Sprite();

  private ENEMY_SPEED: number = 6;

  // 开始按下时，记录按下的位置和 player 的位置
  private downPoint: egret.Point = new egret.Point();
  private startPoint: egret.Point = new egret.Point();

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.createBg();

    this.overPanel();
  };

  private static instance: SceneGame;

  public static getInstance(): SceneGame {
    if (!SceneGame.instance) {
      SceneGame.instance = new SceneGame();
    }

    return SceneGame.instance;
  }

  start() {
    this.createHero();
    this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    this.touchEnabled = true;
    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

    this.back_home.touchEnabled = true;
    this.back_home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBegin, this);
  }

  end() {
    if (this.hasEventListener(egret.Event.ENTER_FRAME)) this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    this.touchEnabled = false;
    this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    // 防止被弹出来的 overPanel 阻止移除 touchMove 事件
    if(this.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) this.touchEnd();

    this.back_home.touchEnabled = false;
    this.back_home.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toBegin, this);
  }

  private touchBegin(e: egret.TouchEvent) {
    this.isTouching = true;
    this.downPoint.x = e.stageX;
    this.downPoint.y = e.stageY;
    this.startPoint.x = this.player.x;
    this.startPoint.y = this.player.y;
    this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
  }
  private touchMove(e: egret.TouchEvent) {
    if (this.isTouching) {
      this.player.x = this.startPoint.x + (e.stageX - this.downPoint.x);
      this.player.y = this.startPoint.y + (e.stageY - this.downPoint.y);
    }
  }
  private touchEnd() {
    this.isTouching = false;
    this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
  }

  private createBg() {
    this.bg01 = common.createBitmapByName('bg_game_jpg');
    this.bg02 = common.createBitmapByName('bg_game_jpg');
    this.bg01.width = this.bg02.width = common.curWidth();
    this.bg01.height = this.bg02.height = common.curHeight();
    this.addChild(this.bg01);
    this.addChild(this.bg02);
    // 这里要设置 bg02 的 y 轴，否则背景的连接处有一条线
    this.bg02.y = -common.curHeight();

    this.userScores.text = '0';
    this.userScores.x = 20;
    this.userScores.y = 20;
    this.userScores.font = RES.getRes('roadnum_fnt');
    this.addChild(this.userScores);


    this.bg01MoveUtil = new MoveUtil(this.bg01);
    this.bg02MoveUtil = new MoveUtil(this.bg02);
    this.bg01MoveUtil.startPos = new egret.Point(0, 0);
    this.bg01MoveUtil.endPos = new egret.Point(0, common.curHeight());
    this.bg02MoveUtil.startPos = new egret.Point(0, -common.curHeight());
    this.bg02MoveUtil.endPos = new egret.Point(0, 0);

    // 回到首页
    this.back_home = new egret.Sprite();
    this.addChild(this.back_home);
    let backHomeBg: egret.Bitmap = common.createBitmapByName('back_home_png');
    let backHomeTxt: egret.TextField = new egret.TextField();
    backHomeBg.width = 120;
    backHomeBg.height = 60;
    backHomeTxt.text = 'BACK';
    backHomeTxt.width = backHomeBg.width;
    backHomeTxt.textColor = 0x000000;
    backHomeTxt.textAlign = 'center';
    backHomeTxt.size = 32;
    backHomeTxt.y = 14;
    backHomeTxt.bold = true;
    this.back_home.x = 10;
    this.back_home.y = common.curHeight() - backHomeBg.height - 5;

    this.back_home.addChild(backHomeBg);
    this.back_home.addChild(backHomeTxt);
  }

  private createHero() {
    this.player = Player.getInstance();
    this.player.anchorOffsetX = this.player.width / 2;
    this.player.anchorOffsetY = this.player.height / 2;
    this.player.x = (common.curWidth()) / 2;
    this.player.y = common.curHeight() - 200;
    this.planeLayer.addChild(this.player);
    this.addChild(this.planeLayer);
  }

  private enemyGenerate() {
    // return;
    if (Databus.getInstance().frame % 80 === 0) {
      let enemy = Databus.getInstance().pool.getItemByClass('enemy', Enemy);
      enemy.init(this.ENEMY_SPEED);
      this.planeLayer.addChild(enemy);
      Databus.getInstance().enemys.push(enemy);
    }
  }

  private onEnterFrame(e: egret.Event) {
    // return false;
    //检测游戏是否结束
    if (Databus.getInstance().gameOver) {
      this.gameEnd();
      return;
    }

    Databus.getInstance().frame++;

    this.bg01MoveUtil.onEnterFrame();
    this.bg02MoveUtil.onEnterFrame();

    this.enemyGenerate();

    // 子弹和敌人移动
    Databus.getInstance().bullets
      .concat(Databus.getInstance().enemys)
      .forEach((item) => {
        item.update()
      })

    if (Databus.getInstance().frame % 20 === 0) {
      Player.getInstance().shoot();
    }

    // 敌人子弹移动
    Databus.getInstance().enemys.forEach(enemy => {
      const enemyShootPositions = [-enemy.height + this.ENEMY_SPEED * 15, -enemy.height + this.ENEMY_SPEED * 90];
      if (enemyShootPositions.indexOf(enemy.y) !== -1) {
        enemy.shoot();
      }
    });

    Player.getInstance().level = Math.max(1, Math.ceil(Databus.getInstance().scores / 30));

    this.collisionDetection();

    this.userScores.text = Databus.getInstance().scores.toString();
  }

  // 重置数据
  private resetData() {
    this.bg01.y = 0;
    this.bg02.y = -common.curHeight();
    this.bg01MoveUtil._speedY = 2;
    this.bg02MoveUtil._speedY = 2;
    // this.roadblock.x = 80;
    // this.roadblock.y = 416;
    // this.carlight.x = 281;
    this.heroCon.x = common.curWidth() - 200;
    // Data.distanceLength = 0;
    // this.bg01MoveUtil.getDistance(false);
  }

  // 全局碰撞检测
  private collisionDetection() {
    let that = this

    Databus.getInstance().bullets.forEach(bullet => {
      for (let i = 0, il = Databus.getInstance().enemys.length; i < il; i++) {
        let enemy = Databus.getInstance().enemys[i];
        if (bullet.owner instanceof Enemy) {
          Databus.getInstance().gameOver = Player.getInstance().isCollideWith(bullet);
          // console.log(Databus.getInstance().gameOver);
          break;
        } else if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
          enemy.playAnimation();
          bullet.visible = false;
          Databus.getInstance().scores += 1;
          break;
        }
      }
    });

    for (let i = 0, il = Databus.getInstance().enemys.length; i < il; i++) {
      let enemy = Databus.getInstance().enemys[i]

      if (Player.getInstance().isCollideWith(enemy)) {
        Databus.getInstance().gameOver = true
        break
      }
    }
  }

  private overPanel() {
    let mask: egret.Shape = new egret.Shape();
    mask.graphics.beginFill(0x000000, .75);
    mask.graphics.drawRect(0, 0, common.curWidth(), common.curHeight());
    // 防止点击蒙层，点击到蒙层下面的的内容，触发事件
    // mask.touchEnabled = true;

    let overBg = common.createBitmapByName('game_over_bg_png');
    overBg.width = 480;
    overBg.height = 432;
    overBg.x = (common.curWidth() - overBg.width) / 2;
    overBg.y = (common.curHeight() - overBg.height) / 2;

    let overTxt = new egret.TextField();
    overTxt.text = '游戏结束';
    overTxt.textColor = 0xffffff;
    overTxt.bold = true;
    overTxt.size = 36;
    overTxt.width = overBg.width;
    overTxt.textAlign = 'center';
    overTxt.y = overBg.y + 60;
    overTxt.x = overBg.x;

    this.overScores.text = '得分：0';
    this.overScores.textColor = 0xffffff;
    this.overScores.size = 30;
    this.overScores.width = overBg.width;
    this.overScores.textAlign = 'center';
    this.overScores.bold = true;
    this.overScores.x = overBg.x;
    this.overScores.y = overTxt.y + 116;

    this.restartBtn = new egret.Sprite();
    let restartBtnBg = common.createBitmapByName('restart_btn_png');
    restartBtnBg.width = 220;
    restartBtnBg.height = 80;
    let restartBtnTxt = new egret.TextField();
    restartBtnTxt.text = '重新开始';
    restartBtnTxt.bold = true;
    restartBtnTxt.size = 30;
    restartBtnTxt.width = restartBtnBg.width;
    restartBtnTxt.textAlign = 'center';
    restartBtnTxt.y = 20;


    this.restartBtn.addChild(restartBtnBg);
    this.restartBtn.addChild(restartBtnTxt);
    this.restartBtn.x = (common.curWidth() - this.restartBtn.width) / 2;
    this.restartBtn.y = this.overScores.y + 70;

    this.restartBtn.touchEnabled = true;
    this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);

    this.over_panel.addChild(mask);
    this.over_panel.addChild(overBg);
    this.over_panel.addChild(overTxt);
    this.over_panel.addChild(this.overScores);
    this.over_panel.addChild(this.restartBtn);
    // this.addChildAt(this.over_panel, this.$children.length - 1);
  }

  // 游戏结束
  private gameEnd() {
    // console.log('over');
    this.overScores.text = '得分：' + Databus.getInstance().scores.toString();
    this.addChildAt(this.over_panel, this.$children.length - 1);
    setTimeout(() => {
      this.end();
    }, 50)
    return;
  }

  private restartGame(e:egret.TouchEvent) {
    // e.preventDefault();
    this.removeChild(this.over_panel);
    this.planeLayer.removeChildren();
    Databus.getInstance().reset();
    this.start();
  }

  // 回到首页
  private toBegin() {
    this.planeLayer.removeChildren();
    Databus.getInstance().reset();

    var toEndEvent: SceneEvents = new SceneEvents(SceneEvents.SCENE_CHANGE);
    toEndEvent.eventType = SceneEvents.TO_BEGIN;
    toEndEvent.eventObj = this;

    ViewManager.getInstance().dispatchEvent(toEndEvent);
  }

}