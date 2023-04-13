import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        token: user.token
      }
      localStorage.setItem('loggedUser', JSON.stringify(saveData));
      return true;
    } catch (error) {
      return false;
    }
  }

  public loadUser(): User{
    try {
      if (localStorage.getItem('loggedUser') !== null) {
        let savedData = localStorage.getItem('loggedUser');
        let loadedData = JSON.parse(savedData);
        let loadedUser = new User(true);
        loadedUser.email = loadedData.email;
        loadedUser.username = loadedData.username;
        loadedUser.userState = loadedData.userState;
        loadedUser.token = loadedData.token;
        return loadedUser;
      } else {
        return new User();
      }
    } catch (error) {
      return new User();
    }
  }


}
