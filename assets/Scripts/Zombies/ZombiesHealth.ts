// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import ZombiesGenerator from "./ZombiesGenerator";

// 自定义事件类型
export enum HealthEvent {
    HEALTH_ZERO = "health-zero"        // 血量归零
}

@ccclass
export default class ZombiesHealth extends cc.Component {

     // 最大生命值（编辑器可配置）
    @property({
        displayName: "最大生命值",
        min: 1
    })
    maxHealth: number = 100;

    // 当前生命值（运行时私有变量）
    private _currentHealth: number = 0;

    ZG: ZombiesGenerator;

    // 当前生命值的公共访问器（getter）
    get currentHealth(): number {
        return this._currentHealth;
    }

    onLoad() {
        // 初始化时设置满血
        this.resetHealth();
        this.node.on(HealthEvent.HEALTH_ZERO, () => { 
            this.node.destroy();
        })
    }

    // 重置为满血
    resetHealth() {
        this._currentHealth = this.maxHealth;
    }

    // 受到伤害
    takeDamage(damage: number) {
        if (this._currentHealth <= 0) return; // 已死亡不再处理

        // 计算新血量（不低于0）
        this._currentHealth = Math.max(0, this._currentHealth - damage);

        // 触发血量归零事件
        if (this._currentHealth <= 0) {
            this.node.emit(HealthEvent.HEALTH_ZERO);
        }
    }

    
}
