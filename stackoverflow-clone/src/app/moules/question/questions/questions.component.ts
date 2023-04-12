import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
constructor(private _questionsService:QuestionService){}
questions:any=[]
ngOnInit(){
  this.Show_Questions()
}
  Show_Questions(){

this._questionsService.get_Question_data().subscribe({next:(get_question_res:any)=>{
  if(get_question_res){
    this.questions=get_question_res
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
}
