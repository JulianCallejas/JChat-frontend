import { User } from "../models/user";
import { LOADLOGGEDUSER, SETLOGGEDUSER, actions } from "./loggeduser.actions";

export function loggedUserReducer(loggedUserState: User, action: actions) {
    switch (action.type) {
        case SETLOGGEDUSER:
            return loggedUserState = action.userData;
        case LOADLOGGEDUSER:
            return loggedUserState;
        default:
            return loggedUserState = new User();
    }
}