import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store/app.reducers';
import * as $ from '../../../assets/js/jquery/jquery-3.4.1.js';

import { User } from 'src/app/models/user';

@Component({
  selector: 'chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['../../pages/public-room/public-room.component.css']
})
export class ChatUsersComponent implements OnInit {

  public loggedUser: User;
  public filter: string;
  public privChatMessage: string;
  private showPrivUserMenu: any[];

  @Input() userList: any[];
  @Input() mySocketId: string;
  @Input() privateRoomList: string[];
  @Output() sendPrivateMessage = new EventEmitter();
  @Output() sendPrivateInvitation = new EventEmitter();
  
  

  constructor(private userService: UserService, private store: Store<AppState>) {
    this.loggedUser = new User();
    this.filter = "";
    this.privChatMessage = "";
    this.showPrivUserMenu = [false];
    this.privateRoomList =[];
  }

  ngOnInit(): void {
    this.store.select('loggedUser').subscribe(loggedUser => {
      //this.userService.updateThisLoggedUser(this.loggedUser, loggedUser);
      this.loggedUser = loggedUser;
    });
  }

  getUserList(): any[] {
    let list: any[];
    if (this.filter) {
      list = (this.userList.filter(user =>
        !user.includes(this.loggedUser.authUserID) &&
        user[1].toLowerCase().includes(this.filter.toLowerCase()))
      );
    } else {
      list = (this.userList.filter(user => !user.includes(this.loggedUser.authUserID)));
    }

    return list;
  }

  public getUserMenuId(userId: string): string {
    //userId = userId.replace(/\s+/g, '_spc_');
    return "um-" + userId;

  }

  showPrivateChatOption(userId): void {
    if (this.showPrivUserMenu[0]) {
      if (this.showPrivUserMenu[1] === userId) {
        $('#' + this.getUserMenuId(userId)).slideToggle('fast');
        this.showPrivUserMenu = [false]
      } else {
        $('.action_menu').hide('fast');
        $('#' + this.getUserMenuId(userId)).slideToggle('fast');
        this.showPrivUserMenu = [true, userId];
      }
    } else {
      $('#' + this.getUserMenuId(userId)).slideToggle('fast');
      this.showPrivUserMenu = [true, userId];
    }
  }

  public sendPrivMessage(userId) {
    if (this.privChatMessage.length > 0) {
      this.sendPrivateMessage.emit([userId, this.privChatMessage]);
      // $('#chatInput').focus();
      // this.showPrivateChatOption(userId);
      this.privChatMessage = "";
    }
  }

  onKeyDown(event: any, userId: string) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendPrivMessage(userId);
      //textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');

    }
  }

  public sendInvitation(userId, roomId) {
    this.sendPrivateInvitation.emit([userId, roomId]);
    this.showPrivateChatOption(userId);

}
  

}

