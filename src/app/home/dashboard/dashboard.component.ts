import { Component, OnInit } from '@angular/core';
import { Source } from 'webpack-sources';
import { isNgContainer } from '@angular/compiler';

// import { Router } from '@angular/router';
// import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // constructor(private router:Router,private auth : AuthService) { }

  listOfCountry =[{c_id : 'IN' , name : 'India'},
                  {c_id : 'AU' , name : 'Australia'},
                  {c_id : 'US' , name : 'United States'},
                  {c_id : 'UK' , name : 'United Kingdom'}
  ];

  listOfStates =[{c_id : 'IN' , name : 'Gujarat' , image : 'assets/img/gujarat.jpg'},
                  {c_id : 'IN' ,  name : 'Rajasthan', image : 'assets/img/rajasthan.jpg'},
                  {c_id : 'AU' , name : 'Sydney', image : 'assets/img/sydney.jpg'},
                  {c_id : 'AU' , name : 'Melbourne', image : 'assets/img/melbourne.jpg'},
                  {c_id : 'US' , name : 'California', image : 'assets/img/california.jpg'},
                  {c_id : 'US' , name : 'Miami', image : 'assets/img/miami.jpg'},
                  {c_id : 'US' , name : 'London', image : 'assets/img/london.jpg'},
                  {c_id : 'US' , name : 'Oval', image : 'assets/img/oval.jpg'}
  
  ];

  selectedCountry = "Select Country";
  selectedState = "Select State";

  selectedListOfStates = [{c_id : 'IN' , name : 'Gujarat' , image : 'assets/img/gujarat.jpg'},
  {c_id : 'IN' ,  name : 'Rajasthan', image : 'assets/img/rajasthan.jpg'},
  {c_id : 'AU' , name : 'Sydney', image : 'assets/img/sydney.jpg'}
 ];
  selectedIndex = 0;
  err : boolean =false;
  constructor()
  {}
  ngOnInit() {
    // if(!this.auth.isLoggednIn())
    // {
    //   this.router.navigate(["login"]);
    // }
  
  }

  selectCountry(index : number , id : string, name : string)
  {
    console.log(index);
    this.selectedCountry = name;
    this.selectedListOfStates = [];
    for(let i=0;i<this.listOfStates.length;i++)
    {
      if(this.listOfStates[i].c_id == id)
      {
        this.selectedListOfStates.push(this.listOfStates[i]);
      }
    }

    if(this.selectedListOfStates.length >0)
    {
      this.err = false;
      this.selectedState = this.selectedListOfStates[0].name;
      this.selectedIndex = 0;
    }
    else
    {
      this.selectedState = "Select state";
      this.err=true;
    }

  }

  selectState(index : number , name : string)
  {
    this.selectedState = name;
  }

  setIndex(index : number)
  {
    console.log(index);
    this.selectedIndex = index;
  }
  slide(index : number):number
  {
    console.log(index);
    
    return 1;
  }

  prevImage()
  {
    console.log("prev-index="+this.selectedIndex);
    if(this.selectedIndex == 0)
    {
      this.selectedIndex = this.selectedListOfStates.length-1;
    }
    else
    {
      this.selectedIndex = this.selectedIndex-1;
    }
    console.log("prev-index="+this.selectedIndex);
  
  }

  nextImage()
  {
    console.log("prev-index="+this.selectedIndex);
  
    if(this.selectedIndex == this.selectedListOfStates.length -1)
    {
      this.selectedIndex = 0;
    }
    else
    {
      this.selectedIndex = this.selectedIndex +1;
    }

    console.log("prev-index="+this.selectedIndex);
  
  }
}
