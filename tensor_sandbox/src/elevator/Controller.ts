import Elevator from "./Elevator";
import Button from "./Button";


export default class Controller{
    protected parent: Elevator;
    private firstFloor: Button;
    private currentFloor: Button;
    public queueUp: Button[];
    public queueDown: Button[];
    private task: Button;
    private goUp: boolean;
    private onNeedFloor: boolean;


    constructor(parent: any) {
        this.parent = parent;
        this.firstFloor = this.parent.buttons[0];
        this.currentFloor = this.parent.buttons[0];
        this.queueUp = [];
        this.queueDown = [];
        this.onNeedFloor = false;
        this.goUp = true;
        this.start();
    }

    ButtonDown(button: Button){
        if(!this.queueDown.includes(button) && !this.queueUp.includes(button)){
            if (button.button.y < this.parent.cabin.cabin.y){
                this.queueUp.splice(this.getPosition(this.queueUp, button, true), 0, button);
            } else {
                this.queueDown.splice(this.getPosition(this.queueDown, button, true), 0, button);
            }
        }
    }

    getPosition(queue: Button[], button: Button, up: boolean){
        for (let i = 0; i < queue.length; i++){
            if(up){
                if (queue[i].floorNumber < button.floorNumber){ 
                    return i;
                }
            } else if (queue[i].floorNumber < button.floorNumber){
                return i;
            }
        }
         return queue.length;
    }

    public currentQueue(): Button[]{
        if (this.goUp){
            return this.queueUp;
        } else{
            return this.queueDown;
        }
    }

    chooseDirection(){
        if (this.queueUp.length === 0){
            this.goUp = false;
        } else if (this.queueDown.length === 0){
            this.goUp = true;
        } else{
            this.goUp = false;
        }

        if (this.queueDown.length == 0 && !this.goUp ){
            this.currentQueue().push(this.firstFloor)
        }
    }

    start() {
        window.app.ticker.add((dt) => {
            this.chooseDirection();
            this.task = this.currentQueue()[0];

            if (this.currentQueue().length != 0 && !this.onNeedFloor ) {
                this.update(dt);
            }

            if (Math.round(this.parent.cabin.cabin.y) === this.task.button.y - 10) {    
                this.onNeedFloor = true;
                this.currentFloor = this.task;
                this.task.button.tint = 0xffffff;
                setTimeout(()=> {this.onNeedFloor = false; }, 1000);
                this.currentQueue().shift();
            }     
        });
    }

    update(dt: any) {
        if(this.task.button.y > this.currentFloor.button.y){
            this.parent.cabin.cabin.y += dt;
        } 
        if (this.task.button.y < this.currentFloor.button.y){
            this.parent.cabin.cabin.y -=dt;
        }
    }
}