import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import{HomeComponent} from './home/home.component';
import {EnterWorkspaceComponent} from './enter-workspace/enter-workspace.component';
import {EnterEmailComponent} from './enter-email/enter-email.component';
import{EnterOTPComponent} from './enter-otp/enter-otp.component';
import{LoginComponent} from './login/login.component';
// import {GetStartComponent} from './get-start/get-start.component'
// import{VerifyComponent} from './verify/verify.component'
// import{LoginComponent} from './login/login.component'
// import {TokenComponent} from './token/token.component'
// import {DisplaydataComponent} from './displaydata/displaydata.component'
// import {SignupComponent} from './signup/signup.component'
import { from } from 'rxjs';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { WorkspacedetailsComponent } from './workspacedetails/workspacedetails.component';
const routes :  Routes =[
  {path : '', component : HomeComponent},
  {path : 'enterWorkspace', component : EnterWorkspaceComponent},
  {path : 'enterEmail', component : EnterEmailComponent},
  {path : 'enterOTP', component : EnterOTPComponent},
  {path : 'signup', component : UserdetailsComponent},
  // {path : 'getStarted', component : GetStartComponent},
  // {path : 'user', component : VerifyComponent},
 {path : 'login', component : LoginComponent},
 {path : 'enterWorkspaceDetails', component : WorkspacedetailsComponent},
  // {path : 'verify', component : TokenComponent},
  // {path : 'displaydata', component :DisplaydataComponent},
  // {path : 'signup', component: SignupComponent}
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]

  })

  export class AppRoutingModule{ }
// export const routingComponents = [HomeComponent, GetStartComponent, VerifyComponent, LoginComponent, TokenComponent,DisplaydataComponent,SignupComponent];
export const routingComponents = [HomeComponent,EnterWorkspaceComponent,EnterEmailComponent,UserdetailsComponent,EnterOTPComponent,LoginComponent,WorkspacedetailsComponent];
