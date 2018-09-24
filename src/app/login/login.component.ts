import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginViewModel} from '../Model';
import{TokenParams} from '../Model'
import { OnboardingService } from '../onboarding.service';
import {FormGroup, FormBuilder} from  '@angular/forms';
import {FormControl} from  '@angular/forms';
import{MaterialModule} from '../materialmodule'
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CookieStorage } from 'cookie-storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tokenparam:TokenParams;
  // loginModel = new LoginViewModel('','','')
  constructor(private _loginservice : OnboardingService, private router: Router, private fb: FormBuilder, private localStorage: LocalStorageService, private Auth : AuthService, private cookie: CookieService) { }
   users = [];
   hide: boolean=true;
   error;

   loginForm = this.fb.group({
     EmailId: [''],
     Password: [''],
   });
  ngOnInit() {
    console.log("Hi");
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this._loginservice.showEmailId(this.loginForm.value.EmailId);
    this._loginservice.login(this.loginForm.value).subscribe(tokenInfo => {
      console.log(tokenInfo);
      console.log(tokenInfo["token"]);
      if(tokenInfo != null){
        this.Auth.setStatus(true);
        this.router.navigate(['/workspacelist']);

      }else {
        return;
    }
    const cookie = new CookieStorage();
    cookie.setItem("token", tokenInfo["token"]);
    this.cookie.set("token", tokenInfo["token"]);
      this.localStorage.store("token",tokenInfo["token"]);
      this.localStorage.store("email",this.loginForm.value.EmailId)
      console.log(this.localStorage.retrieve("token"));

    }, err => this.error=err);
  }



}
