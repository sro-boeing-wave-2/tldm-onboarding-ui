import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { wrapIntoObservable } from '../../../node_modules/@angular/router/src/utils/collection';
import { Workspace } from '../Model';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router'
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-workspacedetails',
  templateUrl: './workspacedetails.component.html',
  styleUrls: ['./workspacedetails.component.css']
})
export class WorkspacedetailsComponent implements OnInit {
  workForm: FormGroup;
  workspacename: string;
  Invitemembers: any = [];
  channels: any = [];
  workspace: Workspace;
  submitted = false;
  constructor(private _onboard: OnboardingService, private fb: FormBuilder, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this._onboard.currentMessageWorkspace.subscribe(workspacename => this.workspacename = workspacename)

    //this.workspace.WorkspaceName=this.workspacename;
    this.workForm = this.fb.group({
      WorkspaceName: [this.workspacename, Validators.required],

      Channels: this.fb.array([this.createChannel()]),
      // Invitemembers:this.fb.array([this.createMember()]),
    });
  }



  get f() { return this.workForm.controls; }
  onSubmit() {

    // this.localStorage.store("workspacewithchannels", this.workForm.value);

    // this._onboard.postworkspaceDetails(this.workForm.value).subscribe(data => {
    //   console.log('Success!', data);
    //   this._onboard.postworkspaceToChat(data).subscribe(workspace => console.log('Success', workspace))
    // },
    //   error => console.log('Error!', error));

    //  this.router.navigate(['/invite']);
    this.router.navigate(['/defaultBots']);
    // this.router.navigate(['']);

  }



  addChannel(): void {
    this.channels = this.workForm.get('Channels');
    this.channels.push(this.createChannel());
  }

  addMember(): void {
    this.Invitemembers = this.workForm.get('Invitemembers') as FormArray;
    this.Invitemembers.push(this.createMember());
  }

  createChannel(): FormGroup {
    return this.fb.group({
      ChannelName: ''
    });
  }

  createMember(): FormGroup {
    return this.fb.group(
      {
        emailId: '',
        isJoined: false,
        otp: ''
      }
    )
  }
  newMessage() {
    console.log(this.workForm.value);
    this._onboard.showEmailId(this.workForm.value.EmailId);
  }

  // navigateInvite(){
  //   this.router.navigate(['/invite']);
  // }

  // WorkspaceDetails(){
  //   this.workForm.value.Workspaces= [ {
  //     "Name": this.workspace
  //   }];
  //   console.log(this.workForm.value);
  //    this._onboard.postworkspaceDetails(this.workForm.value).subscribe(data => console.log('success'), err => console.log(err));
  // }

  // ///////////////////////////////////////////////////////////////////////////////////////////////////


}
