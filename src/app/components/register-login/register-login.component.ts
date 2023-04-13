import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { SetLoggedUser } from 'src/app/store/loggeduser.actions';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { MessageType } from '../../models/messageType';

@Component({
  selector: 'register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css'],
  providers: [UserService]
})
export class RegisterLoginComponent implements OnInit {
  public user: User
  public cpass: string
  public registerMessage: Message
  public href: string = '#modalMessage'
  public spinners: any
  public login: boolean
  public loggedUser: User

  constructor(private userService: UserService, private store: Store<AppState>) {
    this.user = new User();
    this.loggedUser = new User();
    this.cpass = "";
    this.registerMessage = new Message(MessageType.ALERT, "registerMessage", "registerMessage", "modal-reglog");
    this.spinners = { register: false, login: false };
    this.login = false;
  }

  ngOnInit(): void {
    this.store.select('loggedUser').subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    });
  }

  public registerSubmit(): void {
    this.spinners.register = true;
    this.registerMessage.type = MessageType.ERROR;
    this.registerMessage.title = "Registering Error";
    try {
      this.userService.createUser(this.user).subscribe({
        next: result => {
          this.spinners.register = false;
          this.registerMessage.type = MessageType.SUCCESS;
          this.registerMessage.title = "Successfully registered";
          this.registerMessage.message = "Welcome " + this.user.username + "!";
          this.registerMessage.action = () => { console.log("Go to public chat") };
          this.registerMessage.showModal();
          this.setLoggedIn(this.user);

        }, error: err => {
          this.spinners.register = false;
          this.registerMessage.type = MessageType.ERROR;
          this.registerMessage.title = "Registering Error";
          this.registerMessage.message = err.error.error ? err.error.error.msg : "Error 500: Server Error";
          this.registerMessage.action = () => { console.error(err) };
          this.registerMessage.showModal();
        }
      });

    } catch (error) {
      this.spinners.register = false;
      this.registerMessage.message = "Error 500: Server Error";
      this.registerMessage.action = () => { console.error(error) };
      this.registerMessage.showModal();
    }
  }

  loginSubmit() {
    this.spinners.login = true;
    this.registerMessage.type = MessageType.ERROR;
    this.registerMessage.title = "Login Error";
    try {
      this.userService.login(this.user).subscribe({
        next: result => {
          console.log(result);
          this.setLoggedIn(result);
          this.spinners.login = false;
          this.registerMessage.type = MessageType.SUCCESS;
          this.registerMessage.title = "Logged in successfully";
          this.registerMessage.message = "Welcome " + result.username + "!";
          this.registerMessage.action = () => { console.log("Go to public chat") };
          this.registerMessage.showModal();
          

        }, error: err => {
          this.spinners.login = false;
          this.registerMessage.message = "Incorrect email/password";
          this.registerMessage.action = () => { console.error(err) };
          this.registerMessage.showModal();
        }
      });
    } catch (error) {
      this.spinners.login = false;
      this.registerMessage.message = "Error 500: Server Error";
      this.registerMessage.action = () => { console.error(error) };
      this.registerMessage.showModal();
    }
  }

  public showLogin() {
    this.login = !this.login;
  }

  public setLoggedIn(data: any){
    let userData = new User(true);
    userData.email = data.email;
    userData.username = data.username;
    userData.userState = data.userState;
    userData.token = data.token;
    this.store.dispatch(new SetLoggedUser(userData));
    this.userService.saveUser(userData);
  }


}
