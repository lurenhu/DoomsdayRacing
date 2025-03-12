// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CarMovement extends cc.Component {

    @property
    moveSpeed: number = 100;
    moveDirection: cc.Vec2 = cc.Vec2.ZERO;
    isMoving: boolean = false;

    protected onLoad(): void {
        this.setButtonEvents("Left", cc.v2(-1, 0));
        this.setButtonEvents("Right", cc.v2(1, 0));
    }

    protected update(dt: number): void {
        if (this.isMoving) {
            let currentPos = this.node.position;

            let movement = new cc.Vec3(this.moveDirection.x, this.moveDirection.y, 0).multiplyScalar(this.moveSpeed * dt);

            this.node.position = currentPos.add(movement);
        }
    }

    setButtonEvents(buttonName: string, direction: cc.Vec2) {
        let btn = cc.find(`Canvas/Buttons/MoveButton/${buttonName}`);
        if (btn) {
            let button = btn.getComponent(cc.Button);
            if (button) {
                // 按下按钮时，开始移动
                btn.on(cc.Node.EventType.TOUCH_START, () => {
                    this.moveDirection = direction;
                    this.isMoving = true;
                });

                // 松开按钮时，停止移动
                btn.on(cc.Node.EventType.TOUCH_END, () => {
                    this.isMoving = false;
                });

                btn.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                    this.isMoving = false;
                });
            }
        }
    }
}
