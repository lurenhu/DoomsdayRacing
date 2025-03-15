// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ScoreManager from "../ScoreManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartGame extends cc.Component {

    gameStart()
    {
        cc.director.loadScene("Mainscene", () => {
            cc.log("加载Main场景");
        });
    }
}
