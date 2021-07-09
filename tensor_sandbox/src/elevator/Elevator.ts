import Cabin from "./Cabin";
import Button from "./Button";
import Controller from "./Controller";
import Building from "./building";

export default class Elevator{
    public building: Building;
    public cabin: Cabin;
    public buttons: Button[];
    public controller: Controller;

    constructor() {
        this.building = new Building(this);
        this.buttons = this.createButton();
        this.cabin = new Cabin(this);
        this.controller = new Controller(this);
    }

    createButton(){
        let result: Button[] = [];
        for (let i = 0; i < 5; i++) {
            result.push(new Button(this, i))
        }
        return result;
    }
}