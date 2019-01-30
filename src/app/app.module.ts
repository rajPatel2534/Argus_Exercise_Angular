import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; 
import {  ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './home/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { HeaderComponent } from './home/header/header.component';
import {DashboardComponent} from './home/dashboard/dashboard.component'
import {StudentListComponent} from './home/studentList/studentList.component'

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { DatePipe } from '@angular/common';
import { AddStudentComponent } from './home/add-student/add-student.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyAccountComponent } from './home/my-account/my-account.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SigninComponent,
    SignupComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    StudentListComponent,
    AddStudentComponent,
    MyAccountComponent
  ],
  imports: [NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
