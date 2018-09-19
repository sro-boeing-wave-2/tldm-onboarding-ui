import { TestBed, inject } from '@angular/core/testing';

import { OnboardingService } from './onboarding.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { LoginViewModel, TokenParams, UserAccount, Workspace } from './Model';

describe('OnboardingService', () => {
  let service:OnboardingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [OnboardingService]
    });

    service = TestBed.get(OnboardingService);
  });

  it('should be able to login',()=>{
    const dummyModel:TokenParams  =
      {token:"xyz",expiration:"2018-19"};


    service.login(new LoginViewModel('abc','123','sro')).subscribe(data=>
    {
      expect(data.token).toBe(dummyModel.token);
    })

  })

  it('Should be able to Post User Details',()=>{
    service.PostDataBySignUp(new UserAccount('','','','',false,'')).subscribe(data=>{
      expect().nothing;
    })
  })


    it('Should be able to Get Users',()=>{
      const dummyUsers : UserAccount[] = [
      ];
      //   {FirstName:"Sudarshan",LastName:"Kumar",EmailId:"ssk@gmail.com",Password:"ssk123",Workspaces:{}},
      //   {FirstName:"Rahul",LastName:"Kumar",EmailId:"rsk@gmail.com",Password:"rsk123",Workspaces:{}}
      // ];

      service.getUsers().subscribe(data=>{
        expect(data.length).toBe(0);
        expect(data).toBe(dummyUsers);
      })
    })


    it('Should able to Get Workspaces',()=>{
      const dummyWorkpaces : Workspace[] =[
        {WorkspaceName:"sroboeing",PictureUrl:"sro.tldm",channels:"",Userstate:""},
        {WorkspaceName:"srosatckroute",PictureUrl:"stack.tldm",channels:"",Userstate:""}
      ]

      service.getWorkspaces("ssk@gmail.com").subscribe(data=>{
        expect(data.length).toBe(2);
      })
    })
});
