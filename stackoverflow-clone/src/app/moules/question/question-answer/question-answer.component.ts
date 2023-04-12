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
  views:any=0
  Views_In_Localstorage(){
    let cart_Arr: any = [];
    if (localStorage.getItem('Views')) {
      let Merge = JSON.parse(localStorage.getItem('Views'));
      cart_Arr = Merge.find((user: any) => user.id == this.Question_id);
      // console.log('Cart_Arr', cart_Arr);
      let cart = {
        id: this.Question_id,
        views: false,
      };
      if (!cart_Arr) {
        console.log('this.Question_id', this.Question_id);
        console.log('Views', cart);
        let Arr = JSON.stringify([]);
        if (!localStorage.getItem('Views')) {
          localStorage.setItem('Views', Arr);
        }

        let Merge = JSON.parse(localStorage.getItem('Views'));
        Merge.push(cart);
        console.log('Merge', Merge);
        localStorage.setItem('Views', JSON.stringify(Merge));
        // localStorage.setItem("Cart",JSON.stringify(cart))
      }else{
        let Merge = JSON.parse(localStorage.getItem('Views'));
        let duplicate = Merge.find((user: any) => user.id == this.Question_id);
        if(!duplicate){

          Merge.push(cart);
          console.log('Merge', Merge);
          localStorage.setItem('Views', JSON.stringify(Merge));
        }
      }
    }else {
        let cart = {
          id: this.Question_id,
          views: false,
        };
        if (!cart_Arr.length) {
          console.log('username', this.Question_id);
          console.log('cart', cart);
          let Arr = JSON.stringify([]);
          if (!localStorage.getItem('Views')) {
            localStorage.setItem('Views', Arr);
          }
  
          let Merge = JSON.parse(localStorage.getItem('Views'));
          Merge.push(cart);
          console.log('Merge', Merge);
          localStorage.setItem('Views', JSON.stringify(Merge));
          // localStorage.setItem("Cart",JSON.stringify(cart))
        }
      }
  }
  ngAfterViewInit(){
    this.Views_In_Localstorage()
    this.views
    let Merge = JSON.parse(localStorage.getItem('Views'));
    let view_Obj = Merge.find((user: any) => user.id == this.Question_id);
    if(Merge){
      if(view_Obj.views==false){
        
        this._questionsService.Views(this.Question_id,this.views).subscribe({next:(views_res:any)=>{
          console.log("views_res",views_res)
          view_Obj.views=true
          console.log('Merge', Merge);
          localStorage.setItem('Views', JSON.stringify(Merge));
        },error:(views_err:any)=>{
          console.log("views_err",views_err)
        }})
      }
      }
  }
  // votes(x:any,y:any){
  //   this._questionsService.get_Question_data().subscribe({next:(get_question_res:any)=>{
  //     if(get_question_res){
  //       this.questions=get_question_res
  //       this.questions=this.questions.find((Question:any)=>Question.id===this.Question_id)
  //       console.log("Question",this.questions)
  //       // Question.votes=Question.votes+x
  //       // if(Question.votes>0){
  //       //   Question.votes=Question.votes-y
  //       // }
  //       // this._questionsService.votes(this.Question_id,Question).subscribe({next:(votes_res:any)=>{
  //       //   console.log("votes_res",votes_res)
  //       // },error:(votes_error:any)=>{
  //       //   console.log("votes_error",votes_error)
  //       // }})
  //     }
  //   }})
  // }
  source: any="https://img.icons8.com/material-sharp/48/000000/thumb-up.png"
  myFunction(){
  //   console.log("cliked")
  //   if(this.source=="https://img.icons8.com/material-sharp/48/null/thumb-up.png"){
  //     this.source="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABM0lEQVR4nO2ZQUrEQBREy70I6pzAhXt14QHEuYUrwfyf4BU8gXgEzyAjrjzD4ErBQzjqAWZKWhAdjHFGBX8xv6BWIfBeutMh3UBmkeLcgfMah1yDKPwITsI4RMN1SMK/1XiDI/YQPjV34Xyagn/vKeSe/PQoHCBsGm53wpc23ERg+IdO+HIdXIIofOkVhOFLTyAMX9qHMPwEzlWEiHFrTviyfN5BFt5fBc514Z1ExSrCV3b0I/i/6q/zn/DeJjDvDSnAHIGcQsiXmAu6ChnH2gLOS3WBvq6A8b79V1RFwFl/hlcRMD7jmCvKAmft8BoCk+59pOgCxsHX8AoCFfd1BaxsAny3ixdbwLvhIwsYH1FzWVfAZz1DiChgHMO5oSxwMRt8VIGae8oCtzEPQDKZTAYf8gIS92F92ggD3QAAAABJRU5ErkJggg=="
  //     this.votes(1,0)
  //   }else{
  //     this.source="https://img.icons8.com/material-sharp/48/null/thumb-up.png"
  //     this.votes(0,1)
  //   }
  }
    Show_Questions(){
  
  this._questionsService.get_Question_data().subscribe({next:(get_question_res:any)=>{
    if(get_question_res){
      this.questions=get_question_res
      console.log("Question-id",this.Question_id)
      this.questions=this.questions.filter((Question:any)=>Question.id==this.Question_id)
      console.log("get_question_res",get_question_res)
      console.log("this.questions",this.questions)
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
