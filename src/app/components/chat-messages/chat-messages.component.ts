import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from '../../../assets/js/jquery/jquery-3.4.1.js';

import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store/app.reducers';

import { User } from 'src/app/models/user';

@Component({
  selector: 'chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['../../pages/public-room/public-room.component.css']
})
export class ChatMessagesComponent implements OnInit {

  public loggedUser: User;
  public emojis: string[];
  @Input() userList: any[];
  @Input() mySocketId: string;
  @Input() messages: string[];
  @Input() chatMessage: string;
  @Input() msgAlertActive: boolean;
  @Input() createPrivRoom: Function = () => { };
  @Output() updateMsgAlertActive = new EventEmitter();
  @Output() updateChatMessage = new EventEmitter();
  @Output() sendChatMessage = new EventEmitter();
  @Output() createdPrivRoom = new EventEmitter();

  constructor(private userService: UserService, private store: Store<AppState>) {
    this.loggedUser = new User();
    this.chatMessage = "";
    this.emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "🥹", "😊", "😇", 
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", 
    "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", 
    "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😮‍💨", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", 
    "🥶", "😱", "😨", "😰", "😥", "😓", "🫣", "🤗", "🫡", "🤔", "🫢", "🤭", "🤫", "🤥", "😶", 
    "😶‍🌫️", "😐", "😑", "😬", "🫠", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", 
    "😵", "😵‍💫", "🫥", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", 
    "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", 
    "😼", "😽", "🙀", "😿", "😾", "👋", "🤚", "🖐", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", 
    "🫰", "🤟", "🤘", "🤙", "🫵", "🫱", "🫲", "🫳", "🫴", "👈", "👉", "👆", "🖕", "👇", "☝️", 
    "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🫶", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", 
    "🤳", "💪", "🦾", "🦵", "🦿", "🦶", "👣", "👂", "🦻", "👃", "🫀", "🫁", "🧠", "🦷", "🦴", 
    "👀", "👁", "👅", "👄", "🫦", "💋", "🩸"]
    
  }

  ngOnInit(): void {
    this.store.select('loggedUser').subscribe(loggedUser => {
      this.userService.updateThisLoggedUser(this.loggedUser, loggedUser);
    });
  }

  showPrivateChatOption(): void {
    $('#my_user_menu').slideToggle('fast');
  }

  onKeyDown(event: any) {
    const textarea = $('#chatInput');
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
      //textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');

    }
  }

  public chatMessageUpdate(event: any): void {
    this.updateChatMessage.emit(this.chatMessage);
  }

  public sendMessage() {
    this.sendChatMessage.emit();
    $('#chatInput').focus();
  }


  public toggleMsgAlertActive() {
    this.updateMsgAlertActive.emit();
  }

  public createPrivateRoom() {
    this.showPrivateChatOption();
    let roomID = this.createPrivRoom();
    this.createdPrivRoom.emit(roomID);
  }

  public showModalProfile() {
    $(document).ready(() => {
      $('#togglemp').click();
    });
  }

  public showEmojis(){
    $('#emojis_menu').slideToggle('fast');
  }
  
  public addEmoji(item){
    this.chatMessage = this.chatMessage + item + " ";
    this.updateChatMessage.emit(this.chatMessage);
    $('#emojis_menu').hide('fast');
    $('#chatInput').focus();
    
  }

}
