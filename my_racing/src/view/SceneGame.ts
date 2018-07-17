class SceneGame extends egret.DisplayObjectContainer {
  private bg01: egret.Bitmap;
  private bg02: egret.Bitmap;
  private bg01MoveUtil: MoveUtil;
  private bg02MoveUtil: MoveUtil;
  private heroCon: egret.Sprite = new egret.Sprite();
  private car: egret.Bitmap;
  private carLight: egret.Bitmap;

  private isTouching: boolean = false;
  private startTouchPos: egret.Point = new egret.Point();//记录触摸初始点坐标
  private carsName: Array<string> = ["car0_png", "car1_png", "car2_png"];//车资源名称
  private preProduceCarTime: number = 0;//记录上次生产车的时间
  private carLayer: egret.Sprite = new egret.Sprite();//车子层级
  private sumSarsNum: number = 0;// 生产的所有的车子的总数
  private distanceNum: egret.BitmapText = new egret.BitmapText();
  // private distanceBg: egret.Bitmap;

  // private btn_test: egret.Bitmap;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.createBg();

    this.createHero();
  };

  start() {
    var that = this;
    this.startTips(() => {
      egret.Tween
        .get(that.carLight, { loop: true })
        .to({ alpha: 0 }, 300)
        .to({ alpha: 1 }, 300);
      that.touchEnabled = true;
      that.addEventListener(egret.Event.ENTER_FRAME, that.onEnterFrame, that);
      that.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchBegin, that);
      //这里只需要一个设置为true就可以。
      that.bg01MoveUtil.getDistance(true);
    });

  }
  end() {
    this.touchEnabled = true;
    this.resetData();
    if (this.hasEventListener(egret.Event.ENTER_FRAME)) this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    egret.Tween.removeTweens(this.carLight);
    this.carLight.alpha = 1;
  }

  private touchBegin(e: egret.TouchEvent) {
    this.isTouching = true;
    this.startTouchPos.x = e.stageX;
    this.startTouchPos.y = e.stageY;

    this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
  }
  private touchMove(e: egret.TouchEvent) {
    if (this.isTouching) {
      if (e.stageX - this.startTouchPos.x > 50) {
        //向右移动
        this.isTouching = false;
        egret.Tween.get(this.heroCon).to({ x: 287 }, 300).call(e => {
          this.isTouching = true;
        }, this);
      }

      else if (e.stageX - this.startTouchPos.x < -50) {
        //向左移动
        this.isTouching = false;
        egret.Tween.get(this.heroCon).to({ x: 100 }, 300).call(e => {
          this.isTouching = true;
        }, this);
      }
    }
    this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
  }
  private touchEnd(e: egret.TouchEvent) {
    this.isTouching = false;
    this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
  }

  private createBg() {
    this.bg01 = common.createBitmapByName('bg_png');
    this.bg02 = common.createBitmapByName('bg_png');
    this.bg01.width = this.bg02.width = common.curWidth();
    this.bg01.height = this.bg02.height = common.curHeight();
    this.addChild(this.bg01);
    this.addChild(this.bg02);

    this.addChild(this.carLayer);

    var distanceCon: egret.Sprite = new egret.Sprite();
    var distanceBg = common.createBitmapByName('roadnumBg_png');
    distanceCon.addChild(distanceBg);
    this.addChild(distanceCon);
    distanceCon.addChild(this.distanceNum);
    this.distanceNum.text = '0';
    this.distanceNum.x = 0;
    this.distanceNum.y = 36;
    this.distanceNum.font = RES.getRes('roadnum_fnt');
    distanceCon.x = common.curWidth() - distanceBg.width;
    distanceCon.y = 100;

    this.bg02.y = -common.curHeight();

    this.bg01MoveUtil = new MoveUtil(this.bg01);
    this.bg02MoveUtil = new MoveUtil(this.bg02);
    this.bg01MoveUtil.startPos = new egret.Point(0, 0);
    this.bg01MoveUtil.endPos = new egret.Point(0, common.curHeight());
    this.bg02MoveUtil.startPos = new egret.Point(0, -common.curHeight());
    this.bg02MoveUtil.endPos = new egret.Point(0, 0);
  }

  private createHero() {
    this.car = common.createBitmapByName('hero_png');
    this.carLight = common.createBitmapByName('carLight_png');
    this.heroCon.addChild(this.carLight);
    this.heroCon.addChild(this.car);


    this.car.x = (this.heroCon.width - this.car.width) + 1;
    this.car.y = this.carLight.height - 22;
    this.heroCon.x = common.curWidth() - 200;
    this.heroCon.y = common.curHeight() - 300;

    // console.log(this.heroCon.width,car.width)

    this.addChild(this.heroCon);
  }

  // 开始倒计时
  private startTips(cb) {
    var that = this;

    var one: egret.Bitmap = common.createBitmapByName('startnum1_png');
    var two: egret.Bitmap = common.createBitmapByName('startnum2_png');
    var three: egret.Bitmap = common.createBitmapByName('startnum3_png');
    this.addChild(one);
    this.addChild(two);
    this.addChild(three);

    one.anchorOffsetX = one.width / 2;
    two.anchorOffsetX = two.width / 2;
    three.anchorOffsetX = three.width / 2;
    one.anchorOffsetY = one.height / 2;
    two.anchorOffsetY = two.height / 2;
    three.anchorOffsetY = three.height / 2;
    one.x = two.x = three.x = common.curWidth() / 2;
    one.y = two.y = three.y = common.curHeight() / 2;

    one.alpha = two.alpha = three.alpha = 0;

    that.startTimeAnim(three, () => {
      that.startTimeAnim(two, () => {
        that.startTimeAnim(one, () => {
          cb && cb();
        })
      })
    })
  }

  private startTimeAnim(tar, cb) {
    egret.Tween
      .get(tar)
      .to({ alpha: 1, scaleX: 1.35, scaleY: 1.35 })
      .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backInOut)
      .call(() => {
        if (tar.parent) {
          tar.parent.removeChild(tar);
        }
        // tar.alpha = 0;
        cb();
      });
  }

  //随即生产小车
  private randomCreateCar() {
    this.sumSarsNum++;
    var index = Math.floor(Math.random() * 3);
    var car: Car = CarFactory.getInstance().produce(this.carsName[index]);
    var n = Math.floor(Math.random() * 2);
    car.init(n);
    car.setSpeed(Data.currentSpeedY - 2);
    this.carLayer.addChild(car);
  }

  private onEnterFrame(e: egret.Event) {
    // return false;
    //检测游戏是否结束
    if (this.isOver()) {
      this.gameEnd();
    }
    //随即生产小车
    var time: number = egret.getTimer();
    if (time - this.preProduceCarTime > Math.floor(Math.random() * 500 + 1500)) {
      this.randomCreateCar();
      this.preProduceCarTime = time;
    }
    //移动小车
    if (CarFactory.getInstance().liveCarArray.length) {
      for (var i = CarFactory.getInstance().liveCarArray.length - 1, car: Car; i >= 0; i--) {
        car = CarFactory.getInstance().liveCarArray[i];
        car.setSpeed(Data.currentSpeedY - 2);
        car.onEnterFrame();
      }
    }

    this.bg01MoveUtil.onEnterFrame();
    this.bg02MoveUtil.onEnterFrame();
    this.distanceNum.text = Math.floor(Data.distanceLength).toString();
  }

  // 重置数据
  private resetData() {
    this.bg01.y = 0;
    this.bg02.y = -common.curHeight();
    this.bg01MoveUtil._speedY = Data.startSpeed;
    this.bg02MoveUtil._speedY = Data.startSpeed;
    // this.roadblock.x = 80;
    // this.roadblock.y = 416;
    // this.carlight.x = 281;
    this.heroCon.x = common.curWidth() - 200;
    Data.distanceLength = 0;
    this.bg01MoveUtil.getDistance(false);
    CarFactory.getInstance().liveCarArray.length = 0;
  }

  //判断是否结束
  private isOver(): boolean {
    if (Data.distanceLength >= Data.targetDistance) {
      Data.gameResult = true;
      return true;
    }

    for (var i = CarFactory.getInstance().liveCarArray.length - 1, car: Car; i >= 0; i--) {
      car = CarFactory.getInstance().liveCarArray[i];
      // if (this.isHit(car, this.heroCon)) {
      if (this.isHit(car, this.car)) {
        Data.gameResult = false;
        return true;
      }
    }
  }

  //碰撞检测
  private isHit(target1: any, target2: any, isCon?: boolean): boolean {
    var rect1 = target1;
    var rect2 = target2;
    var rect2X;
    var rect2Y;

    if (isCon) {
      rect2X = rect2.x;
      rect2Y = rect2.y;
    } else {
      // 如果传进来不是容器，但有父容器，转为全局坐标
      rect2X = rect2.localToGlobal().x;
      rect2Y = rect2.localToGlobal().y;
    }

    if (Math.abs(rect1.x - rect2X) < (rect1.width + rect2.width) * 0.5 && Math.abs(rect1.y - rect2Y) < (rect1.height + rect2.height) * 0.5
    ) {
      return true;
    }
    return false;
  }

  // 游戏结束
  private gameEnd() {
    this.carLayer.removeChildren();

    var toEndEvent: SceneEvents = new SceneEvents(SceneEvents.SCENE_CHANGE);
    toEndEvent.eventType = SceneEvents.TO_END;
    toEndEvent.eventObj = this;

    ViewManager.getInstance().dispatchEvent(toEndEvent);
  }

}