import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    QuestionsComponent,
    AskQuestionComponent,
    NavComponent,
    QuestionAnswerComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule

  ],
  exports: [NavComponent]
})
export class QuestionModule { }
