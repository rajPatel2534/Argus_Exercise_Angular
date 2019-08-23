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

   private sideBarItems : any[] = [
     {name: 'Home' , link : '/dashboard'},
     {name : 'Student List' , link : '/studentlist'},
     {name : 'Add Student' , link : '/addstudent'},
     {name : 'High Chart' , link : '/high-chart'}];

  //  togg() {
  //    console.log("Clicked");
  //   this._opened = !this._opened;
  // }  
  
  constructor(private router:Router) { }
  
  ngOnInit() {
       let activatedRoute= this.router.url;
       const index = this.sideBarItems.findIndex(item => item.link === activatedRoute);
        if(index != -1) this.selectedIndex = index;
      // if(activatedRoute === "/studentlist"){
      //    this.selectedIndex = 1;  
      // }
      // else if(activatedRoute === "/addstudent")
      // {
      //   this.selectedIndex =2;
      // }
      // else if(activatedRoute === '/high-chart'){
      //   this.selectedIndex = 3;
      // }
      
      
    }


  setIndex(index : number)
  {
    console.log(index);
      this.selectedIndex = index;
      // let temproute = this.selectedIndex == 1?'/studentlist': this.selectedIndex ==2? '/addstudent' : this.selectedIndex == 3 ? '/high-chart' : '/dashboard';
      this.router.navigate([`${this.sideBarItems[index].link}`])
  }
}
