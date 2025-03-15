// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import ScoreManager from "../ScoreManager";
import GameResult from "../UI/GameResult";

// 自定义事件类型
export enum CarHealthEvent {
    HEALTH_CHANGED = "health-changed",
    HEALTH_ZERO = "health-zero"        // 血量归零
}
@ccclass
export default class CarHealth extends cc.Component {

     // 最大生命值（编辑器可配置）
    @property({
        displayName: "最大生命值",
        min: 1
    })
    maxHealth: number = 100;

    // 当前生命值（运行时私有变量）
    private _currentHealth: number = 0;

    @property(cc.Label)
    healthLabel: cc.Label = null;

    // 当前生命值的公共访问器（getter）
    get currentHealth(): number {
        return this._currentHealth;
    }

    onLoad() {
        // 初始化时设置满血
        this.resetHealth();
        this.node.on(CarHealthEvent.HEALTH_ZERO, () => { 
            let gR = cc.find("GameResult");
            let sM = cc.find("ScoreManager").getComponent(ScoreManager);
            gR.active = true;
            gR.getComponent(GameResult).setResultScore(sM.score);
            this.node.destroy();
        })

        this.node.on(CarHealthEvent.HEALTH_CHANGED,this.updateUI,this);
            
    }

    protected onDestroy(): void {
        this.node.off(CarHealthEvent.HEALTH_ZERO, () => { 
            let gR = cc.find("GameResult");
            let sM = cc.find("ScoreManager").getComponent(ScoreManager);
            gR.active = true;
            gR.getComponent(GameResult).setResultScore(sM.score);
            this.node.destroy();
        })

        this.node.off(CarHealthEvent.HEALTH_CHANGED, this.updateUI, this);
    }

    updateUI(event: { current: number, max: number }) {
        if (this.healthLabel) {
            this.healthLabel.string = "血量：" + `${event.current}/${event.max}`;
        }
    }

    // 重置为满血
    resetHealth() {
        this._currentHealth = this.maxHealth;
        this.emitHealthChanged();
    }

    // 受到伤害
    takeDamage(damage: number) {
        if (this._currentHealth <= 0) return; // 已死亡不再处理

        // 计算新血量（不低于0）
        this._currentHealth = Math.max(0, this._currentHealth - damage);
        this.emitHealthChanged();

        // 触发血量归零事件
        if (this._currentHealth <= 0) {
            this.node.emit(CarHealthEvent.HEALTH_ZERO);
        }
    }

    // 恢复生命值
    heal(amount: number) {
        this._currentHealth = Math.min(this.maxHealth, this._currentHealth + amount);
        this.emitHealthChanged();
    }
    
    // 触发血量变化事件
    private emitHealthChanged() {
        this.node.emit(CarHealthEvent.HEALTH_CHANGED, {
            current: this._currentHealth,
            max: this.maxHealth
        });
    }
}
