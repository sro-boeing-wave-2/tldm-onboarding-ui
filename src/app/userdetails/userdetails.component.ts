import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import{UserAccount} from '../Model'
import { Router } from '@angular/router';
import {FormGroup, FormBuilder} from  '@angular/forms';
import {FormControl} from  '@angular/forms';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  workspace : string;
  signUpModel = new UserAccount('','','','',true,null,null)
  constructor( private _signupservice : OnboardingService, private router : Router,private fb: FormBuilder) { }

  ngOnInit() {
    this._signupservice.currentMessageWorkspace.subscribe(workspace => this.workspace = workspace)
    console.log(this.workspace);

  }


  signupForm = this.fb.group({
    FirstName: [''],
    LastName: [''],
    EmailId: [''],
    Password : [''],
    // Isverified : true,
    Workspaces : [''],
    // UserWorkspaces : []


  });

  CallToDatabase(){
    this.signupForm.value.Workspaces= [ {
      "Name": this.workspace
    }];
    console.log(this.signupForm.value);
     this._signupservice.PostDataBySignUp(this.signupForm.value).subscribe(data => console.log('success'), err => console.log(err));

  }

  ToWorkspaceDetails(){
    console.log("ascCQAW");
    this.router.navigate(['/enterWorkspaceDetails']);
  }

}
