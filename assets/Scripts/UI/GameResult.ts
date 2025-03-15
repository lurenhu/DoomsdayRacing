// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ScoreManager from "../ScoreManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameResult extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    setResultScore(score:number)
    {
        this.label.string = "分数：" + Math.trunc(score);
    }

    gameEnd()
    {
        cc.director.loadScene("StartScene");
    }
}
