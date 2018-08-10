class Player extends egret.Sprite {
  // 玩家等级，1 到 3，表现为玩家的子弹数量
  playerLevel: number = 1;

  static instance: Player;

  constructor() {
    super();
    this.init();
  }

  private hero;
  private init() {
    let hero = common.createBitmapByName('hero_png');
    this.addChild(hero);
    // hero.x = (common.curWidth() - hero.width)/2;
    // hero.y = common.curHeight() - hero.height - 200;
    this.hero = hero;
  }

  public static getInstance(): Player {
    if (!Player.instance) {
      Player.instance = new Player();
    }
    return Player.instance;
  }

  get level() {
    return this.playerLevel;
  }
  set level(level) {
    this.playerLevel = Math.min(level, 3);
  }


  shoot() {
    // return;
    for (let i = 0; i < this.playerLevel; i++) {
      const bullet = Databus.getInstance().pool.getItemByClass('bullet', Bullet, { direction: 'up', owner: this });
      let middle = this.x;
      if (this.level == 2) {
        middle = this.x + 15;
      }
      const x = !i ? middle : (i % 2 === 0 ? middle + 30 : middle - 30);
      bullet.init(
        x,
        this.y - 20,
        10
      )

      SceneGame.getInstance().planeLayer.addChildAt(bullet, 0);
      Databus.getInstance().bullets.push(bullet)
    }
  }

  isCollideWith(sp) {
    let spX = sp.x;
    let spY = sp.y;

    if (!this.visible || !sp.visible)
      return false

    return !!(spX >= this.x - this.width / 2
      && spX <= this.x + this.width / 2
      && spY >= this.y - this.height / 2
      && spY <= this.y + this.height / 2)
  }

}