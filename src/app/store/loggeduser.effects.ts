//Creacion rapida paso a paso de effects: https://www.youtube.com/watch?v=wGaLlzNfgdQ&list=PL_WGMLcL4jzVkzMox4UxGcsBLvFurCDax&index=7

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, NEVER, Observable } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { LOADLOGGEDUSER, SETLOGGEDUSER } from './loggeduser.actions';
import { User } from '../models/user';

@Injectable()
export class LoggedUserEffects {
    newUser: User = new User();
    loadLoggedUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LOADLOGGEDUSER),
            exhaustMap(() =>                   //Puede usar mergeMap tambien ver diferencias: https://www.youtube.com/watch?v=sxjpUNRU_tI
                this.userService.loadUser() 
                    .pipe(
                        map((userData) => ({ type: SETLOGGEDUSER, userData: userData })),
                        catchError(this.handleError) 
                    )
            )
        )
    );

    private handleError(err: Error): Observable<never> {
        console.error(err);
        return NEVER;
    }

    constructor(private actions$: Actions, private userService: UserService) { }
}
