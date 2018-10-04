import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../Model';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
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
  constructor(private _emailservice: OnboardingService, private router: Router, private form : FormBuilder, private toast : ToastrService) { }
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
      else{
        this.PostToGmail();
        this.newMessage();
        // alert('SUCCESS!! :-)')
      }


  }

  sendWorkspaceToInvite(){

    console.log(this.workspace);
    this._emailservice.showWorkspace(this.workspace);

}

  PostToGmail() {
    console.log("Open Gmail");
    var Email = {
      "emailId": this.emailForm.value.EmailId,
      "workspace" : this.workspace
    };
    console.log(Email);
    //  this._emailservice.sendInviteMail(Email).subscribe(data => console.log(data),
    //  err => console.log(err));
     this._emailservice.sendInviteMail(Email).subscribe(data => {
      console.log(data["emailId"]);
      if(data["emailId"] != null){
         // this.toast.success("Email is sent successfully!");
         {
          var x = document.getElementById("toast");
          console.log("inside launch toast");
          x.className = "show";
          setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }

      }

    }, err => {

      console.log("Error");
    });

  }

  newMessage() {
    console.log(this.emailForm.value);
    this._emailservice.showEmailId(this.emailForm.value.EmailId);
  }



}
