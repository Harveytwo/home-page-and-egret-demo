class Enemy extends egret.Sprite {
  private speed: number;

  constructor() {
    super();
    this.createEnemy();
  }

  init(speed) {
    this.x = this.rnd(this.width / 2, common.curWidth() - this.width / 2);
    this.y = -this.height;
    this.speed = speed;
    this.visible = true;
    this.anchorOffsetX = this.width / 2;
    this.anchorOffsetY = this.height / 2;
  }

  update() {
    this.y += this.speed;
    // 对象回收
    if (this.y > common.curHeight() + this.height) {
      Databus.getInstance().removeEnemey(this);
      // console.log(9999)
    }
  }

  playAnimation() {
    this.visible = false;
    // this.enemy.visible = false;
    var movieClip = common.LoadMovieClipMovie('bomb', SceneGame.getInstance().planeLayer, 0, 0, 'bomb', 1, 'plane_bomb')
    movieClip.width = 64;
    movieClip.height = 48;
    movieClip.x = this.x - movieClip.width / 2;
    movieClip.y = this.y - movieClip.height / 2;
  }

  shoot() {
    // return;
    if (!this.visible) return;
    const bullet = Databus.getInstance().pool.getItemByClass('bullet', Bullet, { direction: 'down', owner: this });
    bullet.init(
      this.x,
      this.y + 10,
      this.speed + 5
    );

    SceneGame.getInstance().planeLayer.addChildAt(bullet, 0);

    Databus.getInstance().bullets.push(bullet);
  }

  private createEnemy() {
    // console.log('--------')
    let enemy = common.createBitmapByName('enemy_png');
    this.addChild(enemy);
  }

  private rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param {*} sp: Sprite
   * @returns
   * @memberof Enemy
   */
  isCollideWith(sp) {
    let spX = sp.x;
    let spY = sp.y;

    if (!this.visible || !sp.visible)
      return false

    // return !!(spX >= this.x - this.width/2 - sp.width/2
    //   && spX <= this.x + this.width/2 + sp.width/2
    //   && spY >= this.y - this.height/2 - sp.height/2
    //   && spY <= this.y + this.height/2 + sp.height/2)
    return !!(spX >= this.x - this.width / 2
      && spX <= this.x + this.width / 2
      && spY >= this.y - this.height / 2
      && spY <= this.y + this.height / 2)
  }

}