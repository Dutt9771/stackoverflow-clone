import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/services/register-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _registerlogin:RegisterLoginService,private router:Router){}
invalid:any
    ngOnInit() {
      this.User_Login_Form();
     
    }

  

  user_login:any
 
    User_Login_Form() {
      this.user_login = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      });
    }
    get get_user_login() {
      return this.user_login.controls;
    }
   
    Save_User_Login() {
      
  console.log("Login Data",this.user_login.value)

  this._registerlogin.get_Register_data().subscribe((Register_res_get:any)=>{
    Register_res_get= Register_res_get.find((user:any)=>user.username===this.user_login.value.username)
    console.log("Register_res_get",Register_res_get)
    if(Register_res_get){
      if((Register_res_get.username==this.user_login.value.username) && (Register_res_get.password==this.user_login.value.password)){
        this._registerlogin.get_Login_data(this.user_login.value)
        this.router.navigate(['/home']);  
        // this._RegisterService.Change_btn(this.Login_Logout_msg)
        // let btn=this._RegisterService.Change_btn(this.Login_Logout_msg)
        // let btn=this._registerlogin.Login_Logout_msg.next("Logout")
        // console.log(btn)
        this.invalid=""
      }else{
        this.invalid = "Invalid Credential Please Register"
      }
    }

  })
}
  // this.router.navigate(['front/user/registration']);
  // localStorage.setItem('User', JSON.stringify(this.login.value));
  // console.log("Register data",this.RegisterData)
  // if(this.RegisterData){

 
// }else{
//   alert("Please register")
//   this.router.navigate(['/front/user/registration']);  
// }
//   }
    }

