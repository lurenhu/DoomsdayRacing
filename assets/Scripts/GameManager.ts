// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

     // 静态单例引用
    private static _instance: GameManager = null;
    public static get instance(): GameManager {
        return this._instance;
    }

    // 单例初始化（在 onLoad 中赋值）
    onLoad() {
        if (GameManager._instance === null) {
            GameManager._instance = this;
            cc.game.addPersistRootNode(this.node); // 设为常驻节点（跨场景保留）
        } else {
            this.node.destroy(); // 销毁重复实例
            cc.warn("GameManager 已存在，禁止重复创建");
        }
    }
}
