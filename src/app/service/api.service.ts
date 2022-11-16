import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  PostEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/EmployeeList/",data);
  }
  GetEmployee(){
    return this.http.get<any>("http://localhost:3000/EmployeeList/");
  }
  editemployee(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/EmployeeList/"+id , data);

  }
  deleteemployee(id:number){
    return this.http.delete<any>("http://localhost:3000/EmployeeList/"+id);

  }
}
