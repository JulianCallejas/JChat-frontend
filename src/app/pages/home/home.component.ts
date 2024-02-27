import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store/app.reducers';

import { User } from 'src/app/models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public loggedUser: User
  
  constructor(private router: Router, private userService: UserService, private store: Store<AppState>) {
    this.loggedUser = new User();
  }

  ngOnInit(): void {
    this.store.select('loggedUser').subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    });
    
  }

}

