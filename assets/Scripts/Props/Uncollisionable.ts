// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CarHealth from "../Car/CarHealth";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Uncollisionable extends cc.Component {

    @property
    damage: number = 10;

    onCollisionEnter(other: cc.Collider, self: cc.Collider)
    {
        if (other.tag == 0) {
            cc.log("游戏结束");
        }
    }
}
