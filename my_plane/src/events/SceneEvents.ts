class SceneEvents extends egret.Event {
    public static SCENE_CHANGE:string = "scene_change";
    public eventType:any;//事件类型
    public eventObj:any;//对象

    public static TO_BEGIN: string = "to_begin";
    public static TO_GAME: string = "to_game";
    public static TO_END: string = "to_end";

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}