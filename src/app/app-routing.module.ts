import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './home/home.component';


import { DashboardComponent } from './home/dashboard/dashboard.component';
import { StudentListComponent } from './home/studentList/studentList.component';
import { AddStudentComponent } from './home/add-student/add-student.component';

const routes: Routes = [
  { path: '', component: SigninComponent, pathMatch: 'full' , canActivate: 
  [AuthGuard]},
  {path : 'user' , component : UserComponent},
  {path : 'signup' , component : SignupComponent},
  {path : 'login' , component : SigninComponent},
  {path : '' , component : HomeComponent,
  children:[
    {
      path:'',
      redirectTo:'dashboard',
      pathMatch:'full'
    },
    {
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path:'studentlist',
      component:StudentListComponent
    },
    {
      path:'addstudent',
      component:AddStudentComponent
    }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
