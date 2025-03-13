// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ZombiesGenerator extends cc.Component {

    minRadius: number = 250;
    maxRadius: number = 400;
    @property(cc.Prefab)
    Zombies: cc.Prefab = null;

    debugDraw: boolean = true;

    private graphics: cc.Graphics = null;

    @property
    interval: number = 5;

    onLoad() {
        // 初始化调试绘制
        if (this.debugDraw) {
            this.graphics = this.node.addComponent(cc.Graphics);
            this.drawSpawnArea();
        }

        // 初始生成敌人
        this.startSpawnWave(this.interval);
    }

     // 生成单个敌人
    private spawnSingleEnemy() {
        if (!this.Zombies) return;

        // 获取随机位置（极坐标系）
        const randomPos = this.getRandomPositionInCircle();
        
        // 创建敌人实例
        const enemy = cc.instantiate(this.Zombies);
        enemy.parent = this.node.parent; // 根据实际层级调整
        enemy.setPosition(
            this.node.x + randomPos.x,
            this.node.y + randomPos.y
        );
    }

    startSpawnWave(interval: number) {
        this.schedule(() => {
            this.spawnSingleEnemy();
        }, interval);
    }

    private drawSpawnArea() {
        if (!this.graphics) return;
        
        this.graphics.clear();
        
        // 绘制外圆（最大半径）
        this.graphics.strokeColor = cc.Color.RED;
        this.graphics.lineWidth = 2;
        this.graphics.circle(0, 0, this.maxRadius);
        this.graphics.stroke();
        
        // 绘制内圆（最小半径）
        this.graphics.strokeColor = cc.Color.GREEN;
        this.graphics.circle(0, 0, this.minRadius);
        this.graphics.stroke();
    }

    private getRandomPositionInCircle(): cc.Vec2 {
        // 计算有效生成范围
        const validRadius = this.maxRadius - this.minRadius;
        
        // 极坐标系参数（确保均匀分布）
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * validRadius + this.minRadius;

        // 转换为笛卡尔坐标
        return cc.v2(
            radius * Math.cos(angle),
            radius * Math.sin(angle)
        );
    }
}
