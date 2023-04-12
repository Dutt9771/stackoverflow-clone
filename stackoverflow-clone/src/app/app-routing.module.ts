import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {path:'',redirectTo:'',pathMatch:'full'},
{path:'users',
loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},

{path:'**',component:ErrorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
