# Jchat

## Public and private chatrooms
Welcome to our chatrooms project! This allows both public and private chatrooms.

The public chatroom is available to everyone. Users can join the public chatroom and start chatting right away without the need for registration or login.

However, this project also allows private chatrooms for users who want more privacy in their conversations. Users need to register and login in order to access private chatrooms . This is to ensure the safety and security.

<p align="center">
<img src="https://res.cloudinary.com/dphleqb5t/image/upload/v1709014686/JChat/JChat-Home_weqm3c.png"  title="JChat screenshot 1" alt="JChat screenshot 1" >
</p>
<p align="center">
<img src="https://res.cloudinary.com/dphleqb5t/image/upload/v1709014686/JChat/JChat-Publicroom_z8uxxb.png"  title="JChat screenshot 1" alt="JChat screenshot 1" >
</p>

## Stack
This is the Frontend of the project, made with Angular 15.2, rxjs and socket.io-client. All the services for the socket.io-client were self-coded.

The Backend was made with Express, Socket.io and MySql database. You need to install it to make it work [Go to backend repository](https://github.com/JulianCallejas/JChat-backend)

## Installation

1. Clone the project

2. Install dependencies

    ```bash
    npm install
    ```
3. Update the file `models/config.ts` with the IP address of the backend server.

4. Start the backend server. See [Backend repository](https://github.com/JulianCallejas/JChat-backend) 

6. Start development mode

    ```bash
    npm run dev
    ```
