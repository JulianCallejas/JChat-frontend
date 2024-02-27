export class User {
    public username: string;
    public email: string;
    public password: string;
    public userState: string;
    public avatar: string;
    public active: boolean;
    public token: string;
    public loggedIn: boolean;
    public authSessionID: string;
    public authUserID: string;
    
    constructor(loggedIn: boolean = false) {
        this.username = "";
        this.email = "";
        this.password = "";
        this.userState = "Guest";
        this.avatar = "../../../assets/imgs/avatar/guest.png";
        this.active = true;
        this.token = "";
        this.loggedIn = loggedIn;
        this.authSessionID = this.generateRandomString();
        this.authUserID = this.generateRandomString();
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
                avatar: this.avatar,
                active: this.active
            }
        }else{
            return {
                email: this.email,
                username: this.username,
                userState: this.userState,
                avatar: this.avatar,
                active: this.active
            }
        }
    }

    public getConnectionData(){
        return {
            username: this.username,
            userState: this.userState,
            avatar: this.avatar ? this.avatar : "../../../assets/imgs/avatar/guest.png"
        }
    }

    public generateRandomString(): string{
        let rand ="";
        for (let i = 0; i <10; i++){
          switch (Math.ceil( Math.random()*3)){
            case 1:
              rand += String.fromCharCode(Math.ceil( Math.random()*26)+64);
              break;
            case 2:
              rand += String.fromCharCode(Math.ceil( Math.random()*26)+96);
              break;
            default:
              rand += Math.ceil( Math.random()*9);
              break;
          }
        }
        return rand;
      }

}