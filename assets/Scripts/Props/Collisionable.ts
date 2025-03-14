// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import CarHealth from "../Car/CarHealth";
import BackGround from "../BackGround";

@ccclass
export default class Collisionable extends cc.Component {

    @property
    damage: number = 10;

    bg: BackGround;

    protected onLoad(): void {
        this.bg = cc.find("BackGround").getComponent(BackGround);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider)
    {
        if (other.tag == 0) {
            other.node.getComponent(CarHealth).takeDamage(this.damage);
            this.bg.speed = 50;
            this.node.destroy();
        }
    }
    
}
