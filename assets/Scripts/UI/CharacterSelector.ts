// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CharacterSelector extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Button)
    btnLeft: cc.Button = null;

    @property(cc.Button)
    btnRight: cc.Button = null;

    @property(cc.Prefab)
    characterPrefab: cc.Prefab = null;

    @property
    spacing: number = 150; // 角色间距

    private currentIndex: number = 0;
    private characters: cc.Node[] = [];
    private maxIndex: number = 0;

    onLoad() {
        this.initCharacters();
        this.scrollToCharacter();
        this.btnLeft.node.on('click', this.prevCharacter, this);
        this.btnRight.node.on('click', this.nextCharacter, this);
    }

    initCharacters() {
        // 示例：创建3个角色（根据实际需求修改）
        for (let i = 0; i < 3; i++) {
            const char = cc.instantiate(this.characterPrefab);
            this.scrollView.content.addChild(char);
            char.setPosition(i * (char.width + this.spacing), 0);
            this.characters.push(char);
        }
        this.maxIndex = this.characters.length - 1;
        this.updateButtons();
    }

    nextCharacter() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.scrollToCharacter();
        }
        this.updateButtons();
    }

    prevCharacter() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.scrollToCharacter();
        }
        this.updateButtons();
    }

    scrollToCharacter() {
        const targetX = this.currentIndex * (this.characters[0].width + this.spacing);
        const maxScroll = this.scrollView.getMaxScrollOffset().x;
        
        // 计算滚动位置（0-1范围）
        const scrollPercent = targetX / maxScroll;
        
        // 使用滚动动画
        this.scrollView.scrollToPercentHorizontal(
            scrollPercent,
            0.5
        );
    }

    updateButtons() {
        this.btnLeft.interactable = this.currentIndex > 0;
        this.btnRight.interactable = this.currentIndex < this.maxIndex;
    }
}
