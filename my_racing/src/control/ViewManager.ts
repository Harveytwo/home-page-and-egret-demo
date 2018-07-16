class ViewManager extends egret.DisplayObjectContainer {
    private static instance: ViewManager;

    private sceneBegin: SceneBegin; 
    private sceneGame: SceneGame; 
    private sceneEnd: SceneEnd; 


    public constructor() {
        super();
        this.init();
    }

    public static getInstance(): ViewManager {
        if (!ViewManager.instance) {
            ViewManager.instance = new ViewManager();
        }

        return ViewManager.instance;
    }

    private init() {
        this.sceneBegin = new SceneBegin();
        this.sceneGame = new SceneGame();
        this.sceneEnd = new SceneEnd();

        this.start();
    }

    //初始，添加游戏开始界面
    public start() {
        this.initListener();

        this.addChild(this.sceneGame);
        this.sceneGame.start();
        // this.addChild(this.sceneBegin);
        // this.sceneBegin.start(); 
    }

    //初始化事件监听
    private initListener() {
        this.addEventListener(SceneEvents.SCENE_CHANGE, this.onChangeScene, this);
    }

    private toBegin() {
        common.gameOver(2, this.sceneEnd,() => {
            this.sceneBegin.start();
            // this.sceneGame.start();
            this.removeChild(this.sceneEnd);
        });
        this.sceneEnd.end();
        this.addChildAt(this.sceneBegin, 0);
        // this.addChildAt(this.sceneGame, 0);
    }
    private toGame() {
        ScreenMovies.MovieStart(5, () => {
            this.sceneGame.start();
        });
        this.sceneBegin.end();
        this.addChildAt(this.sceneGame, 0);
        this.removeChild(this.sceneBegin);
    }
    private toEnd() {
        common.gameOver(1, this.sceneEnd,() => {
            this.sceneEnd.start();
        });
        this.sceneGame.end();
        this.addChildAt(this.sceneEnd, 0);
        this.removeChild(this.sceneGame);
    }

    private onChangeScene(e: SceneEvents) {

        //移除所有子对象
        // this.removeChildren();

        //判断事件，接下来添加哪个场景在舞台展现
        switch (e.eventType) {
            case SceneEvents.TO_BEGIN:
                this.toBegin();
                break;
            case SceneEvents.TO_GAME:
                this.toGame();
                break;
            case SceneEvents.TO_END:
                this.toEnd();
                break;
            default: break;
        }
    }


}