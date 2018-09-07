import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invited-user-verification',
  templateUrl: './invited-user-verification.component.html',
  styleUrls: ['./invited-user-verification.component.css']
})
export class InvitedUserVerificationComponent implements OnInit {
  inviteForm: FormGroup;
  submitted = false;
  workspace : string;
  constructor(private form : FormBuilder, private router :Router, private _inviteservice: OnboardingService) { }


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
    this.ToSignUp();

}
postToOnboard(){
  console.log(this.inviteForm.value);

  this._inviteservice.postInviteData(this.inviteForm.value).subscribe(data => {
    console.log('Success!', data),
    error => console.log('Error!', error);
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
