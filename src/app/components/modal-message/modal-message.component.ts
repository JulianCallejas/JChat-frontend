import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageType } from 'src/app/models/messageType';

@Component({
  selector: 'modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {
  @Input() message: Message
  public SUCCESS: MessageType
  public ERROR: MessageType
  public ALERT: MessageType
  public INPUT: MessageType
  public CONFIRM: MessageType
  public input: string


  constructor() {
    this.SUCCESS = MessageType.SUCCESS;
    this.ERROR = MessageType.ERROR;
    this.ALERT = MessageType.ALERT;
    this.INPUT = MessageType.INPUT;
    this.CONFIRM = MessageType.CONFIRM;
    this.input = "";
  }

  ngOnInit(): void {

  }

  public getMessageClass() {
    switch (this.message.type) {
      case MessageType.SUCCESS:
        return 'modal fade modal-bg-success'
      case MessageType.ERROR:
        return 'modal fade modal-bg-error'
      case MessageType.ALERT:
        return 'modal fade modal-bg-alert'
      case MessageType.INPUT:
      case MessageType.CONFIRM:
        return 'modal fade modal-bg-confirm'
      default: return 'modal fade modal-bg-error'
    }
  }
   
  public getTitleClass() {
      switch (this.message.type) {
        case MessageType.SUCCESS:
          return 'modal-header modal-message-bg-success'
        case MessageType.ERROR:
          return 'modal-header modal-message-bg-error'
        case MessageType.ALERT:
          return 'modal-header modal-message-bg-alert'
        case MessageType.INPUT:
        case MessageType.CONFIRM:
          return 'modal-header modal-message-bg-confirm'
        default: return 'modal fade modal-bg-error'
      }
    }
    public runAction(){
      if (this.message.type === MessageType.INPUT) {
        this.message.action(this.input);
      }else{
        this.message.action();
      }
      this.message.hideModal();
    }
    
}
