import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store/app.reducers';
import * as LoggerUserActions from 'src/app/store/loggeduser.actions';

import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';
import { MessageType } from 'src/app/models/messageType';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'public-room',
  templateUrl: './public-room.component.html',
  styleUrls: ['./public-room.component.css']
})
export class PublicRoomComponent implements OnInit, OnDestroy {

  public loggedUser: User;
  public loggedUserSubs: Subscription;
  public message: Message;
  public userList: any[];
  public userListSubs: Subscription;
  public messages: any[];
  public messagesSubs: Subscription;
  public chatMessage: string;
  public mySocketId: string;
  public mySocketIdSubs: Subscription;
  private socket: any;
  public msgAlertActive: boolean;
  public room: string;
  public roomSubs: Subscription;
  public privateRoomList: string[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private socketService: SocketService,
              private store: Store<AppState>
              ) {
    this.loggedUser = new User();
    this.message = new Message(MessageType.ALERT, "Message", "Message", "modal-public");
    this.userList = [];
    this.messages = [];
    this.mySocketId = "";
    this.chatMessage = "";
    this.msgAlertActive = true;
    this.room = "public";
    this.privateRoomList = [];
  }

  ngOnInit(): void {

    this.roomSubs = this.route.params.subscribe((params: Params) => {
      this.room = params['roomName'];
    });

    this.loggedUserSubs = this.store.select('loggedUser').subscribe(loggedUser => {
      this.userService.updateThisLoggedUser(this.loggedUser, loggedUser);
    });

    if (!this.loggedUser.email) {
      this.room = 'public';
    }

    if (!this.loggedUser.islogged()) {
      this.message.type = MessageType.INPUT;
      this.message.title = "A Name is required!";
      this.message.message = "This name will be shown in the chatroom and visible for other users.";
      this.message.action = (name) => {
        if (name && name.length > 0) {
          this.loggedUser.username = name;
          this.userService.saveUser(this.loggedUser);
          this.store.dispatch(new LoggerUserActions.LoadLoggedUser());
          this.startSocket();
        }
      };
      this.message.showModal();
    } else {
      this.startSocket();
    }
  }


  //SOCKET------------------------
  private startSocket(): void {
    this.socketService.startSocket(this.loggedUser, this.room);
    this.socketService.emitUserData(this.loggedUser);
    this.mySocketIdSubs = this.socketService.getSocket().subscribe(data => {
      this.mySocketId = this.loggedUser.authUserID;
      this.socketService.setSocketId(this.mySocketId);
    });
    this.userListSubs = this.socketService.getUserList().subscribe(data => {
      this.userList = data[this.room] || [];   //si data[this.room] no es nulo entonces toma su valor
      this.privateRoomList.map((roomId)=>{
        if (data[roomId] && data[roomId].length===0) {
          this.privateRoomList = this.privateRoomList.filter((room)=> room!=roomId);
        }
      });

    });
    this.messagesSubs = this.socketService.getMessages().subscribe(data => {
      let userMessageData = this.userList.filter(user => user[0] == data[0])
      let newMessage = [
        ...userMessageData[0],
        data[1],
        this.getCurrentTime(),
        data[2],
        data[3],
        data[4] ? this.userList.filter(user => user[0] == data[4])[0][1] : null
      ]
      if (newMessage[6] === this.room) {
        this.messages.push(newMessage);
        if (newMessage[0] != this.mySocketId) this.messageAlert();
        this.scrollDown();
      }
    });
  }


  ngOnDestroy() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
      console.log("desconectado");
    }
    this.roomSubs.unsubscribe();
    this.loggedUserSubs.unsubscribe();
    if (this.mySocketIdSubs) {this.mySocketIdSubs.unsubscribe()};
    if (this.userListSubs) this.userListSubs.unsubscribe();
    if (this.messagesSubs) this.messagesSubs.unsubscribe();
  }

  public setMySocketId(data) {
    this.mySocketId = data;
  }

  public setChatMessage(event: any): void {
    this.chatMessage = event;
  }

  public sendMessage() {
    if (this.chatMessage.length > 0) {
      let newMessage = [this.loggedUser.authUserID, this.chatMessage, this.room, 'pub'];
      this.socketService.emitMessage(newMessage);
      this.chatMessage = "";
    }
  }

  public sendPrivateMessage(event: any) {

    if (event[1].length > 0) {
      let newMessage = [this.loggedUser.authUserID, event[1], this.room, 'pri', event[0]];
      this.socketService.emitPrivMessage(newMessage);
    }
  }


  public scrollDown() {
    const messagesContainer = document.getElementById('msgContainer');
    if (messagesContainer) {
      const scrollHeight = messagesContainer.scrollHeight;
      const clientHeight = messagesContainer.clientHeight;
      const paddingBottom = parseInt(getComputedStyle(messagesContainer).paddingBottom);
      messagesContainer.scrollTop = scrollHeight - clientHeight + paddingBottom + 0.1 * clientHeight;
    }

  }

  public toggleMsgAlertActive() {
    this.msgAlertActive = (!this.msgAlertActive);
  }

  private messageAlert() {
    if (this.msgAlertActive) {
      const msgAlert = document.getElementsByTagName('audio');
      msgAlert[0].setAttribute("src", "../../../assets/audio/message.mp3");
      msgAlert[0].play();
    }
  }

  private getCurrentTime() {
    let currentTime = new Date();
    return currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  }

  // public generatePrivateRoomId(): string {
  //   let roomID = this.loggedUser.generateRandomString();
  //   return roomID.substring(0,4) + "-" + roomID.substring(4,7) + "-"  + roomID.substring(7,11);
  // }

  public createPrivRoom(): string {
    let generatePrivateRoomId = () => {
      let roomID = this.loggedUser.generateRandomString();
      roomID = roomID.substring(0, 4) + "-" + roomID.substring(4, 7) + "-" + roomID.substring(7, 11);
      return roomID
    }
    let roomID = generatePrivateRoomId();
    window.open('/rooms/' + roomID, '_blank');
    return roomID;
  }

  public setPrivateRoomList(event){
    this.privateRoomList = [...this.privateRoomList, event]
  }

  public sendPrivateInvitation(event){
    let newMessage = [this.loggedUser.authUserID, event[1], this.room, 'inv', event[0]];
    this.socketService.emitPrivMessage(newMessage);
  }

  public updateMessage(event: any){
    this.message = event;
  }

  public updateUserData(){
    this.socketService.emitUserData(this.loggedUser);
  }

}
