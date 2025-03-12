// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CarAttack extends cc.Component {

    ani: cc.Animation;

    protected onLoad(): void {
        this.ani = this.node.getComponent(cc.Animation);
        this.setButtonEvent("Up");
        this.setButtonEvent("Down");
        this.setButtonEvent("Right");
        this.setButtonEvent("Left");

    }

    setButtonEvent(buttonName: string)
    {
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
}
