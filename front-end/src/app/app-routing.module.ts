import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SigninComponent } from './login/signin/signin.component';
import { HomeComponent } from './home/components/home-container/home.component';


import { DashboardComponent } from './home/components/dashboard/dashboard.component';
import { StudentListComponent } from './home/components/studentList/studentList.component';
import { AddStudentComponent } from './home/components/add-student/add-student.component';
import { MyAccountComponent } from './home/components/my-account/my-account.component';


const routes: Routes = [
  { path: '', component: SigninComponent, pathMatch: 'full' , canActivate: 
  [AuthGuard]},
  // {path : 'signup' , component : SignupComponent},
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
    },
    {
      path:'myaccount',
      component:MyAccountComponent
    }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
