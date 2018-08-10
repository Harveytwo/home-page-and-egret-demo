class Databus {
  // 分数，表现为击杀 enemy 数量
  scores;
  // 子弹数组
  bullets;
  // enemy 数组
  enemys;
  // 游戏是否结束
  gameOver: boolean;
  // frame 记录
  frame: number;

  pool: Pool;

  constructor() {
    this.pool = Pool.getInstance();

    this.reset();
  }

  private static instance: Databus;

  public static getInstance(): Databus {
    if (!Databus.instance) {
      Databus.instance = new Databus();
    }

    return Databus.instance;
  }

  reset() {
    this.frame = 0;
    this.scores = 0;
    this.bullets = []
    this.enemys = []
    this.gameOver = false;
  }

  /**
  * 回收敌人，进入对象池
  * 此后不进入帧循环
  */
  removeEnemey(enemy) {
    // const index = this.enemys.findIndex(b => b === enemy);
    // enemy.visible = false
    // this.enemys.splice(index, 1);
    // this.pool.recover('enemy', enemy)
    // return;
    let temp = this.enemys.shift();
    temp.visible = false;
    // this.pool.recover('enemy', enemy);
    Pool.getInstance().recover('enemy', enemy);
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    const index = this.bullets.findIndex(b => b === bullet);
    bullet.visible = false
    this.bullets.splice(index, 1);
    this.pool.recover('bullet', bullet)
  }


}