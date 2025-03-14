// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import BackGround from "../BackGround";
import ScoreManager from "../ScoreManager";

@ccclass
export default class CarSpeed extends cc.Component {

    @property(BackGround)
    bg: BackGround = null;

    fastSpeed: number = 200;
    midSpeed: number = 100;
    slowSpeed: number = 50;

    protected onLoad(): void {
        this.setButtonEvent("Fast");
        this.setButtonEvent("Mid");
        this.setButtonEvent("Slow");
    }

    protected update(dt: number): void {
        ScoreManager.instance.scoreChange(this.bg.speed * dt);
    }

    setButtonEvent(buttonName: string)
    {
        let btn = cc.find(`Canvas/Buttons/SpeedButton/${buttonName}`);
        if (btn) {
            let button = btn.getComponent(cc.Button);
            if (button) {
                // 松开按钮时，停止移动
                btn.on(cc.Node.EventType.TOUCH_END, () => {
                    switch (btn.name) {
                    case "Fast":
                        this.bg.speed = this.fastSpeed;
                        break;
                    case "Mid":
                        this.bg.speed = this.midSpeed;
                        break;
                    case "Slow":
                        this.bg.speed = this.slowSpeed;
                        break;
                    default:
                        cc.log("ButtonName error");
                        break;
                }
                });

                btn.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                    switch (btn.name) {
                    case "Fast":
                        this.bg.speed = this.fastSpeed;
                        break;
                    case "Mid":
                        this.bg.speed = this.midSpeed;
                        break;
                    case "Slow":
                        this.bg.speed = this.slowSpeed;
                        break;
                    default:
                        cc.log("ButtonName error");
                        break;
                }
                });
                
            }
        }
    }
}
