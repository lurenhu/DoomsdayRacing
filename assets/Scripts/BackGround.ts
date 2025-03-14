// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Movement from "./Props/Movement";

const {ccclass, property} = cc._decorator;

interface PrefabConfig {
    weight: number;  // 生成权重
    prefab: cc.Prefab;
}

@ccclass
export default class BackGround extends cc.Component {
    scrWeight: number;
    scrHeight: number;
    bgs: cc.Node[];

    @property
    speed: number = 100;

    @property({
        type: [cc.Prefab],
        displayName: "预制体列表"
    })
    prefabList: cc.Prefab[] = [];

    @property
    interval: number = 100;
    
    // X轴随机范围
    @property({ min: -1000, max: 1000 })
    minX: number = -200;

    @property({ min: -1000, max: 1000 })
    maxX: number = 200;

    // 固定Y坐标
    @property
    fixedY: number = 100;

    protected onLoad(): void {
        this.scrWeight = cc.view.getCanvasSize().width;
        this.scrHeight = cc.view.getCanvasSize().height;
    }
    
    protected start(): void {
        this.schedule(() => {
            let pre = this.getRandomPrefab()
            let node = cc.instantiate(pre);
            node.setParent(this.node);
            // 计算随机X坐标（区间内均匀分布）
            const randomX = this.minX + Math.random() * (this.maxX - this.minX);
            node.setPosition(cc.v2(randomX, this.fixedY));
        },this.interval)
    }

    protected update(dt: number): void {
        this.bgs = this.node.children;

        this.bgs[0].y -= this.speed * dt;
        this.bgs[1].y -= this.speed * dt;
        
        if (this.bgs[0].y < - this.scrHeight) {
            this.bgs[0].y = this.bgs[1].y + this.bgs[1].height;
        }

        if (this.bgs[1].y < - this.scrHeight) {
            this.bgs[1].y = this.bgs[0].y + this.bgs[0].height;
        }
        
        for (const child of this.bgs) {
            let moveComp = child.getComponent(Movement);
            if (moveComp) {
                moveComp.speed = this.speed;
            }
        }
        
    }

    getRandomPrefab(): cc.Prefab | null {
        if (!this.prefabList || this.prefabList.length === 0) return null;
        const index = Math.floor(Math.random() * this.prefabList.length);
        return this.prefabList[index];
    }

}
