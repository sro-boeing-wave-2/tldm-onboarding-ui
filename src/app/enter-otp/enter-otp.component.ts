import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  orderObj;
  otp : string;
  workspace : string;
  OTPmodel = new Userstate( '',false, '')
  constructor(private _OtpService: OnboardingService, private router: Router,private localStorage: LocalStorageService, private Auth : AuthService,
   private route : ActivatedRoute) { }

  ngOnInit() {
    this._OtpService.currentMessageEmail.subscribe(message => this.message = message);
    this.route.queryParamMap.subscribe(params => {
      this.orderObj = { ...params.keys, ...params };
    });
   this.otp =this.orderObj["params"]["otp"];
   this.workspace = this.orderObj["params"]["workspace"];
   this.sendWorkspaceToSignup();
  //  this.PostToServer();
  }

  sendWorkspaceToSignup(){

      console.log(this.workspace);
      this._OtpService.showWorkspace(this.workspace);

  }

  PostToServer() {
    console.log(this.otp, this.workspace);
    this._OtpService.sendOTP(this.otp).subscribe(data => {
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
