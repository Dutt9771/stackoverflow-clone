import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {  
    
  ngOnInit(){
    this.Registeration()
  }

  
  // for Validation

    Register:any
    Registeration(){

   this.Register=new FormGroup({
     name:new FormControl ("",[
       Validators.required,
       Validators.minLength(2)
     ]),
      email:new FormControl ("",[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.matchPasswordValidator()
      ]),
      username:new FormControl ("",[
        Validators.required
      ])
  
      })
    }
      get get_Register(){
        return this.Register.controls
      }
      Reg_click(){
          console.log(this.Register.value)
          
    
      }
      // matchPasswordValidator(): ValidatorFn {
      // return (control: AbstractControl): {[key: string]: any} | null => {
      //   const password = this.Register.value['password'];
      //   const confirm_password = control.value;
      //   return password === confirm_password ? null : {matchPassword: {value: control.value}};
      // };
      matchPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const password = control.root.get('password')?.value;
          const confirmPassword = control.value;
    
          return password === confirmPassword ? null : { matchPassword: { value: control.value } };
        };
      }
      
    }
  

