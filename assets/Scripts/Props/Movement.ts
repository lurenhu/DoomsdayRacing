// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Movement extends cc.Component {
    scrHeight: number;
    speed: number = 0;

    protected onLoad(): void {
        this.scrHeight = cc.view.getCanvasSize().height;
    }

    protected update(dt: number): void {
        this.node.y -= this.speed * dt;
        if (this.node.y < -this.scrHeight) {
            this.node.destroy();
        }
    }
}
