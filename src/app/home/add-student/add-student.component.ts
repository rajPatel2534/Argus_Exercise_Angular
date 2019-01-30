import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { StudentListService } from '../student-list-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  angForm: FormGroup;
  constructor(public dobpipe: DatePipe,private fb:FormBuilder,private router : Router,private mockService : StudentListService,public toastr: ToastrManager) {
    this.createForm();
   }

  ngOnInit() {

  }

  createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]{2}[a-zA-Z ]{0,16}[a-zA-Z]{2}$')
      ])],
       dob : ['',Validators.compose([
        Validators.required,
        validobDOB
      ])],
       city : ['' , Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]{2,20}$')
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
  add(sname : string , smobile : string , sdob : Date , scity : string)
  {
    console.log(sdob);
   

       this.mockService.add(sname,smobile,this.dobpipe.transform(sdob, 'dd-MM-yyyy'),scity);
        this.angForm.reset();
        this.toastr.successToastr('One student added successfully.', 'Success!',{toastTimeout : 3000});


  }

  cancel()
  {
    console.log("cancel");
    // this.router.navigate(["/studentlist"]);
    this.angForm.reset();
  }

  onSubmit(studentform): void { 
    
//    this.students1.push(studentform.value);
    // this.router.navigate(['../display-students']);

}

  ngOnDestroy()
  {

  }

}
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
