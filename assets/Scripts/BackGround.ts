// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackGround extends cc.Component {
    scrWeight: number;
    scrHeight: number;
    bgs: cc.Node[];

    @property
    speed: number = 100;

    protected onLoad(): void {
        this.scrWeight = cc.view.getCanvasSize().width;
        this.scrHeight = cc.view.getCanvasSize().height;
        this.bgs = this.node.children;
    }

    protected update(dt: number): void {
        this.bgs[0].y -= this.speed * dt;
        this.bgs[1].y -= this.speed * dt;
        
        if (this.bgs[0].y < - this.scrHeight) {
            this.bgs[0].y = this.bgs[1].y + this.bgs[1].height;
        }

        if (this.bgs[1].y < - this.scrHeight) {
            this.bgs[1].y = this.bgs[0].y + this.bgs[0].height;
        }
    }

}
