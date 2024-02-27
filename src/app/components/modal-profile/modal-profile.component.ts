import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AppState } from '../../store/app.reducers';

import * as $ from '../../../assets/js/jquery/jquery-3.4.1.js';
import { Message } from 'src/app/models/message';
import { MessageType } from 'src/app/models/messageType';
import { LoadLoggedUser } from 'src/app/store/loggeduser.actions';

@Component({
  selector: 'modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css',
    '../modal-message/modal-message.component.css',
    '../../pages/public-room/public-room.component.css'],
    providers: [UserService]
})
export class ModalProfileComponent implements OnInit {

  public loggedUser: User;
  public userData: User;
  public cpass: string;
  public spinner: boolean;
  public updateMessage: Message;
  public images: number[];
  public editAvatar: boolean;
  @Output() profileMessage = new EventEmitter();
  @Output() updateUserData = new EventEmitter();


  constructor(private userService: UserService, private store: Store<AppState>) {
    this.loggedUser = new User();
    this.userData = new User();
    this.cpass = "";
    this.spinner = false;
    this.updateMessage = new Message(MessageType.ALERT, "updateMessage", "updateMessage", "modal-public");
    this.images = new Array;
    for (let index = 1; index < 102; index++) {
      this.images.push(index);
    }
    this.editAvatar = false;
  }
  ngOnInit(): void {
    this.store.select('loggedUser').subscribe(loggedUser => {
      this.userService.updateThisLoggedUser(this.loggedUser, loggedUser);
    });
    this.userData.email = this.loggedUser.email;
    this.userData.username = this.loggedUser.username;
    this.userData.password = this.loggedUser.password;
    this.userData.userState = this.loggedUser.userState;
    this.userData.avatar = this.loggedUser.avatar;
    this.userData.active = this.loggedUser.active;
    this.userData.token = this.loggedUser.token;
    this.userData.loggedIn = this.loggedUser.loggedIn;
    this.userData.authSessionID = this.loggedUser.authSessionID;
    this.userData.authUserID = this.loggedUser.authUserID;
  }

  public updateProfile(e: any) {
    
    this.spinner = true;
    this.updateMessage.type = MessageType.ERROR;
    this.updateMessage.title = "Updating Error";
    try {
      this.userService.updateUser(this.userData).subscribe({
        next: result => {
          this.updateMessage.type = MessageType.SUCCESS;
          this.updateMessage.title = "Successfully updated";
          this.updateMessage.message = "The user info has been updated";
          this.updateMessage.action = () => { this.updateUserData.emit() };
          //this.updateMessage.showModal();
          this.userData.password ="";
          this.cpass = "";
          this.userService.saveUser(this.userData);
          this.store.dispatch(new LoadLoggedUser());
          this.spinner = false;
        }, error: err => {
          this.spinner = false;
          this.updateMessage.type = MessageType.ERROR;
          this.updateMessage.title = "Updating Error";
          this.updateMessage.message = err.error.error ? err.error.error.msg : "Error 500: Server Error";
          this.updateMessage.action = () => { console.error(err) };
          //this.updateMessage.showModal();
        }
      });

    } catch (error) {
      this.spinner = false;
      this.updateMessage.message = "Error 500: Server Error";
      this.updateMessage.action = () => { console.error(error) };
      //this.updateMessage.showModal();
    }
    
    this.profileMessage.emit(this.updateMessage);
    this.updateMessage.showModal();
    $(document).ready(() => {
      let mimodal = $('#mp-btn-close');
      mimodal.click();
  });

  }

  setRequiredPassword() {
    $(document).ready(() => {
      let confirmPassword = $('#pmpswd');
      if (this.loggedUser.password && this.loggedUser.password != "") {
        confirmPassword.required = true;
      }
      else {
        confirmPassword.required = false;
      }
    });
  }

  public switchEditAvatar(){
    this.editAvatar = !this.editAvatar;
  }

  public setNewAvatar(item){
    let source = "../../../assets/imgs/avatar/"
    if (item==="guest"){
      this.userData.avatar = source + item + ".png";
    }else{
      this.userData.avatar = source + "avt" + item + ".png";
    }
    this.editAvatar = false;
  }

}
