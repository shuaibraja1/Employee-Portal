import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { MatDialogRef ,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  EmployeeForm !:FormGroup;
  actionbtn : string='save';

  constructor(private formbulider:FormBuilder,private http:HttpClient,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public Editdata : any,
    private dialogref:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.EmployeeForm=this.formbulider.group({
     EmployeeId :['',Validators.required],
     EmployeeName :['',Validators.required],
     date :['',Validators.required],
     skill :['',Validators.required],
     telephone :['',Validators.required]

    })
    if(this.Editdata){
      this.actionbtn ="Update"
      this.EmployeeForm.controls['EmployeeId'].setValue(this.Editdata.EmployeeId);
      this.EmployeeForm.controls['EmployeeName'].setValue(this.Editdata.EmployeeName);
      this.EmployeeForm.controls['date'].setValue(this.Editdata.date);
      this.EmployeeForm.controls['skill'].setValue(this.Editdata.skill);
      this.EmployeeForm.controls['telephone'].setValue(this.Editdata.telephone);
    }
  }
  AddEmployee(){
   if(!this.Editdata){
    if(this.EmployeeForm.valid){
      this.api.PostEmployee(this.EmployeeForm.value).subscribe({
        next:(res=>{
          alert("Employee Added Successfully")
          this.EmployeeForm.reset();
          this.dialogref.close('save');
        }),error(err) {
          alert("Error While Adding the Employee")
        },
      })
     }
   }else{
    this.updatedata()
   }
   }
   updatedata(){
    this.api.editemployee(this.EmployeeForm.value,this.Editdata.id).subscribe({
      next:(res=>{
        alert("Employee Updated successfully")
        this.EmployeeForm.reset();
        this.dialogref.close('update');
      }),error(err) {
        alert("Error While Updateing ")
      },
    })
   }
  }
