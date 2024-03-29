import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';
import { LoadLoggedUser } from 'src/app/store/loggeduser.actions';

import { UserService } from 'src/app/services/user.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent implements OnInit {

  public loggedUser: User
  
  constructor(
    private router: Router, 
    private userService: UserService, 
    private store: Store<AppState>
  ){  
    this.store.dispatch(new LoadLoggedUser());
    this.store.select('loggedUser').subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    });

  }

  ngOnInit(): void {
      
  }
  
  

}
