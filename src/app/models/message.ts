import { MessageType } from "./messageType";
import * as $ from '../../assets/js/jquery/jquery-3.4.1.js';

export class Message {
    public type: MessageType;
    public title: string;
    public message: string;
    public id: string;
    public action: Function;
    
    constructor(
        type: MessageType,
        title: string,
        message: string,
        id = "modal-message",
        action: Function = (input: string ="")=>void{}
    ) {
        this.type = type;
        this.title = title;
        this.message = message;
        this.id = id;
        this.action = action;
    }

    public getHref(): string{
        return "#" + this.id;
    }

    public getBtnId(): string{
        return "btn-" + this.id;
    }

    public getBtnHideId(): string{
        return "btn-hide-" + this.id;
    }

    public showModal(){
        let mimodal = $('#'+this.getBtnId());
        mimodal.click();
      }

      public hideModal(){
        let mimodal = $('#'+this.getBtnHideId());
        mimodal.click();
      }


}
