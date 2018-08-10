module game {
  /**
   * 按钮点击放大动画，移开取消
   *
   * @export
   * @param {egret.TouchEvent} e
   * @param {*} successCb 成功回调
   * @param {*} [cancleCb]  取消回调，可选
   */
  export function touchAction(e:egret.TouchEvent, successCb, cancleCb?:any) {
    if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
      e.currentTarget.scaleX = 1.05;
      e.currentTarget.scaleY = 1.05;
    } else if (e.type == egret.TouchEvent.TOUCH_END) {
      e.currentTarget.scaleX = 1.0;
      e.currentTarget.scaleY = 1.0;
      //开始游戏
      successCb && successCb();
    } else if (e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
      e.currentTarget.scaleX = 1.0;
      e.currentTarget.scaleY = 1.0;
      cancleCb && cancleCb(); 
    }
  }
}