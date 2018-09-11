import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Userstate } from '../Model';
import{TokenParams} from '../Model';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.css']
})
export class EnterOTPComponent implements OnInit {
  message:string;
  error;
  tokenparam:TokenParams;
  OTPmodel = new Userstate( '',false, '')
  constructor(private _OtpService: OnboardingService, private router: Router,private localStorage: LocalStorageService) { }

  ngOnInit() {
    this._OtpService.currentMessageEmail.subscribe(message => this.message = message)

  }
  RedirectToSignUp() {
    console.log("ToSignup")
    this.router.navigate(['/signup'])
  }

  PostToServer() {
    // console.log("Posted To server");
    // console.log(this.OTPmodel.Otp);
    // this._OtpService.sendOTP(this.OTPmodel.Otp).subscribe(data => {
    //   // console.log("Unauthorised",data)
    //   this._OtpService.AccessToken=data['token'];

    //   if(data['token'] !== null )
    //   {
    //     this.RedirectToSignUp();
    //   }

    //   else{

    //     return;
    //   }
    //   }, err => this.error=err);

    this._OtpService.sendOTP(this.OTPmodel.Otp).subscribe(data => {
      this.localStorage.store("otpverifytoken",data["token"]);
      console.log("Token Info",data);
      console.log('Success!', data),
      error => console.log('Error!', error);
      if(data['token'] !== null )
      {
        this.RedirectToSignUp();
      }

      else{

        return;
      }
    }, err => {
      this.error=err;
      console.log("Error");
    });

  }



}
