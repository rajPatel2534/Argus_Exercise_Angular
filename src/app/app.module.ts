import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SigninComponent,
    SignupComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [NgbModule,
    BrowserModule,
    AppRoutingModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
