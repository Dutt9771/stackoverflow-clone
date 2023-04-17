import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseurl=environment.baseurl
  question=environment.question
  constructor(private router:Router,private http:HttpClient) { }
  post_Question_data(data:Question){
    try {
      return this.http.post<Question>(this.baseurl+this.question,data,{observe:"response"})
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

  }
  get_Question_data(){
    try {
      return this.http.get(this.baseurl+this.question)
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

  }
  post_Answer_data(userid: number,data:any){
    try {
          return this.http.get(this.baseurl+this.question+"/"+userid).pipe(
            mergeMap((customer: any) => {
              const currentItemArray = customer.answers;
              currentItemArray.push(data);
    
              return this.http.patch(this.baseurl+this.question+"/"+userid, {
                answers: currentItemArray
              });
            })
          );
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

  }
  
  Views(question_id: number,data:any){
    try {
          return this.http.get(this.baseurl+this.question+"/"+question_id).pipe(
            mergeMap((customer: any) => {
              const currentItemArray = customer.views;
              const User_Id_Arr=customer.views.users_ids;
              const user_id_here=User_Id_Arr.find((vote:any)=>vote==data)
console.log("user_id_here",user_id_here)
if(!user_id_here){
  customer.views.views+=1;
  User_Id_Arr.push(data)
  console.log(currentItemArray,"currentItemArray")
}
              
              // currentItemArray.push(data);
    
              return this.http.patch(this.baseurl+this.question+"/"+question_id, {
                views: currentItemArray
              });
            })
          );
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

  }
  votes(question_id: number,data:any){
    try {
          return this.http.get(this.baseurl+this.question+"/"+question_id).pipe(
            mergeMap((customer: any) => {
              const currentItemArray = customer.votes;
              const User_Id_Arr=customer.votes.users_ids;
              const user_id_here=User_Id_Arr.find((vote:any)=>vote==data)
              console.log("user_id_here",user_id_here)
              console.log(currentItemArray.vote,"currentItemArray")
              if(!user_id_here){
                currentItemArray.vote+=1;
                User_Id_Arr.push(data)
                console.log(currentItemArray,"currentItemArray")
}else{
  if(currentItemArray.vote>0){
    currentItemArray.vote-=1;
    User_Id_Arr.push(data)
    console.log(currentItemArray,"currentItemArray")
  }
  }
              
              // currentItemArray.push(data);
    
              return this.http.patch(this.baseurl+this.question+"/"+question_id, {
                votes: currentItemArray
              });
            })
          );
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

  }

}
