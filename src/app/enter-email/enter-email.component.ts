import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../Model';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  workspace : string;
  userModel = new UserAccount('','','','',false,null,null);
  constructor(private _emailservice: OnboardingService, private router: Router, private form : FormBuilder, private Auth : AuthService,
    private toast : ToastrService ) { }
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

      this.PostToGmail();
      this.newMessage();
      var x = document.getElementById("toast");
      console.log("inside launch toast");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      // this.Verify();
  }

  PostToGmail() {
    console.log("Open Gmail");
    var Email = {
      "emailId": this.emailForm.value.EmailId,
      "workspace" : this.workspace
    };
    //this._emailservice.postEmail(this.emailModel).subscribe(data => console.log('Success',
      //error => console.log('Error', error)));
    // this.router.navigate(['enterToken']);
    //console.log(this.emailModel.toString());
    this._emailservice.sendMail(Email).subscribe(data =>{
      if(data != null){
        this.Auth.setStatus(true);
        // this.router.navigate(['/enterOTP']);

      }else {
        // this.router.navigate(['/notfound'])
    }
  });
  }

  newMessage() {
    console.log(this.emailForm.value);
    this._emailservice.showEmailId(this.emailForm.value.EmailId);
  }

}
