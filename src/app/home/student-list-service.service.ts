import { Injectable } from '@angular/core';
import {Student} from '../student';
import {STUDENTS} from '../mockStudentList';
import {Observable , of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  studentList : Student[] = STUDENTS;
  maxKey : number = this.studentList.length;
  constructor() { }

  getStudentList():Observable<Student[]>
  {
  
    return of(this.studentList);
  }

  update(sname : string , smobile : string , sdob : string , scity : string,index : number)
  {

      this.studentList[index].name = sname;
      this.studentList[index].mobile = parseInt(smobile);
      this.studentList[index].dob = sdob;
      this.studentList[index].city = scity;

  }


  delete(key : number) : boolean
  {   
    let index=this.getIndex(key);
    
    if(index>=0){
        this.studentList.splice(index,1);
        return true;
      }
    return false;      
  }

  getIndex(key : number):number
{
  console.log(key);
  let index = -1;
      for(let i=0;i<this.studentList.length;i++) {
        if(this.studentList[i].key == key){
          index = i;
          console.log(index);
          break;
        }
      }
      if(index>=0){
          return index;
      }
  return -1;
}

  
  add(sname : string , smobile : string , sdob : string , scity : string)
  {


      this.studentList.push(
        {
          key : this.maxKey+1,
          name: sname,
          mobile : parseInt(smobile),
          dob : sdob ,
          city :scity
        
        }
      )
        this.maxKey++;
        console.log(this.maxKey);

  }

}
