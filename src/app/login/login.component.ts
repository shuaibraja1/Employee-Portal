import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators}from '@angular/forms'
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
public loginform!:FormGroup;
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })

  }
 login(){
  this.http.get<any>("http://localhost:3000/signupusers")
  .subscribe(res=>{
    const user =res.find((a:any)=>{
      return a.email===this.loginform.value.email && a.password===this.loginform.value.password
    });
    if(user){
      this.toast.success({detail:"LOGIN SUCCESS",summary:res.message,duration:5000});
   
      localStorage.setItem("email",this.loginform.value["email"]);
      localStorage.setItem("password",this.loginform.value["password"]);
      this.router.navigate(['/dashboard'])
    }
    else{
      this.toast.warning({detail:"USER NOT FOUND",summary:res.message,duration:5000})
    
    }
  },err=>{
    this.toast.error({detail:"ERROR",summary:"Please connect with Json server",duration:5000})
  })

 }
 
}
