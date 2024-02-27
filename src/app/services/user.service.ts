import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user'
import { config } from '../models/config';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = config.URL
  }

  public createUser(user: User): Observable<any> {
    let data = JSON.stringify(user.getRegister());
    let headers = new HttpHeaders().set('Content-Type', 'application/json');   //tambien se puede usar append para agregar mas headers
    return this.http.post(this.url + '/user', data, { headers: headers });
  }

  public login(user: User): Observable<any> {
    let data = JSON.stringify(user.getLogin());
    let headers = new HttpHeaders().set('Content-Type', 'application/json');   //tambien se puede usar append para agregar mas headers
    return this.http.post(this.url + '/login', data, { headers: headers });
  }

  public loginGoogle(token: string): Observable<any> {
    let data = {"token": token};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');   //tambien se puede usar append para agregar mas headers
    return this.http.post(this.url + '/login/google', data, { headers: headers });
  }

  public updateUser(user: User): Observable<any> {
    let data = JSON.stringify(user.getUpdate());
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('Authorization','Bearer ' + user.token);
    return this.http.patch(this.url + '/user', data, { headers: headers });
  }

  public logout(): void {
    try {
      localStorage.removeItem('loggedUser');
    } catch (error) {
      console.error(error);
    }
  }

  public saveUser(user: User): boolean {
    try {
      let saveData = {
        email: user.email,
        username: user.username,
        userState: user.userState,
        avatar: user.avatar,
        token: user.token,
        authSessionID: user.authSessionID,
        authUserID: user.authUserID
      }
      localStorage.setItem('loggedUser', JSON.stringify(saveData));
      return true;
    } catch (error) {
      return false;
    }
  }

  public loadUser(): Observable<User>{
    try {
      if (localStorage.getItem('loggedUser') !== null) {
        let savedData = localStorage.getItem('loggedUser');
        let loadedData = JSON.parse(savedData);
        let loadedUser = new User(true);
        loadedUser.email = loadedData.email;
        loadedUser.username = loadedData.username;
        loadedUser.userState = loadedData.userState;
        loadedUser.avatar = loadedData.avatar;
        loadedUser.token = loadedData.token;
        loadedUser.authSessionID = loadedData.authSessionID;
        loadedUser.authUserID = loadedData.authUserID;
        return of(loadedUser);
      } else {
        return of(new User());
      }
    } catch (error) {
      return of(new User());
    }
  }

  public updateThisLoggedUser(thisLoggedUser: User, newLoggedUser: User){
    thisLoggedUser.email = newLoggedUser.email;
    thisLoggedUser.username = newLoggedUser.username;
    thisLoggedUser.password = newLoggedUser.password;
    thisLoggedUser.userState = newLoggedUser.userState;
    thisLoggedUser.avatar = newLoggedUser.avatar;
    thisLoggedUser.active = newLoggedUser.active;
    thisLoggedUser.token = newLoggedUser.token;
    thisLoggedUser.loggedIn = newLoggedUser.loggedIn;
    thisLoggedUser.authSessionID = newLoggedUser.authSessionID;
    thisLoggedUser.authUserID = newLoggedUser.authUserID;
  }


}
