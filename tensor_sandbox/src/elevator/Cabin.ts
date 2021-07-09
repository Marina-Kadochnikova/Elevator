import Elevator from "./Elevator";

export default class Cabin{
    protected parent : Elevator;
    public cabin: PIXI.Graphics;

    constructor(parent: any) {
        this.parent = parent;
        this.draw();
    }

    draw() {
        this.cabin = new PIXI.Graphics();
        this.cabin.beginFill(0x2F4F4F);
        this.cabin.drawRect(0, 0, 50, 100);
        this.cabin.x = 450;
        this.cabin.y = 500;
        this.cabin.endFill();
        window.app.stage.addChild(this.cabin);
    }
}