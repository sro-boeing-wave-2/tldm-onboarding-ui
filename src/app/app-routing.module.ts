import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EnterWorkspaceComponent } from './enter-workspace/enter-workspace.component';
import { EnterEmailComponent } from './enter-email/enter-email.component';
import { EnterOTPComponent } from './enter-otp/enter-otp.component';
import { LoginComponent } from './login/login.component';
import { ListOfWorkspaceComponent } from './list-of-workspace/list-of-workspace.component'
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { WorkspacedetailsComponent } from './workspacedetails/workspacedetails.component';
import { InvitedUserVerificationComponent } from './invited-user-verification/invited-user-verification.component'
import { InvitemembersComponent } from './invitemembers/invitemembers.component';
import { AddDefaultBotsComponent } from './add-default-bots/add-default-bots.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

import { from } from 'rxjs';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enterWorkspace', component: EnterWorkspaceComponent },
  { path: 'enterWorkspaceDetails', component: WorkspacedetailsComponent, canActivate: [AuthGuard]},
  { path: 'defaultBots', component: AddDefaultBotsComponent },
  { path: 'enterEmail', component: EnterEmailComponent, canActivate: [AuthGuard] },
  { path: 'enterOTP', component: EnterOTPComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: UserdetailsComponent, canActivate: [AuthGuard]},
  { path: 'invite', component: InvitemembersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'workspacelist', component: ListOfWorkspaceComponent , canActivate: [AuthGuard]},
  { path: 'invitedUserVerify', component: InvitedUserVerificationComponent },
  { path: 'pagenotfound', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})

export class AppRoutingModule { }
// export const routingComponents = [HomeComponent, GetStartComponent, VerifyComponent, LoginComponent, TokenComponent,DisplaydataComponent,SignupComponent];
export const routingComponents =
  [
    HomeComponent, EnterWorkspaceComponent,
    EnterEmailComponent, AddDefaultBotsComponent,
    InvitemembersComponent, UserdetailsComponent,
    EnterOTPComponent, LoginComponent,
    WorkspacedetailsComponent, ListOfWorkspaceComponent,
    InvitedUserVerificationComponent,PageNotFoundComponent,
  ];
