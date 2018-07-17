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
var SceneGame = /** @class */ (function (_super) {
    __extends(SceneGame, _super);
    // private distanceBg: egret.Bitmap;
    // private btn_test: egret.Bitmap;
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.heroCon = new egret.Sprite();
        _this.isTouching = false;
        _this.startTouchPos = new egret.Point(); //记录触摸初始点坐标
        _this.carsName = ["car0_png", "car1_png", "car2_png"]; //车资源名称
        _this.preProduceCarTime = 0; //记录上次生产车的时间
        _this.carLayer = new egret.Sprite(); //车子层级
        _this.sumSarsNum = 0; // 生产的所有的车子的总数
        _this.distanceNum = new egret.BitmapText();
        _this.init();
        return _this;
    }
    SceneGame.prototype.init = function () {
        this.createBg();
        this.createHero();
    };
    ;
    SceneGame.prototype.start = function () {
        var that = this;
        this.startTips(function () {
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
    };
    SceneGame.prototype.end = function () {
        this.touchEnabled = true;
        this.resetData();
        if (this.hasEventListener(egret.Event.ENTER_FRAME))
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN))
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        egret.Tween.removeTweens(this.carLight);
        this.carLight.alpha = 1;
    };
    SceneGame.prototype.touchBegin = function (e) {
        this.isTouching = true;
        this.startTouchPos.x = e.stageX;
        this.startTouchPos.y = e.stageY;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    SceneGame.prototype.touchMove = function (e) {
        var _this = this;
        if (this.isTouching) {
            if (e.stageX - this.startTouchPos.x > 50) {
                //向右移动
                this.isTouching = false;
                egret.Tween.get(this.heroCon).to({ x: 287 }, 300).call(function (e) {
                    _this.isTouching = true;
                }, this);
            }
            else if (e.stageX - this.startTouchPos.x < -50) {
                //向左移动
                this.isTouching = false;
                egret.Tween.get(this.heroCon).to({ x: 100 }, 300).call(function (e) {
                    _this.isTouching = true;
                }, this);
            }
        }
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    SceneGame.prototype.touchEnd = function (e) {
        this.isTouching = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    SceneGame.prototype.createBg = function () {
        this.bg01 = common.createBitmapByName('bg_png');
        this.bg02 = common.createBitmapByName('bg_png');
        this.bg01.width = this.bg02.width = common.curWidth();
        this.bg01.height = this.bg02.height = common.curHeight();
        this.addChild(this.bg01);
        this.addChild(this.bg02);
        this.addChild(this.carLayer);
        var distanceCon = new egret.Sprite();
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
    };
    SceneGame.prototype.createHero = function () {
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
    };
    // 开始倒计时
    SceneGame.prototype.startTips = function (cb) {
        var that = this;
        var one = common.createBitmapByName('startnum1_png');
        var two = common.createBitmapByName('startnum2_png');
        var three = common.createBitmapByName('startnum3_png');
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
        that.startTimeAnim(three, function () {
            that.startTimeAnim(two, function () {
                that.startTimeAnim(one, function () {
                    cb && cb();
                });
            });
        });
    };
    SceneGame.prototype.startTimeAnim = function (tar, cb) {
        egret.Tween
            .get(tar)
            .to({ alpha: 1, scaleX: 1.35, scaleY: 1.35 })
            .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backInOut)
            .call(function () {
            if (tar.parent) {
                tar.parent.removeChild(tar);
            }
            // tar.alpha = 0;
            cb();
        });
    };
    //随即生产小车
    SceneGame.prototype.randomCreateCar = function () {
        this.sumSarsNum++;
        var index = Math.floor(Math.random() * 3);
        var car = CarFactory.getInstance().produce(this.carsName[index]);
        var n = Math.floor(Math.random() * 2);
        car.init(n);
        car.setSpeed(Data.currentSpeedY - 2);
        this.carLayer.addChild(car);
    };
    SceneGame.prototype.onEnterFrame = function (e) {
        // return false;
        //检测游戏是否结束
        if (this.isOver()) {
            this.gameEnd();
        }
        //随即生产小车
        var time = egret.getTimer();
        if (time - this.preProduceCarTime > Math.floor(Math.random() * 500 + 1500)) {
            this.randomCreateCar();
            this.preProduceCarTime = time;
        }
        //移动小车
        if (CarFactory.getInstance().liveCarArray.length) {
            for (var i = CarFactory.getInstance().liveCarArray.length - 1, car; i >= 0; i--) {
                car = CarFactory.getInstance().liveCarArray[i];
                car.setSpeed(Data.currentSpeedY - 2);
                car.onEnterFrame();
            }
        }
        this.bg01MoveUtil.onEnterFrame();
        this.bg02MoveUtil.onEnterFrame();
        this.distanceNum.text = Math.floor(Data.distanceLength).toString();
    };
    // 重置数据
    SceneGame.prototype.resetData = function () {
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
    };
    //判断是否结束
    SceneGame.prototype.isOver = function () {
        if (Data.distanceLength >= Data.targetDistance) {
            Data.gameResult = true;
            return true;
        }
        for (var i = CarFactory.getInstance().liveCarArray.length - 1, car; i >= 0; i--) {
            car = CarFactory.getInstance().liveCarArray[i];
            // if (this.isHit(car, this.heroCon)) {
            if (this.isHit(car, this.car)) {
                Data.gameResult = false;
                return true;
            }
        }
    };
    //碰撞检测
    SceneGame.prototype.isHit = function (target1, target2, isCon) {
        var rect1 = target1;
        var rect2 = target2;
        var rect2X;
        var rect2Y;
        if (isCon) {
            rect2X = rect2.x;
            rect2Y = rect2.y;
        }
        else {
            // 如果传进来不是容器，但有父容器，转为全局坐标
            rect2X = rect2.localToGlobal().x;
            rect2Y = rect2.localToGlobal().y;
        }
        if (Math.abs(rect1.x - rect2X) < (rect1.width + rect2.width) * 0.5 && Math.abs(rect1.y - rect2Y) < (rect1.height + rect2.height) * 0.5) {
            return true;
        }
        return false;
    };
    // 游戏结束
    SceneGame.prototype.gameEnd = function () {
        this.carLayer.removeChildren();
        var toEndEvent = new SceneEvents(SceneEvents.SCENE_CHANGE);
        toEndEvent.eventType = SceneEvents.TO_END;
        toEndEvent.eventObj = this;
        ViewManager.getInstance().dispatchEvent(toEndEvent);
    };
    return SceneGame;
}(egret.DisplayObjectContainer));
