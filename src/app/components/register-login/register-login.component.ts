import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from '../../../assets/js/jquery/jquery-3.4.1.js';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { SetLoggedUser } from 'src/app/store/loggeduser.actions';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { MessageType } from '../../models/messageType';

declare const google: any
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
  

  constructor(private router: Router, private userService: UserService, private store: Store<AppState>) {
    this.user = new User();
    this.loggedUser = new User();
    this.cpass = "";
    this.registerMessage = new Message(MessageType.ALERT, "registerMessage", "registerMessage", "modal-reglog");
    this.spinners = { register: false, login: false, google: false };
    this.login = true;
  }

  ngOnInit(): void {
    
    google.accounts.id.initialize({
      client_id: "185459449205-qe68d3b1i5adb231jh3iron7ocm21m84.apps.googleusercontent.com",
      context: "signin",
      ux_mode: "popup",
      callback: this.handleCredentialResponse,
      close_on_tap_outside: "false",
      
    });

    google.accounts.id.renderButton(
      document.getElementById("google-sign-btn"),
      {
        class: "g_id_signin",
        type: "standard",
        shape: "rectangular",
        theme: "filled_black",
        text: "signin_with",
        size: "large",
        logo_alignment: "left",
        locale: "en"
      }  // customization attributes
    );
    
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
          // this.spinners.register = false;
          // this.registerMessage.type = MessageType.SUCCESS;
          // this.registerMessage.title = "Successfully registered";
          // this.registerMessage.message = "Welcome " + this.user.username + "!";
          // this.registerMessage.action = () => { 
          //   this.router.navigate(['/rooms/public']); 
          // };
          // this.registerMessage.showModal();
          // this.setLoggedIn(this.user);
          this.loginSubmit();

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

  public loginSubmit() {
    this.spinners.login = true;
    this.registerMessage.type = MessageType.ERROR;
    this.registerMessage.title = "Login Error";
    try {
      this.userService.login(this.user).subscribe({
        next: result => {
          this.setLoggedIn(result);
          this.spinners.login = false;
          this.registerMessage.type = MessageType.SUCCESS;
          this.registerMessage.title = "Logged in successfully";
          this.registerMessage.message = "Welcome " + result.username + "!";
          this.registerMessage.action = () => {
            this.router.navigate(['/rooms/public']);
          };
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
    this.login = true;
  }

  public setLoggedIn(data: any) {
    let userData = new User(true);
    userData.email = data.email;
    userData.username = data.username;
    userData.userState = data.userState;
    userData.avatar = data.avatar;
    userData.token = data.token;
    this.store.dispatch(new SetLoggedUser(userData));
    this.userService.saveUser(userData);
  }

  public togglePrivacyStatement() {
    $(document).ready(() => {
      let privstate = $('.policy-statement-div');
      privstate.toggle('normal');
    });
  }


  public handleCredentialResponse(data) {
    let btnGoogleSign = document.getElementById("registrar");
    btnGoogleSign.setAttribute("token", data.credential);
    btnGoogleSign.removeAttribute("style");
    btnGoogleSign.click();

  }

  public googleLogin() {
    this.spinners.register = true;
    document.getElementById("google-sign-btn").setAttribute("style", "display:none");
    let btnGoogleSign = document.getElementById("registrar");
    let token = btnGoogleSign.getAttribute("token");
    btnGoogleSign.removeAttribute("token");
    btnGoogleSign.setAttribute("disabled", "disabled");

    this.registerMessage.type = MessageType.ERROR;
    this.registerMessage.title = "Login Error";
    try {
      this.userService.loginGoogle(token).subscribe({
        next: result => {
          this.setLoggedIn(result);
          this.spinners.register = false;
          this.registerMessage.type = MessageType.SUCCESS;
          this.registerMessage.title = "Logged in successfully";
          this.registerMessage.message = "Welcome " + result.username + "!";
          this.registerMessage.action = () => {
            this.router.navigate(['/rooms/public']);
          };
          this.registerMessage.showModal();

        }, error: err => {
          this.spinners.register = false;
          this.registerMessage.message = "Incorrect email/password";
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

}
