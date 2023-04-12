import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
{path:'users',
loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
{path:'question',
loadChildren: () => import('./moules/question/question.module').then(m => m.QuestionModule)},

{path:'**',component:ErrorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
