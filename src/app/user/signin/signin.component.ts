import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  constructor(private auth : AuthService , private myRoute : Router) { }
  ngOnInit() {
    if(this.auth.isLoggednIn())
    {
      this.myRoute.navigate(["/dashboard"]);
    }
  }
  
  login()
  {
      this.auth.sendToken('asdas');
        this.myRoute.navigate(["/dashboard"]);
      
  }


}
