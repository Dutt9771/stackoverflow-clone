import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
  }
  
}
