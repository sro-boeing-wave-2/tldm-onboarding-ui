import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import{UserAccount} from '../Model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  signUpModel = new UserAccount('','','','',false,null)
  constructor( private _signupservice : OnboardingService, private router : Router) { }

  ngOnInit() {
  }
  CallToDatabase(){
    console.log(this.signUpModel);
     this._signupservice.PostDataBySignUp(this.signUpModel).subscribe(data => console.log('success'), err => console.log(err));

  }

  ToWorkspaceDetails(){
    console.log("ascCQAW");
    this.router.navigate(['/enterWorkspaceDetails']);
  }

}
