// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import ZombiesKnockBack from "../Zombies/ZombiesKnockBack";
import ZombiesHealth from "../Zombies/ZombiesHealth";
import ZombiesAttack from "../Zombies/ZombiesAttack";
import CarHealth from "./CarHealth";

@ccclass
export default class CarAttack extends cc.Component {

    ani: cc.Animation;

    isAttacking: boolean = false;

    damage: number = 50;

    protected onLoad(): void {
        cc.director.getCollisionManager().enabled = true;

        this.ani = this.node.getComponent(cc.Animation);
        this.setButtonEvent("Up");
        this.setButtonEvent("Down");
        this.setButtonEvent("Right");
        this.setButtonEvent("Left");

    }

    setButtonEvent(buttonName: string){
        let btn = cc.find(`Canvas/Buttons/AttackButton/${buttonName}`);
        if (btn) {
            let button = btn.getComponent(cc.Button);
            if (button) {
                btn.on(cc.Node.EventType.TOUCH_END, () => {
                    this.ani.play(btn.name + "Ani");
                });

                btn.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                    this.ani.play(btn.name + "Ani");
                });
            }
                
        }
    }

    setAttackingState(isAttacking: boolean) {
        this.isAttacking = isAttacking;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag !== 1) return;
        
        if (this.isAttacking) {
            cc.log("发生碰撞");
            const ZombiesKB = other.node.getComponent(ZombiesKnockBack);
            const attackPos = this.node.getPosition();
            ZombiesKB.applyKnockback(attackPos);

            cc.log("扣除血量")
            const ZombiesHE = other.node.getComponent(ZombiesHealth);
            ZombiesHE.takeDamage(this.damage);
        }
        else{
            cc.log("被抓住了");
            const ZombiesAT = other.node.getComponent(ZombiesAttack);
            const CarHE = self.node.getComponent(CarHealth);
            CarHE.takeDamage(ZombiesAT.damage);
            other.node.destroy();
        }
        
    }
}
