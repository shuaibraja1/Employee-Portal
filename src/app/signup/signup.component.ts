import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{FormBuilder, Validators}from '@angular/forms';
import{FormGroup}from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupform !:FormGroup;
 
  constructor(private rtr:Router,private formbuilder:FormBuilder,private http:HttpClient,private toast:NgToastService) { }

  ngOnInit(): void {
    this.signupform = this.formbuilder.group({
        fullname:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.minLength(5)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        mobile:['',[Validators.required,Validators.pattern('^[0-9]+$'),Validators.minLength(10),Validators.maxLength(10)]]

    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupusers ",this.signupform.value)
    .subscribe(res=>{
      
      this.toast.success({detail:"SIGNUP SUCCESS",summary:res.message,duration:5000});
      this.signupform.reset();
      this.rtr.navigate(["/login"]);
    },err=>{
     
      this.toast.error({detail:"ERROR",summary:"Please connect with Json server",duration:5000});
    })
  }
}