// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import CarHealth from "../Car/CarHealth";

@ccclass
export default class Comp extends cc.Component {

    @property
    health: number = 10;

    onCollisionEnter(other: cc.Collider, self: cc.Collider)
    {
        if (other.tag == 0) {
            let carHealth = other.node.getComponent(CarHealth);
            carHealth.heal(this.health);
            this.node.destroy();
        }
    }
}
