import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
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
}
