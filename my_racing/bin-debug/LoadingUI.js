//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.img_loadingCarCon = new egret.Sprite();
        _this.loadingBg = "resource/mySources/loadingBg.png"; //加载页面背景
        _this.loadingCar = "resource/mySources/loadingCar.png"; //进度条的条
        _this.loadingLength = 235; //车道的像素距离
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.textField.size = 24;
        this.textField.x = 14;
        this.textField.y = 6;
        // this.addChild(this.textField);
        // this.textField.y = 300;
        // this.textField.width = 480;
        // this.textField.height = 100;
        // this.textField.textAlign = "center";
        //设备的宽高
        this.w = egret.Capabilities.boundingClientWidth;
        this.h = egret.Capabilities.boundingClientHeight;
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.loadingBg));
        this.w = egret.Capabilities.boundingClientWidth;
        this.h = egret.Capabilities.boundingClientHeight;
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.loadingCar));
        this.img_loadingBg = new egret.Bitmap();
        this.img_loadingCar = new egret.Bitmap();
        this.addChildAt(this.img_loadingBg, 0);
        this.img_loadingCarCon.addChild(this.img_loadingCar);
        this.img_loadingCarCon.addChild(this.textField);
        this.addChild(this.img_loadingCarCon);
    };
    LoadingUI.prototype.onComplete = function (e) {
        var urlLoader = e.target;
        var texture = urlLoader.data;
        if (urlLoader._request.url == this.loadingBg) {
            this.img_loadingBg.texture = texture;
            var bgW = this.img_loadingBg.width;
            var bgH = this.img_loadingBg.height;
            // console.log(bgW + "背景宽");
            // console.log(bgH + "背景高");
            // console.log(this.w + "视口宽");
            // console.log(this.h + "视口高");
            if (this.w / 640 < this.h / 1136) {
                //W
                this.img_loadingBg.scaleX = 1;
                this.img_loadingBg.scaleY = this.stage.stageHeight / bgH;
                this.img_loadingCarCon.y = 332 * (this.stage.stageHeight / bgH);
            }
            else {
                //H
                this.img_loadingBg.scaleY = 1;
                this.img_loadingBg.scaleX = this.stage.stageWidth / bgW;
                this.img_loadingCarCon.y = 328;
            }
        }
        else if (urlLoader._request.url == this.loadingCar) {
            this.img_loadingCar.texture = texture;
            this.img_loadingCarCon.x = 80;
            // console.log(this.h)
        }
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        // this.textField.text = `${current}/${total}`;
        this.textField.text = Math.round((current / total) * 100) + "%";
        this.img_loadingCarCon.x += Math.floor(this.loadingLength / total);
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map