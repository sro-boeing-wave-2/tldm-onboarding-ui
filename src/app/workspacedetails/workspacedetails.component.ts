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
    Invitemembers: any = [];
  channels:any = [];
  workspace : Workspace;
  constructor(private _onboard:OnboardingService,private fb: FormBuilder, private router:Router) { }

  ngOnInit() {
    this.workForm=this.fb.group({
      WorkspaceName :['',Validators.required],

      channels:this.fb.array([this.createChannel()]),
      Invitemembers:this.fb.array([this.createMember()]),
  });
}

onSubmit(form: FormGroup) {
  // console.log('Valid?', form.valid); // true or false
  // console.log('Id', form.value.id);
  console.log('Workspace', form.value.WorkspaceName);
  // console.log('PlainText', form.value.plaintext);
  // console.log('PinStauts',form.value.pinstatus);
  console.log('Channels',form.value.channels);
  console.log('Members',form.value.members)

  this.workspace = new Workspace(form.value.WorkspaceName,null,form.value.channels,form.value.Invitemembers);


   this._onboard.postworkspace(  this.workspace).subscribe(data=>console.log('Success!',data),
   error=>console.log('Error!',error));
    // this.router.navigate(['']);

}

addChannel(): void {
   this.channels = this.workForm.get('channels') as FormArray;
   this.channels.push(this.createChannel());
 }

 addMember():void{
   this.Invitemembers=this.workForm.get('members') as FormArray;
   this.Invitemembers.push(this.createMember());
 }

 createChannel(): FormGroup {
   return this.fb.group({
     channelName : ''
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
// ///////////////////////////////////////////////////////////////////////////////////////////////////


}
