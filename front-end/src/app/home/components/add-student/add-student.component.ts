import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { StudentListService } from '../../services/student-list-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PinCodeService} from '../../services/pin-code.service';
import { Subscription } from 'rxjs';
import { CodeNode } from 'source-list-map';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  angForm: FormGroup;
  todate : Date = new Date();
  minDate = this.getMinDate();
  maxDate = this.getMaxDate();
  postalInfo :string[];
  subscription : Subscription;
  
  

  constructor(public dobpipe: DatePipe,private fb:FormBuilder,private router : Router,private mockService : StudentListService,public toastr: ToastrManager,private http : HttpClient,private pinCodeService : PinCodeService) {
    this.createForm();
   }

   

  ngOnInit() {
    //get code from service
    this.getCodes();
     
  }

  //create form on initialization
  createForm() {    
    this.angForm = this.fb.group({
       name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]{2}[a-zA-Z ]{0,16}[a-zA-Z]{2}$')
      ])],
       dob : [this.maxDate,Validators.compose([
        Validators.required,
        validobDOB
      ])],
       city : ['' , Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ])],
       mobile : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[6789][0-9]{9}')
      ])]
    });
  }


  isdobValid(control : AbstractControl)
  {
      const dobControl= this.angForm.get('dob');

      
  }

  //for adding student into table
  add(sname : string , smobile : string , sdob : Date , scity : string)
  {
    console.log(sdob);
   

       this.mockService.add(sname,smobile,this.dobpipe.transform(sdob, 'dd-MM-yyyy'),scity);
        this.angForm.reset();
        this.toastr.successToastr('One student added successfully.', 'Success!',{toastTimeout : 3000});


  }

  //when user click on cancel
  cancel()
  {
    console.log("cancel");
    // this.router.navigate(["/studentlist"]);
    console.log(this.postalInfo);
    this.angForm.reset();
    console.log('Http started');
    const params = new URLSearchParams();
    params.set('name','sname');
    params.set('mobile','smobile');
    params.set('dob','sdob');
    params.set('city','scity');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/JSON',
        // 'Authorization': 'my-auth-token'
      })
    };

   
     const params1 = {name : 'patel' , mobile : '9985688454' , dob : '21-08-2998' , city : 'vib'};
    this.http.post('http://localhost:8080/mvccrud/rest/save',JSON.stringify(params1),httpOptions).subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      }
      
      );
    console.log('Http ended');
  
    
  }

  //for setting min date into date input
  getMinDate() : Date
  {
    let currentdobTime = new Date();
     let olddobTime = new Date(currentdobTime.getFullYear()-100,currentdobTime.getMonth(),currentdobTime.getDate()); 
     olddobTime.setHours(0,0,0,0); 
     return olddobTime;
    }

    //for setting max date into date input
    getMaxDate() : Date
    {
      let currentdobTime = new Date();
      let newdobTime = new Date(currentdobTime.getFullYear()-10,currentdobTime.getMonth(),currentdobTime.getDate());
      newdobTime.setHours(0,0,0,0);
      return newdobTime;
      }


  //request pin code info from service
  requestPinCode(pinCode : string)
  {
    console.log(pinCode);
    if(pinCode.toString().length ==6)
    {
    this.pinCodeService.getPincode(pinCode);
    }
    console.log(this.postalInfo);
    
  
  }

  //for subscribing pin info from service
  getCodes():void
  {
    this.subscription = this.pinCodeService.getCodeInfo().subscribe(students => this.postalInfo = students);
  
  }

  //unsubscribe the service
  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }

}

//custom validator for date
export function validobDOB(control: AbstractControl) : ValidationErrors | null
{

    let currentdobTime = new Date();
    let olddobTime = new Date(currentdobTime.getFullYear()-100,currentdobTime.getMonth(),currentdobTime.getDate());
    let newdobTime = new Date(currentdobTime.getFullYear()-10,currentdobTime.getMonth(),currentdobTime.getDate());
    olddobTime.setHours(0,0,0,0);
    newdobTime.setHours(0,0,0,0);
    currentdobTime.setHours(0,0,0,0);
    // console.log(currentdobTime);
    let controlValue = new Date(control.value);
    controlValue.setHours(0,0,0,0);

    console.log(currentdobTime+'-'+controlValue)

    if(olddobTime<controlValue && newdobTime>controlValue)
    {
        console.log("true");

        return null;
    }
    else
    {
      console.log("false");
      return { pattern : true , status : 'INVALID'};
      
    }

   
}
export function patternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
  };


}
