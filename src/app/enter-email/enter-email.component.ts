import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../Model';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit {

  workspace : string;
  userModel = new UserAccount('','','','',false,null);
  constructor(private _emailservice: OnboardingService, private router: Router) { }
  // workspaceModel = new Workspace('',null,false,'');

  ngOnInit() {
    this._emailservice.currentMessage.subscribe(workspace => this.workspace = workspace)
     }
  PostToGmail() {
    console.log("Open Gmail");
    var Email = {
      "email": this.userModel.EmailId
    };
    //this._emailservice.postEmail(this.emailModel).subscribe(data => console.log('Success',
      //error => console.log('Error', error)));
    // this.router.navigate(['enterToken']);
    //console.log(this.emailModel.toString());
    this._emailservice.sendMail(Email).subscribe(data => console.log('success'), err => console.log(err));
  }
  Verify() {
    console.log("enter verification code ")
    this.router.navigate(['/enterOTP']);
  }
  newMessage() {
    this._emailservice.showEmailId(this.userModel.EmailId);
  }

}
