import { Component, OnInit } from '@angular/core';
import { FormsModule,FormArray,FormBuilder,FormGroup, Validators} from '@angular/forms';
//import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { wrapIntoObservable } from '../../../node_modules/@angular/router/src/utils/collection';
import { Workspace } from '../Model';
import { OnboardingService } from '../onboarding.service';
import{Router} from '@angular/router'
@Component({
  selector: 'app-workspacedetails',
  templateUrl: './workspacedetails.component.html',
  styleUrls: ['./workspacedetails.component.css']
})
export class WorkspacedetailsComponent implements OnInit {
    workForm: FormGroup;
    workspacename : string;
    Invitemembers: any = [];
  channels:any =[];
  workspace : Workspace;
  constructor(private _onboard:OnboardingService,private fb: FormBuilder, private router:Router) { }

  ngOnInit() {
    this._onboard.currentMessageWorkspace.subscribe(workspacename => this.workspacename = workspacename)

    //this.workspace.WorkspaceName=this.workspacename;
    this.workForm=this.fb.group({
      WorkspaceName :[this.workspacename,Validators.required],

      Channels:this.fb.array([this.createChannel()]),
      // Invitemembers:this.fb.array([this.createMember()]),
  });
}



get f() { return this.workForm.controls; }
onSubmit() {
  // console.log('Valid?', form.valid); // true or false
  // console.log('Id', form.value.id);
  // console.log('Workspace', form.value.WorkspaceName);
  // // console.log('PlainText', form.value.plaintext);
  // // console.log('PinStauts',form.value.pinstatus);
  // console.log('Channels',form.value.channels);
  // console.log('Invitemembers',form.value.Invitemembers)

  // this.workspace = new Workspace(form.value.WorkspaceName,null,form.value.channels,form.value.Invitemembers);
  console.log(this.workForm.value);

   this._onboard.postworkspaceDetails(this.workForm.value).subscribe(data=>console.log('Success!',data),
   error=>console.log('Error!',error));
   this.router.navigate(['/invite']);
    // this.router.navigate(['']);

}

addChannel(): void {
   this.channels = this.workForm.get('Channels');
   this.channels.push(this.createChannel());
 }

 addMember():void{
   this.Invitemembers=this.workForm.get('Invitemembers') as FormArray;
   this.Invitemembers.push(this.createMember());
 }

 createChannel(): FormGroup {
   return this.fb.group({
     ChannelName : ''
   });
 }

 createMember():FormGroup{
   return this.fb.group(
     {
       emailId : '',
       isJoined : false,
       otp : ''
     }
   )
 }
 newMessage() {
  console.log(this.workForm.value);
  this._onboard.showEmailId(this.workForm.value.EmailId);
}

navigateInvite(){
  this.router.navigate(['/invite']);
}

// WorkspaceDetails(){
//   this.workForm.value.Workspaces= [ {
//     "Name": this.workspace
//   }];
//   console.log(this.workForm.value);
//    this._onboard.postworkspaceDetails(this.workForm.value).subscribe(data => console.log('success'), err => console.log(err));
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////


}
