// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import ZombiesKnockBack from "./ZombiesKnockBack";

@ccclass
export default class ZombiesMovement extends cc.Component {

    target: cc.Node;
    zombiesKB: ZombiesKnockBack;
    @property
    moveSpeed: number = 1;

    protected onLoad(): void {
        this.target = cc.find("Car");
        this.zombiesKB = this.node.getComponent(ZombiesKnockBack);
    }

    // 每帧更新敌人位置
    update(deltaTime: number) {
        if (!this.target || this.zombiesKB.isKnockback) return; // 确保主角节点已赋值

        // 计算敌人与主角之间的方向向量
        const enemyPos = this.node.position;
        const targetPos = this.target.position;
        const direction = new cc.Vec3();
        cc.Vec3.subtract(direction, targetPos, enemyPos); // 方向 = 目标位置 - 自身位置
        direction.normalize(); // 归一化方向向量

        // 根据速度和帧时间计算移动距离
        const moveDistance = direction.multiplyScalar(this.moveSpeed * deltaTime);
        const newPos = enemyPos.add(moveDistance);

        // 更新敌人位置
        this.node.setPosition(newPos);
    }
}
