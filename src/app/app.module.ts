import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicRoomComponent } from './pages/public-room/public-room.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { SpinnerButtonComponent } from './components/spinner-button/spinner-button.component';
import { loggedUserReducer } from './store/loggeduser.reducer';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LoggedUserEffects } from './store/loggeduser.effects';
import { ChatUsersComponent } from './components/chat-users/chat-users.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ModalProfileComponent } from './components/modal-profile/modal-profile.component';
import { AboutComponent } from './pages/about/about.component';
import { Error404Component } from './pages/error404/error404.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicRoomComponent,
    RegisterLoginComponent,
    MatchPasswordDirective,
    ModalMessageComponent,
    SpinnerButtonComponent,
    NavMenuComponent,
    ChatUsersComponent,
    ChatMessagesComponent,
    ModalProfileComponent,
    AboutComponent,
    Error404Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({loggedUser: loggedUserReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    EffectsModule.forRoot([LoggedUserEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
