import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; 
import {  ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './login/signin/signin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './guards/auth.service';
import { AuthGuard } from './guards/auth.guard';
import {HomeComponent} from './home/components/home-container/home.component';
import {SidebarComponent} from './home/components/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { HeaderComponent } from './home/components/header/header.component';
import {DashboardComponent} from './home/components/dashboard/dashboard.component'
import {StudentListComponent} from './home/components/studentList/studentList.component'

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { DatePipe } from '@angular/common';
import { AddStudentComponent } from './home/components/add-student/add-student.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyAccountComponent } from './home/components/my-account/my-account.component';

import {FilterPipeName} from './pipes/searchName.pipe';
import {FilterPipeMobile} from './pipes/searchMobile.pipe';
import {FilterPipeCity} from './pipes/searchCity.pipe';
import {FilterPipeDOB} from './pipes/searchDOB.pipe';
import {HttpClientModule} from '@angular/common/http';
import { HighChartComponent } from './home/components/high-chart/high-chart.component'

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    StudentListComponent,
    AddStudentComponent,
    MyAccountComponent,
    FilterPipeName,
    FilterPipeMobile,
    FilterPipeCity,
    FilterPipeDOB,
    HighChartComponent
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
    HttpClientModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
