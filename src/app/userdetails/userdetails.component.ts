import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import{UserAccount} from '../Model'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '../../../node_modules/@angular/forms';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  registerForm;
  signUpModel = new UserAccount('','','','',false,null)
  constructor( private _signupservice : OnboardingService, private router : Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', Validators.required],
      Designation: ['', [Validators.required]],
      WorkspaceName: ['', [Validators.required]],
  });
  }
  CallToDatabase(){
    console.log(this.signUpModel);
     this._signupservice.PostDataBySignUp(this.signUpModel).subscribe(data => console.log('success'), err => console.log(err));

  }

  ToWorkspaceDetails(){
    console.log("ascCQAW");
    this.router.navigate(['/enterWorkspaceDetails']);
  }

}
