import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginViewModel} from '../Model';
import{TokenParams} from '../Model'
import { OnboardingService } from '../onboarding.service';
import {FormGroup, FormBuilder} from  '@angular/forms';
import {FormControl} from  '@angular/forms';
import{MaterialModule} from '../materialmodule'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tokenparam:TokenParams;
  // loginModel = new LoginViewModel('','','')
  constructor(private _loginservice : OnboardingService, private router: Router, private fb: FormBuilder) { }
   users = [];
  ngOnInit() {
  }
  getLogged() {
    console.log("Open Gmail");
    console.log(this.loginForm.value);
    this._loginservice.login(this.loginForm.value).subscribe(data => {
    this.tokenparam = data;
    this._loginservice.AccessToken=this.tokenparam.token;

    });
    // this.router.navigate(['/getStarted']);
  }
  hide: boolean=true;

  loginForm = this.fb.group({
    EmailId: [''],
    Password: [''],
  });
 toWorkspaceList(){
   this.router.navigate(['/workspacelist'])
 }


}
