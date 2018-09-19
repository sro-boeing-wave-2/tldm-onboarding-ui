import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-invited-user-verification',
  templateUrl: './invited-user-verification.component.html',
  styleUrls: ['./invited-user-verification.component.css']
})
export class InvitedUserVerificationComponent implements OnInit {
  inviteForm: FormGroup;
  submitted = false;
  workspace : string;
  error;
  constructor(private form : FormBuilder, private router :Router, private _inviteservice: OnboardingService, private localStorage: LocalStorageService, private Auth : AuthService) { }


  ngOnInit() {
    this.inviteForm = this.form.group({
      workspace: ['', [Validators.required]],
      Password : ['',[Validators.required]]
    })
  }
  get f() { return this.inviteForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.inviteForm.invalid) {
        return;
    }
    this.newMessage();
    this.postToOnboard();


}
postToOnboard(){
  console.log(this.inviteForm.value);

  this._inviteservice.postInviteData(this.inviteForm.value).subscribe(data => {
    this.localStorage.store("otpverifytoken",data["token"]);
    console.log("Token Info",data);
    console.log('Success!', data),
    error => console.log('Error!', error);
    if(data['token'] !== null )
    {
      this.Auth.setStatus(true);
      this.router.navigate(['/signup'])
    }
    else{
      return;
    }
  }, err => {
    this.error=err;
    console.log("Error");
  });
}
ToSignUp(){
  console.log("aaja please");
  console.log(this.inviteForm.value.workspace);
  this.router.navigate(['/signup']);
}

newMessage() {
  console.log(this.inviteForm.value.workspace);
  this._inviteservice.showWorkspace(this.inviteForm.value.workspace);
}

}
