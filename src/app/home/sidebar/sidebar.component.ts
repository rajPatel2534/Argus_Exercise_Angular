import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


   private _opened: boolean = true;
   selectedIndex : number = 0;

   private sideBarItems : string[] = ['Home','Student List','Add Student'];

  //  togg() {
  //    console.log("Clicked");
  //   this._opened = !this._opened;
  // }  
  
  constructor(private router:Router) { }
  
  ngOnInit() {
       let activatedRoute= this.router.url;
      if(activatedRoute === "/studentlist"){
         this.selectedIndex = 1;  
      }
      else if(activatedRoute === "/addstudent")
      {
        this.selectedIndex =2;
      }
      
      
    }


  setIndex(index : number)
  {
    console.log(index);
      this.selectedIndex = index;
      let temproute = this.selectedIndex == 1?'/studentlist': this.selectedIndex ==2? '/addstudent' : '/dashboard';
      this.router.navigate([temproute])
  }
}
