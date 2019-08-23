import { Injectable } from '@angular/core';
import {Student} from '../../student';
import {STUDENTS} from '../../mockStudentList';
import {Observable , of, EMPTY, Subscription} from 'rxjs';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { catchError} from 'rxjs/operators';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  studentList : Student[]=[];
  maxid : number = 4;
  subscription : Subscription;
  constructor(private http : HttpClient) { }

  getStudents():Observable<Student[]>
  {
    console.log("fetch Started");
    this.getStudentsHttp();
    return of(this.studentList);
    // return this.http.get<Student[]>(`http://localhost:8080/mvccrud/rest/list`);
  }
  getStudentsHttp()
  {
    console.log("fetch Started");
    
     this.http.get<Student[]>(`http://localhost:8080/mvccrud/rest/list`)
     .subscribe(
       (data) => {
         console.log(data);
        
         this.studentList.length =0;
        data.forEach(element => {
            this.studentList.push(element);
          });
        });
  }
 
  addst()
  {
    this.studentList.push({
      id : 2,
      name:'sd',
      city : 'sd',
      mobile : 21323232322,
      dob:'dsadad'

    });
  }
  setStudents(st: Student[])
  {
    this.studentList = st;

  }

  update(sname : string , smobile : string , sdob : string , scity : string,index : number)
  {

      console.log("update index"+index);
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/JSON',
          observe : 'response'
          // 'Authorization': 'my-auth-token'
        })
      };
  
     
       const params = {id: index , name : sname , mobile : smobile , dob : sdob , city : scity};
      this.http.post('http://localhost:8080/mvccrud/rest/update',JSON.stringify(params),httpOptions)
        .pipe(
          catchError( err => {
               if (err.status == 200) {
                  // this.studentList.splice(index,0); 
                  console.log("ok");
                  
                this.getStudentsHttp();
                  return EMPTY;
               } else {
                console.log(err.status);
                  this.getStudentsHttp();
                 return EMPTY;
               }
          }))
        .subscribe((data)=> {
          console.log("subscribe");
          
          this.getStudentsHttp();
        });

      console.log('Http ended');
  }


  delete(id : number) : boolean
  {   
    console.log(id);
    
    let index=this.getIndex(id);
    
    console.log(index);
    
    if(index>=0){
       
        this.http.delete(`http://localhost:8080/mvccrud/rest/delete/${id}`,{observe : 'response'}).
        pipe(
          catchError( err => {
               if (err.status == 200) {
                  // this.studentList.splice(index,0); 
                  // this.getPincode();
                  console.log("delete");
                  
                  return EMPTY;
               } else {
                console.log(err.status);

                 return EMPTY;
               }
          }))
        .subscribe((data)=> {
          console.log("data");
          this.getStudentsHttp();
          console.log(data);
      
        });
      }
    return false;      
  }

  getIndex(id : number):number
{
  console.log(id);
  console.log(this.studentList.length);
  let index = -1;
      for(let i=0;i<this.studentList.length;i++) {
        console.log(this.studentList[i].id);
        
        if(this.studentList[i].id == id){
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
          id : this.maxid+1,
          name: sname,
          mobile : parseInt(smobile),
          dob : sdob ,
          city :scity
        
        }
      )
        this.maxid++;
        console.log(this.maxid);
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/JSON',
            // 'Authorization': 'my-auth-token'
          })
        };
    
       
         const params = {name : sname , mobile : smobile , dob : sdob , city : scity};
        this.http.post('http://localhost:8080/mvccrud/rest/save',JSON.stringify(params),httpOptions).subscribe(
          data  => {
          console.log("POST Request is successful ", data);
        
          console.log("data loading");
          
          },
          error  => {
          
          console.log("Error", error);
          
          }
          
          );
        console.log('Http ended');


    // const params = new URLSearchParams();
    // params.set('name',sname);
    // params.set('mobile',smobile);
    // params.set('dob',sdob);
    // params.set('city',scity);

    // console.log('Http started');
    
    // this.http.post(`http://localhost:8080/mvccrud/save`,params).subscribe(
    //   data  => {
    //   console.log("POST Request is successful ", data);
    //   },
    //   error  => {
      
    //   console.log("Error", error);
      
    //   }
      
    //   );
    // console.log('Http ended');
  
  }

}
