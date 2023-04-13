import { User } from "../models/user";
import { SETLOGGEDUSER, actions } from "./loggeduser.actions";

export function loggedUserReducer(loggedUserState: User , action: actions) {

    switch (action.type) {
        case SETLOGGEDUSER:
            return loggedUserState = action.payload;
        default:
            return loggedUserState = new User();
    }

}