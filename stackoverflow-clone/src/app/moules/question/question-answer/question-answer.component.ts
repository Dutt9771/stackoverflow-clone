import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';
import { RegisterLoginService } from 'src/app/services/register-login.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent {
  Question_id:any
  Question_title:any
  constructor(private router:ActivatedRoute,private _questionsService:QuestionService,private _registerlogin:RegisterLoginService,private toastr:ToastrService){
router.paramMap.subscribe((params)=>{
  this.Question_id=params.get('id')
  this.Question_title=params.get('title')
})
  }
  questions:any=[]
  ngOnInit(){
    this.User_Answer_Form()
    this.Show_Questions()
  }
    Show_Questions(){
  
  this._questionsService.get_Question_data().subscribe({next:(get_question_res:any)=>{
    if(get_question_res){
      this.questions=get_question_res
      this.questions.filter((Question:any)=>Question.id===this.Question_id)
      console.log("get_question_res",get_question_res)
      // for(let i=0;i<this.questions.length;i++){
      //   let arr=this.questions[i].title.split(" ")
      //   for(let item of arr){
      //     let Array=[]
      //     let Arrr=Array.push(item)
      //     console.log("Arrr",Array)
      //   }
      // }
    }
  },error:(get_question_error)=>{
    console.log("get_question_error",get_question_error)
  }})
    }
    answer_form:any
 
    User_Answer_Form() {
      this.answer_form = new FormGroup({
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(30),
        ]),
      });
    }
    get get_question() {
      return this.answer_form.controls;
    }
   
    Tags:any=[]
    Save_Answer(){
      console.log("answer_res",this.answer_form.value)
      this._registerlogin.get_Register_data().subscribe((Register_res:any)=>{
        if(Register_res){
          let Login_User=JSON.parse(sessionStorage.getItem("Login_User"))
          if(Login_User){

            let User=Register_res.find((user:any)=>user.username===Login_User.username)
            console.log("User_ID",User.id)
            
            let answer={
              "id":1,
              "userId": User.id,
              "body": this.answer_form.value.description,
              "createdAt": new Date()
            }
            this._questionsService.post_Answer_data(this.Question_id,answer).subscribe((answer_res:any)=>{
                if(answer_res){
                    console.log("answer_res",answer_res)
                  }
                })
              }else{
                this.toastr.error("Please Login for Write Answer")
              }
              }
    })
  }
  
}