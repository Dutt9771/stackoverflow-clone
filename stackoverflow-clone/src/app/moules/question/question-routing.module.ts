import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { QuestionsComponent } from './questions/questions.component';
import { NavComponent } from './nav/nav.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';

const routes: Routes = [
  {
    path:'question-answer/:id/:title',component:QuestionAnswerComponent
  },
  {
    path:'',
    component:NavComponent,
    children:[
    {
      path:'add-question',component:AskQuestionComponent
    },
    {
      path:'questions',component:QuestionsComponent
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
