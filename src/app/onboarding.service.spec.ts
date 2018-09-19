// import { TestBed, inject } from '@angular/core/testing';

// import { OnboardingService } from './onboarding.service';

// describe('OnboardingService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [OnboardingService]
//     });
//   });

//   it('should be created', inject([OnboardingService], (service: OnboardingService) => {
//     expect(service).toBeTruthy();
//   }));
// });
/*------------------------------------------------------------------------------------------------------- */

import { TestBed, inject } from '@angular/core/testing';

import { OnboardingService } from './onboarding.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { LoginViewModel, TokenParams, UserAccount, Workspace } from './Model';
import { LocalStorageService } from 'ngx-webstorage';

describe('OnboardingService', () => {
  let service:OnboardingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [OnboardingService, LocalStorageService]
    });

    // service = TestBed.get(OnboardingService);
  });

  // it('should be able to login',()=>{
  //   const dummyModel:TokenParams  =
  //     {token:"xyz",expiration:"2018-19"};


  //   service.login(this.loginForm.value).subscribe(data=>
  //   {
  //     expect(data.token).toBe(dummyModel.token);
  //   })

  // })

  // it('Should be able to Post User Details',()=>{
  //   service.PostDataBySignUp(this.signupForm.value).subscribe(data=>{
  //     expect().nothing;
  //   })
  // })


  it('Should be created', inject([OnboardingService], (service : OnboardingService )=>{
    // service.PostDataBySignUp(this.signupForm.value).subscribe(data=>{
      expect(service).toBeTruthy();
    }));
  });


    // it('Should able to Get Workspaces',()=>{
    //   const dummyWorkpaces : Workspace[] =[
    //     {WorkspaceName:"sroboeing",PictureUrl:"sro.tldm",channels:"",Userstate:""},
    //     {WorkspaceName:"srosatckroute",PictureUrl:"stack.tldm",channels:"",Userstate:""}
    //   ]

    //   service.getWorkspaces("ssk@gmail.com").subscribe(data=>{
    //     expect(data.length).toBe(2);
    //   })
    // })
// });
