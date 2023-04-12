import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../guard/auth.guard';
import { RouteGuard } from '../guard/route.guard';

const routes: Routes = [
  {
    path:'registration',component:RegistrationComponent,canActivate:[AuthGuard]
  },
  {
    path:'login',component:LoginComponent,canActivate:[AuthGuard,RouteGuard]
  },
  {
    path:'user-profile',component:UserProfileComponent,canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
