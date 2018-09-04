import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{AppRoutingModule, routingComponents} from './app-routing.module';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MaterialModule } from './materialmodule';
import { EnterOTPComponent } from './enter-otp/enter-otp.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { LoginComponent } from './login/login.component';
import { WorkspacedetailsComponent } from './workspacedetails/workspacedetails.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    EnterOTPComponent,
    UserdetailsComponent,
    LoginComponent,
    WorkspacedetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   // RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports : [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
