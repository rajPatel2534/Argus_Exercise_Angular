import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../../auth.service';
// import {Router} from '@angular/router';
import {StudentListService} from '../../services/student-list-service.service';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/student';
import { FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {  FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-temp2',
  templateUrl: './studentList.component.html',
  styleUrls: ['./studentList.component.css']
})
export class StudentListComponent implements OnInit {

  // constructor(private auth : AuthService, private router : Router) { }

  students: Student []=[];
  selected : Student;
 
  upForm: FormGroup;
  selectedKey : number;
  selectDeleteName : string;
  updateKey : number;
  subsription : Subscription;
  key: string = 'name'; //set default
  reverse: boolean = false;
  fullLoaded : boolean = false;
  updateDOBDefault : Date;
  todate = new Date();
  sort(key){
     this.key = key;
     this.reverse = !this.reverse;
   }
   p: number = 1;

constructor(public datepipe: DatePipe,private fb : FormBuilder,private listService : StudentListService, private toastr: ToastrManager) { 
}


ngOnInit() {
  this.upForm = this.fb.group({
    name: [ null,  Validators.compose([
     Validators.required,
     Validators.minLength(4),
     Validators.maxLength(20),
     Validators.pattern('^[a-zA-Z]{2}[a-zA-Z ]{0,16}[a-zA-Z]{2}$')
   ])],
    dob : [null , Validators.compose([
     Validators.required,
     validateDOB
   ])],
    city : [null , Validators.compose([
     Validators.required,
     Validators.pattern('^[a-zA-Z]{2,20}$')
   ])],
    mobile : [null, Validators.compose([
     Validators.required,
     Validators.pattern('[6789][0-9]{9}')
   ])]
 });
this.getstudents();
 
}


updateForm(key : number)
{
 
  console.log(key);
  let index = this.listService.getIndex(key);
  console.log("index"+index);
  if(index >=0)
  {
  this.upForm = this.fb.group({
   name: [ this.students[index].name,  Validators.compose([
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
    Validators.pattern('^[a-zA-Z]{2}[a-zA-Z ]{0,16}[a-zA-Z]{2}$')
  ])],
   dob : [this.updateDOBDefault , Validators.compose([
    Validators.required,
    validateDOB
  ])],
   city : [this.students[index].city , Validators.compose([
    Validators.required,
    Validators.pattern('^[0-9]{6}$')
  ])],
   mobile : [this.students[index].mobile, Validators.compose([
    Validators.required,
    Validators.pattern('[6789][0-9]{9}')
  ])]
});
  }
}

getstudents(): void{

  this.subsription = this.listService.getStudents().subscribe(students => {
    console.log("change Sttudent");
   
    this.students = students;
    // this.listService.setStudents(this.students);
    console.log('list service called');
    
  });



}  
setDeleteIndex(ind : number,name : string)
{
  
  this.selectedKey = ind;
  console.log(this.selectedKey);
  this.selectDeleteName = name;
}

delete()
{
  if(this.selectedKey>0){
   
    const isDeleted : boolean =this.listService.delete(this.selectedKey);
    console.log(isDeleted);
    
    if(isDeleted)
    {
      
      this.toastr.successToastr(`${this.selectDeleteName} deleted successfully.`, 'Success!',{toastTimeout : 3000});
      
    }
    this.selectedKey=null;
  }
  
}

cancel(){
  this.selectedKey = -1;
  this.updateKey  = null;
}

update(uname : string , umobile : string, udob : string , ucity : string,key : number)
{
  console.log("uname"+key);
  if(this.updateKey == key)
  {
    console.log('true');
    this.updateKey = undefined;
    this.save(key);
  }
  else
  {
    console.log('false'+udob);
    this.updateKey = key;
    console.log(this.updateDOBDefault);
    this.updateDOBDefault = this.convertDate(udob);
    console.log(this.updateDOBDefault);
    
    
    this.updateForm(key);
  }
}

save(key : number)
{
  let index=this.listService.getIndex(key);

  if(index >= 0)
  {
    console.log("save Started");
    
    this.listService.update(this.upForm.get('name').value,this.upForm.get('mobile').value,this.datepipe.transform(this.upForm.get('dob').value, 'dd-MM-yyyy'),this.upForm.get('city').value,key);
    this.toastr.successToastr('Successfully updated.', 'Success!',{toastTimeout : 3000});

  }
}

convertDate(date : string): Date
{
  const str = date.split('-');

    const year = Number(str[2]);
    const month = Number(str[1])-1 ;
    const dateOfMonth = Number(str[0]);
  return new Date(year,month,dateOfMonth);
}

ngOnDestroy()
{
  this.subsription.unsubscribe();
}


}

export function validateDOB(control: AbstractControl) : ValidationErrors | null
{

  let currentDateTime = new Date();
  let oldDateTime = new Date(currentDateTime.getFullYear()-100,currentDateTime.getMonth(),currentDateTime.getDate());
  let newDateTime = new Date(currentDateTime.getFullYear()-10,currentDateTime.getMonth(),currentDateTime.getDate());
  oldDateTime.setHours(0,0,0,0);
  newDateTime.setHours(0,0,0,0);
  currentDateTime.setHours(0,0,0,0);
  // console.log(currentDateTime);
  let controlValue = new Date(control.value);
  controlValue.setHours(0,0,0,0);

  // console.log(currentDateTime+'-'+controlValue)

  if(oldDateTime<controlValue && newDateTime>controlValue)
  {
      // console.log("true");
      
      return null;
  }
  else
  {
    // console.log("false");
    return { pattern : true , status : 'INVALID'};
    
  }
}
