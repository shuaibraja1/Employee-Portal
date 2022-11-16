import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './login/login.component';
import{SignupComponent}from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CactivateGuard } from "./cactivate.guard";
import { DialogComponent } from './dialog/dialog.component';
const routes: Routes = [
{path:'',redirectTo:'login',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
{path:'dashboard',component:DashboardComponent,canActivate:[CactivateGuard]},
{path:'dialog',component:DialogComponent,canActivate:[CactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
