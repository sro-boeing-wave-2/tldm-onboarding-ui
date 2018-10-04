import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { UserAccount } from '../Model'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  workspace: string;
  email: string;
  error1: string;
  error2 : string;
  signUpModel = new UserAccount('', '', '', '', true, null, null);
  submitted = false;
  constructor(private _signupservice: OnboardingService, private router: Router, private fb: FormBuilder, private _signupServicetoChat: ChatService, private Auth: AuthService,
    private toast : ToastrService) { }

  ngOnInit() {
    this._signupservice.currentMessageWorkspace.subscribe(workspace => this.workspace = workspace)
    console.log(this.workspace);
    this._signupservice.currentMessageEmail.subscribe(email => this.email = email)
    console.log(this.email);

    var x = document.getElementById("toast");
    console.log("inside launch toast");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  signupForm = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // confirmPassword : new FormControl('',Validators.required),
    EmailId: new FormControl('', [Validators.required, Validators.email]),
  });
  get f() { return this.signupForm.controls; }

  JoinForm = this.fb.group({
    FirstName: [''],
    LastName: [''],
    EmailId: [''],
    Password: [''],
    // Isverified : true,
    Workspaces: [''],
    // UserWorkspaces : []
  });

  sendWorkspaceToInvite(){

    console.log(this.workspace);
    this._signupservice.showWorkspace(this.workspace);

}
  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    else {
      this.CallToDatabase();
    }
  }

  CallToDatabase() {
    var JSONForm = this.signupForm.value;
    var EmailId = this.signupForm.value.EmailId;

    var workspace = this.signupForm.value.Workspaces;
    console.log("b4", JSONForm);
    // this.signupForm.value.EmailId = this.email;
    this.signupForm.value.Workspaces = [{
      "Name": this.workspace
    }];
    // this.signupForm.value.EmailId = this.email;
    console.log("after", this.signupForm.value);
    console.log(this.signupForm.value);
    // if(EmailId == this.email || this.email == null) {
    this._signupservice.PostDataBySignUp(this.signupForm.value).subscribe(data => {

        console.log(data);
        workspace = data["Workspaces"];
        console.log(workspace);
        console.log("jsonwith workspace", workspace);
        //console.log(JSONForm.json()["Workspace"]);
        console.log("workspace name", workspace);
        console.log(JSON.stringify(JSONForm));
        JSONForm["id"] = data["id"];
        console.log(data["id"]);
        console.log("workspace" + JSON.stringify(JSONForm));
        console.log("here is shit ", workspace);
        // this.router.navigate(['/invite']);
        if (data != null) {
          this.Auth.setStatus(true);
          this.router.navigate(['/invite']);

        } else {
          this.router.navigate(['/notfound'])
        }

        this._signupServicetoChat.postSignupDataToChat(JSONForm, this.workspace).subscribe(workspace => console.log('Success', JSONForm))
      }
    , err => {
      this.error1 = err;
      console.log("Error");
    })
  }

  }





