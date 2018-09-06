import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../Model';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-invitemembers',
  templateUrl: './invitemembers.component.html',
  styleUrls: ['./invitemembers.component.css']
})
export class InvitemembersComponent implements OnInit {

  emailForm: FormGroup;
  submitted = false;
  workspace : string;
  userModel = new UserAccount('','','','',false,null,null);
  constructor(private _emailservice: OnboardingService, private router: Router, private form : FormBuilder) { }
  // workspaceModel = new Workspace('',null,false,'');
  ngOnInit() {
    this._emailservice.currentMessageWorkspace.subscribe(workspace => this.workspace = workspace)
    this.emailForm = this.form.group({
      EmailId: ['', [Validators.required, Validators.email]],
    })
     }
     get f() { return this.emailForm.controls; }

     onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.emailForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)')
  }

  PostToGmail() {
    console.log("Open Gmail");
    var Email = {
      "emailId": this.emailForm.value.EmailId,
      "workspace" : this.workspace
    };    this._emailservice.sendInviteMail(Email).subscribe(data => console.log('success'), err => console.log(err));
  }
  Verify() {
    console.log("enter verification code ")
    this.router.navigate(['/enterOTP']);
  }
  newMessage() {
    console.log(this.emailForm.value);
    this._emailservice.showEmailId(this.emailForm.value.EmailId);
  }

}
