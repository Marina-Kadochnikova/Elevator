import Elevator from "./Elevator";

export default class Button{
    protected parent: Elevator;
    public readonly floorNumber: number;
    public button: PIXI.Sprite;

    constructor(parent: any, number: number) {
        this.parent = parent;
        this.floorNumber = number;
        this.draw()
    }

    draw() {        
        this.button = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.button.width = 25;
        this.button.height = 25;
        this.button.x = 500;
        this.button.y = 510 - this.floorNumber * 100;
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.on('pointerdown', this.onButtonDown.bind(this));

        let text = new PIXI.Text((this.floorNumber + 1).toString(), { fontFamily: 'Arial', fontSize: 15, fill: 0x000000 });

        this.button.addChild(text);
        window.app.stage.addChild(this.button);
    }

    onButtonDown() { 
        this.parent.controller.ButtonDown(this);
        this.button.tint = 0x98FB98;
    } 
}