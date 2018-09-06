import { Component, OnInit } from '@angular/core';
import { Workspace } from '../Model';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-enter-workspace',
  templateUrl: './enter-workspace.component.html',
  styleUrls: ['./enter-workspace.component.css']
})
export class EnterWorkspaceComponent implements OnInit {

  workspaceModel = new Workspace('', '', null, null, null);
  constructor(private router: Router, private _workspaceservice: OnboardingService, private http: Http) { }

  ngOnInit() {
  }


  onSubmit() {
    //  this.WorkspaceEnter();
    console.log("csaca")
    if (this.workspaceModel.WorkspaceName == "") {
      console.log("in if condition");
      window.alert("Enter a name");
    }
    else {
      this.newMessage();
      this.sendWorkspace();
      this.ToWorkspaceDetails()
    }
  }
  // WorkspaceEnter(){
  //   console.log("navigating to enter email component");
  //   this.router.navigate(['/enterEmail']);
  // }

  ToWorkspaceDetails() {
    console.log("ascCQAW");
    this.router.navigate(['/enterWorkspaceDetails']);
  }

  newMessage() {
    console.log(this.workspaceModel.WorkspaceName);
    this._workspaceservice.showWorkspace(this.workspaceModel.WorkspaceName);
  }

  sendWorkspace() {
    var workspacenameObject = {
      "WorkspaceName": this.workspaceModel.WorkspaceName,
    };
    console.log(workspacenameObject);
    this._workspaceservice.postworkspace(workspacenameObject).subscribe(data => {
      console.log('Success!', data),
      error => console.log('Error!', error);
    });

  }

}
