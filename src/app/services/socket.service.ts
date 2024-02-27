import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

import { Subject } from 'rxjs';
import { config } from '../models/config';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  public socket: any;
  private urls: string;
  private mySocketId = new Subject<any>();
  private userList = new Subject<any>();
  private messages = new Subject<any>();

  constructor() {
    this.urls = config.URLS;

  }

  ngOnInit(): void {
    

  }

  startSocket(loggedUser: User, room: string): void {
    this.socket = io.io(this.urls);
    this.setAuthData(loggedUser, room)
    this.onConnect();
    this.onMyConnectionId();
    this.onUserList();
    this.onMessages();
  }

  private onConnect(): void {
    this.socket.on('connect', function () {
      console.log('Connected to server');
    });
  }

  private onMyConnectionId(){
    this.socket.on('myConnectionId', (data: any) => {
      this.mySocketId.next(data);
    });
  }

  private onUserList(){
    this.socket.on('userList', (data: any) => {
      this.userList.next(data);
    });
  }
  
  private onMessages(){
    this.socket.on('messages', (data: any) => {
      this.messages.next(data);
    });
  }


  public emitUserData(loggedUser: User): void {
    this.socket.emit('userData', loggedUser.getConnectionData());
  }

  
  public getSocket() {
    return this.mySocketId.asObservable();

  }

  public getUserList(){
    return this.userList.asObservable();
  }

  public getMessages(){
    return this.messages.asObservable();
  }

  public emitMessage(newMessage: string[]): void {
    this.socket.emit('addMessage', newMessage);
  }

  public emitPrivMessage(newMessage: string[]): void {
    this.socket.emit('addPrivMessage', newMessage);
  }

  public setSocketId(socketId){
    this.socket.id = socketId;
  }

  public setAuthData(user: User, room: string): void {
    this.socket.auth = {
      'sessionID': user.authSessionID,
      'userID': user.authUserID,
      'room': user.email ? room : "public"
    }
  }

  

}
