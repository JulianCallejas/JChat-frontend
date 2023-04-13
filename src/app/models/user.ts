export class User {
    public username: string;
    public email: string;
    public password: string;
    public userState: string;
    public active: boolean;
    public token: string;
    public loggedIn: boolean;

    constructor(loggedIn: boolean = false) {
        this.username = "";
        this.email = "";
        this.password = "";
        this.userState = "Guest";
        this.active = true;
        this.token = "";
        this.loggedIn = loggedIn;
    }

    public islogged(): boolean {
        return this.loggedIn
    }
    
    public getRegister(){
        return {
            email: this.email,
            username: this.username,
            password: this.password
        }
    }

    public getLogin(){
        return {
            email: this.email,
            password: this.password
        }
    }

    public getUpdate(){
        if (this.password){
            return {
                email: this.email,
                username: this.username,
                password: this.password,
                userState: this.userState,
                active: this.active
            }
        }else{
            return {
                email: this.email,
                username: this.username,
                userState: this.userState,
                active: this.active
            }
        }
    }


}