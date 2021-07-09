import Elevator from "./Elevator";

export default class Building{
    protected parent : Elevator;
    public building: PIXI.Graphics;

    constructor(parent: any) {
        this.parent = parent;
        this.draw();
    }

    draw(){
        const background = PIXI.Sprite.from('assets/background.png');
        background.position.set(350, 40);
        background.width = 800;
        background.height = 700;
        window.app.stage.addChild(background);

        const floors = new PIXI.Graphics();
        floors.lineStyle(6, 0x4682B4, 1);
        for (let i = 0; i < 5; i++){
            floors.moveTo(0, i * 100);
            floors.lineTo(600, i * 100);
        }
        floors.position.x = 500;
        floors.position.y = 200; 
        window.app.stage.addChild(floors);
    }
}