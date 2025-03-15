// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreManager extends cc.Component {

    score: number = 0;

    @property(cc.Label)
    label: cc.Label = null;

    private static _instance: ScoreManager = null;
    public static get instance(): ScoreManager {
        return this._instance;
    }

    onLoad() {
        if (ScoreManager._instance === null) {
            ScoreManager._instance = this;
            cc.game.addPersistRootNode(this.node);
        } else {
            this.node.destroy();
            cc.warn("ScoreManager 已存在，禁止重复创建");
        }
    }

    protected update(dt: number): void {
        this.label.string = "分数：" + Math.trunc(this.score);
    }

    resetScore()
    {
        this.score = 0;
    }

    scoreChange(score:number)
    {
        this.score += score;
    }
}
