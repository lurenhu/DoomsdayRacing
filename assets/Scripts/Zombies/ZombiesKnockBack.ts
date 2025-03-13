// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ZombiesKnockBack extends cc.Component {

    @property
    knockbackSpeed: number = 100;

    // 击退持续时间（秒）
    @property
    knockbackDuration: number = 1;

    // 是否正在被击退
    isKnockback: boolean = false;
    // 计时器
    private knockbackTimer: number = 0;

    // 物理刚体组件（需提前挂载 RigidBody）
    private rigidBody: cc.RigidBody;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    }

    update(dt: number) {
        if (!this.isKnockback) return;

        this.knockbackTimer += dt;
        if (this.knockbackTimer >= this.knockbackDuration) {
            this.isKnockback = false;
            if (this.rigidBody) {
                this.rigidBody.linearVelocity = cc.Vec2.ZERO;
            }
        }
    }

    // 外部调用接口
    applyKnockback(attackerPos: cc.Vec2) {
        if (this.isKnockback) return;

        // 计算击退方向
        const enemyPos = this.node.getPosition();
        const direction = enemyPos.sub(attackerPos).normalize();

        // 应用击退效果
        if (this.rigidBody) {
            // 物理引擎方式
            const impulse = direction.mul(this.knockbackSpeed);
            this.rigidBody.applyLinearImpulse(
                impulse,
                this.rigidBody.getWorldCenter(),
                true
            );
        } else {
            // 非物理引擎方式
            const offset = direction.mul(this.knockbackSpeed * 0.016);
            this.node.setPosition(enemyPos.add(offset));
        }

        this.isKnockback = true;
        this.knockbackTimer = 0;
    }
}
