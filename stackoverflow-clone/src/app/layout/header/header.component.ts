import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  btn:any="Login";
  username="Login/Register";
  Registered_User:boolean=true;
  constructor(private router:Router){
    this.router.events.subscribe((Res:any)=>{
      if(Res){
        if(Res.url){
          let Login_User=JSON.parse(sessionStorage.getItem("Login_User"))
          if(Login_User){
            this.btn=""
            console.log("this.username=Login_User.username",Login_User.username)
            this.username=Login_User.username
          }else{
            this.btn="Login"
            this.username="Login/Register";
          }
          let Register_User=JSON.parse(sessionStorage.getItem("Register_User"))
          if(Register_User){
            this.Registered_User=false;

          }else{
            this.Registered_User=true;
          }
        }
      }
    })
  }
  Logout_click(){
    sessionStorage.removeItem("Login_User")
    sessionStorage.removeItem("Register_User")
    this.router.navigate(["/home"])
  }
}
