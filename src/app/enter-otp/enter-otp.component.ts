import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Userstate } from '../Model';

@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.css']
})
export class EnterOTPComponent implements OnInit {
  message:string;
  OTPmodel = new Userstate( '',false, '')
  constructor(private _OtpService: OnboardingService, private router: Router) { }

  ngOnInit() {
    this._OtpService.currentMessage.subscribe(message => this.message = message)

  }
  RedirectToSignUp() {
    console.log("ToSignup")
    this.router.navigate(['/signup'])
  }

  PostToServer() {
    console.log("Posted To server");
    this._OtpService.sendOTP(this.OTPmodel.Otp).subscribe(data => console.log('success'), err => console.log(err));
  }



}
