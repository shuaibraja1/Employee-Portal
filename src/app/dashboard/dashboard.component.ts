import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['EmployeeId', 'EmployeeName','date', 'skill', 'telephone','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(public router : Router,public dialog: MatDialog,private http:HttpClient,private api:ApiService) { }

  ngOnInit(): void {
    this.Getallemployees();
  }
  openDialog() {
     this.dialog.open(DialogComponent,{
      width:'30%'
     }).afterClosed().subscribe(val=>{
      if(val='save'){
        this.Getallemployees();
      }
     })
  }
  Getallemployees(){
  this.api.GetEmployee().subscribe(res=>{
    this.dataSource=new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  },err =>{
    alert("Error while adding the product")

  });
  }
  editEmployee(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val='update'){
        this.Getallemployees();
      }
     })
  }
  delectemployee(id:number){
this.api.deleteemployee(id).subscribe({
  next:(res=>{
    alert("Employee Deleted Successfully")
    this.Getallemployees();
  }),error(err) {
    alert("Error While Deleting record")
  },
})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}


