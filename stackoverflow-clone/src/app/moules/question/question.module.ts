import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    QuestionsComponent,
    AskQuestionComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [NavComponent]
})
export class QuestionModule { }
