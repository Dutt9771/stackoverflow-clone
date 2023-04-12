import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {
  baseurl=environment.baseurl
  register=environment.register
  constructor(private router:Router,private http:HttpClient) { }
  post_Register_data(data:RegistrationModel){
    try {
      return this.http.post<RegistrationModel>(this.baseurl+this.register,data,{observe:"response"})
    } catch (error:any) {
      return throwError(() => new Error('test'))
    }

  }
  get_Register_data(){
    try {
      return this.http.get<RegistrationModel>(this.baseurl+this.register)
    } catch (error:any) {
      return throwError(() => new Error('test'))
    }

  }
  get_Login_data(data:any){
    try {
      return sessionStorage.setItem("Login_User",JSON.stringify(data))
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

 }
}
