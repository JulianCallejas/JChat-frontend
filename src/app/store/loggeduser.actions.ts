import {Action} from "@ngrx/store"
import { User } from "../models/user";

export const SETLOGGEDUSER = '[loggedUser] SetLoggedUser';
export const LOADLOGGEDUSER = '[loggedUser] LoadLoggedUser';

export class SetLoggedUser implements Action {
    readonly type = SETLOGGEDUSER;
    constructor(public userData: User){ }
}

export class LoadLoggedUser implements Action {
    readonly type = LOADLOGGEDUSER;
    
}

export type actions = SetLoggedUser | LoadLoggedUser