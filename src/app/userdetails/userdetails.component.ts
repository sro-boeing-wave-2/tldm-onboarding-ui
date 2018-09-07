import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { UserAccount } from '../Model'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  workspace: string;
  signUpModel = new UserAccount('', '', '', '', true, null, null);
  submitted = false;
  constructor(private _signupservice: OnboardingService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this._signupservice.currentMessageWorkspace.subscribe(workspace => this.workspace = workspace)
    console.log(this.workspace);

  }

  signupForm = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    EmailId: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // Workspaces: new FormControl('', Validators.required),
  });
  get f() { return this.signupForm.controls; }

  // signupForm = this.fb.group({
  //   FirstName: [''],
  //   LastName: [''],
  //   EmailId: [''],
  //   Password : [''],
  //   // Isverified : true,
  //   Workspaces : [''],
  //   // UserWorkspaces : []
  // });

  JoinForm = this.fb.group({
    FirstName: [''],
    LastName: [''],
    EmailId: [''],
    Password: [''],
    // Isverified : true,
    Workspaces: [''],
    // UserWorkspaces : []
  });

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      console.log("please ");
      return;
    }
    else {
      console.log("please come")
      this.CallToDatabase();
      this.navigateToInvite();
    }
  }

  CallToDatabase() {
    var JSONForm = this.signupForm.value;
    var workspace = this.signupForm.value.Workspaces;
    console.log("b4", JSONForm);
    this.signupForm.value.Workspaces = [{
      "Name": this.workspace
    }];
    console.log("after", this.signupForm.value);
    console.log(this.signupForm.value);
    this._signupservice.PostDataBySignUp(this.signupForm.value).subscribe(data => {
      console.log(data);
      console.log("jsonwith workspace", workspace);
      //console.log(JSONForm.json()["Workspace"]);
      console.log("workspace name", workspace);
      console.log(JSON.stringify(JSONForm));
      JSONForm["id"] = data["id"];
      console.log(data["id"]);
      console.log("workspace" + JSON.stringify(JSONForm));
      // this.JoinForm.value.EmailId = this.signupForm.value.EmailId;
      // this.JoinForm.value.FirstName = this.signupForm.value.FirstName;
      // this.JoinForm.value.LastName = this.signupForm.value.LastName;
      // this.JoinForm.value.Password = this.signupForm.value.Password;
      // this.JoinForm.value.Workspaces = this.signupForm.value.Workspaces.Name;
      console.log("here is shit ", workspace);
      this._signupservice.postSignupDataToChat(JSONForm, workspace).subscribe(workspace => console.log('Success', workspace))
    });
    //this._signupservice.postSignupDataToChat(this.data, this.workspace).subscribe();
  }

  // ToWorkspaceDetails(){
  //   console.log("ascCQAW");
  //   this.router.navigate(['/enterWorkspaceDetails']);
  // }
  navigateToInvite() {
    this.router.navigate(['/invite']);
  }
}
