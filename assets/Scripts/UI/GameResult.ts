// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CarHealth, { CarHealthEvent } from "../Car/CarHealth";
import ScoreManager from "../ScoreManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameResult extends cc.Component {

    private static _instance: GameResult = null;
    public static get instance(): GameResult {
        return this._instance;
    }

    onLoad() {
        if (GameResult._instance === null) {
            GameResult._instance = this;
        } else {
            this.node.destroy();
            cc.warn("GameResult 已存在，禁止重复创建");
        }
    }

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    gameResult:cc.Node = null

    @property(cc.Node)
    Car: cc.Node = null;

    getResultMenu()
    {
        this.gameResult.active = true;
    }

    setResultScore(score:number)
    {
        this.label.string = "分数：" + Math.trunc(score);
    }

    gameEnd()
    {
        ScoreManager.instance.resetScore();
        cc.director.loadScene("StartScene");
    }
}
