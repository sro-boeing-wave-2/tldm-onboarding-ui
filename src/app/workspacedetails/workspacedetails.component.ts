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
import { AuthService } from '../auth.service';
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
  count = 1;
  error;
  errorfornullchannel;
  constructor(private _onboard: OnboardingService, private fb: FormBuilder, private router: Router, private localStorage: LocalStorageService, private Auth : AuthService) { }

  ngOnInit() {
    this._onboard.currentMessageWorkspace.subscribe(workspacename => {this.workspacename = workspacename;
    })

    this.workForm = this.fb.group({
      WorkspaceName: [this.workspacename, Validators.required],
      Channels: this.fb.array([this.createChannel()], Validators.required),
    });
  }

  get f() { return this.workForm.controls; }
  onSubmit() {
    console.log(this.workForm.invalid);
    if(this.workForm.value.Channels[0].ChannelName == "") {
      this.errorfornullchannel = "Please Enter Atleast One Channel Name";
      return;
    }
    this.localStorage.store("workspacewithchannels", this.workForm.value);
    this.router.navigate(['/defaultBots'])
  }

  incrementChannels(){
    this.count++;
    // console.log(this.count);
    if(this.count >=1 && this.count<=3)
    {
      this.addChannel();
    }

    else{

      this.error = "You can't have more than three Default channels";
    }
  }

  addChannel(): void {
    this.channels = this.workForm.get('Channels');
    this.channels.push(this.createChannel());
  }

  createChannel(): FormGroup {
    return this.fb.group({
      ChannelName: [''],
    });
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
