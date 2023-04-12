import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { QuestionsComponent } from './questions/questions.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
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
