import { Injectable, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subscription,Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinCodeService {

postalInfo : string[] = [null,null];
  subscription : Subscription;
  
  constructor(private httpPinCode : HttpClient) { }

  getPincode(code : string)
  {
    this.postalInfo[0]='';
    this.postalInfo[1]='';
    console.log(code)
    this.subscription = this.httpPinCode.get(`http://postalpincode.in/api/pincode/${code}`).subscribe((data)=>
      {
        if(data['PostOffice'] ==null)
        {
   
              this.postalInfo[0]= 'Not Found';
              this.postalInfo[1] = '';
            
        }
        else
        {
        this.postalInfo[0] =  data['PostOffice'][0]['Taluk'];
        this.postalInfo[1] = data['PostOffice'][0]['State'];
      
        }
        
      });
  
       
  

   
  }
   
  
 
  
  getCodeInfo():Observable<string[]>
  {
    console.log(this.postalInfo);
    
    return of(this.postalInfo);
  }

  

 

  ngOnDestroy()
  {
    this.subscription.unsubscribe();

  }


}
