import {Action} from "@ngrx/store"
import { User } from "../models/user";

export const SETLOGGEDUSER = '[loggedUser] SetLoggedUser';

export class SetLoggedUser implements Action {
    readonly type = SETLOGGEDUSER;
    constructor(public payload: User){ }
}

export type actions = SetLoggedUser