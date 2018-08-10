class Bullet extends egret.Sprite {
  private direction: string;
  private speed;
  private owner;

  constructor(properties: any) {
    super();
    const { direction, owner} = properties;
    this.direction = direction;
    this.createBullet();
    this.owner = owner;
  }

  private createBullet() {
    // console.log(6666)
    let bullet: egret.Bitmap;
    if(this.direction == 'up') {
      bullet = common.createBitmapByName('bullet_png');
    } else {
      bullet = common.createBitmapByName('bullet_down_png');
    }
    bullet.width = 31;
    bullet.height = 54;
    bullet.anchorOffsetX = bullet.width / 2;
    bullet.anchorOffsetY = bullet.height / 2;
    this.addChild(bullet);
  }

  init(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.visible = true;
  }

  // 每一帧更新子弹位置
  update() {
    if (this.direction === 'up') {
      this.y -= this.speed;
      // 超出屏幕外回收自身
      if (this.y < -this.height)
        Databus.getInstance().removeBullets(this)
    } else {
      this.y += this.speed;
      // 超出屏幕外回收自身
      if (this.y > common.curHeight() + this.height)
        Databus.getInstance().removeBullets(this)
    }
  }
}