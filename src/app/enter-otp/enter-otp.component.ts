import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Userstate } from '../Model';
import{TokenParams} from '../Model';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth.service';
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
  constructor(private _OtpService: OnboardingService, private router: Router,private localStorage: LocalStorageService, private Auth : AuthService) { }

  ngOnInit() {
    this._OtpService.currentMessageEmail.subscribe(message => this.message = message)

  }

  PostToServer() {

    this._OtpService.sendOTP(this.OTPmodel.Otp).subscribe(data => {
      this.localStorage.store("otpverifytoken",data["token"]);
      console.log("Token Info",data);
      console.log('Success!', data),
      error => console.log('Error!', error);
      if(data != null){
        this.Auth.setStatus(true);
        this.router.navigate(['/signup']);

      }else {
        this.router.navigate(['/notfound'])
    }
    }, err => {
      this.error=err;
      console.log("Error");
    });

  }



}
