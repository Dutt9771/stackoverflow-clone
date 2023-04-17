import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { RegisterLoginService } from 'src/app/services/register-login.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent {
  body:any
  constructor(private _registerlogin:RegisterLoginService,private _questioservice:QuestionService,private toastr:ToastrService){}


  ngOnInit() {
this.User_Question_Form()
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }
  
  question_form:any
 
    User_Question_Form() {
      this.question_form = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(30),
        ]),
      });
    }
    get get_question() {
      return this.question_form.controls;
    }
   
    Tags:any=[]
  Save_Question(){
    
    if(this.question_form.valid && this.fruits.length){
    this._registerlogin.get_Register_data().subscribe((Register_res:any)=>{
      if(Register_res){
        let Login_User=JSON.parse(sessionStorage.getItem("Login_User"))
        let User=Register_res.find((user:any)=>user.username===Login_User.username)
        console.log("User_ID",User.id)
        
          let arr=this.question_form.value.title.split(" ")
          
          for(let item of arr){
            
            let Arr=this.Tags.push(item)
            console.log("this.Tags",this.Tags)
          }
          let votes={
            vote:0,
            users_ids:[]
          }
          let views={
            views:0,
            users_ids:[]
          }
        this.body=
          {
            "userId": User.id,
            "title": this.question_form.value.title,
            "body": this.question_form.value.description,
            "createdAt": new Date(),
            "tags":this.fruits,
            "votes":votes,
            "views":views,
            "answers": []

          }
          this._questioservice.post_Question_data(this.body).subscribe({next:(Add_question_res:any)=>{
            console.log("Add_question_res",Add_question_res)
            this.toastr.success("Add Question Succesfully")
          },error:(Error:any)=>{
            console.log("Error",Error)
          }})
      }
      
    })
  }else{
    this.toastr.error("Please Enter All Field")

  }
}
  Ask_Question(){
    // this._question.
  }
}
