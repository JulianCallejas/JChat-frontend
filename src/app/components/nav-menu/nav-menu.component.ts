import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [UserService],
})
export class NavMenuComponent implements OnInit {
  public loggedUser: User;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.store.select('loggedUser').subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    });
  }

  public logout(): void {
    this.userService.logout();
    this.userService.loadUser();
    this.router.navigate(['/home']);
  }
}
