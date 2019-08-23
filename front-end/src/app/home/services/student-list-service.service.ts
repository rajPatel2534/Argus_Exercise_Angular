import { Injectable } from '@angular/core';
import { Student } from '../../student';
import { STUDENTS } from '../../mockStudentList';
import { Observable, of, EMPTY, Subscription } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  studentList: Student[] = [];
  subscription: Subscription;
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    this.getStudentsHttp();
    return of(this.studentList);
  }
  getStudentsHttp() {
    this.http.get<Student[]>(`http://localhost:8080/mvccrud/rest/list`)
      .subscribe(
        (data) => {
          this.studentList.length = 0;
          data.forEach(element => {
            this.studentList.push(element);
          });
        });
  }

  setStudents(st: Student[]) {
    this.studentList = st;

  }

  update(sname: string, smobile: string, sdob: string, scity: string, index: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/JSON',
        observe: 'response'
      })
    };


    const params = { id: index, name: sname, mobile: smobile, dob: sdob, city: scity };
    this.http.post('http://localhost:8080/mvccrud/rest/update', JSON.stringify(params), httpOptions)
      .pipe(
        catchError(err => {
          if (err.status == 200) {
            this.getStudentsHttp();
            return EMPTY;
          } else {
            this.getStudentsHttp();
            return EMPTY;
          }
        }))
      .subscribe((data) => {
        this.getStudentsHttp();
      });

  }


  delete(id: number): boolean {

    let index = this.getIndex(id);
    if (index >= 0) {
      this.http.delete(`http://localhost:8080/mvccrud/rest/delete/${id}`, { observe: 'response' }).
        pipe(
          catchError(err => {
            if (err.status == 200) {
              return EMPTY;
            } else {
              return EMPTY;
            }
          }))
        .subscribe((data) => {
          this.getStudentsHttp();
        });
    }
    return false;
  }

  getIndex(id: number): number {
    let index = -1;
    for (let i = 0; i < this.studentList.length; i++) {
      if (this.studentList[i].id == id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      return index;
    }
    return -1;
  }


  add(sname: string, smobile: string, sdob: string, scity: string) {


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/JSON',
      })
    };


    const params = { name: sname, mobile: smobile, dob: sdob, city: scity };
    this.http.post('http://localhost:8080/mvccrud/rest/save', JSON.stringify(params), httpOptions).subscribe(
      data => {
        this.studentList.push(
          {
            id: data['id'],
            name: sname,
            mobile: parseInt(smobile),
            dob: sdob,
            city: scity

          }
          
        )
        console.log(this.studentList);

      },
      error => {
      }
    );

  }

}
