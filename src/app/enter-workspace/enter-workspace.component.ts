import { Component, OnInit } from '@angular/core';
import { Workspace } from '../Model';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Http } from '@angular/http';
import { AuthService } from '../auth.service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-enter-workspace',
  templateUrl: './enter-workspace.component.html',
  styleUrls: ['./enter-workspace.component.css']
})
export class EnterWorkspaceComponent implements OnInit {

  workspaceModel = new Workspace('', '', null, null, null);
  workspacename : string;
  error;
  constructor(private router: Router, private _workspaceservice: OnboardingService, private http: Http, private Auth : AuthService, private localstorage : LocalStorageService) { }

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
      this.sendWorkspace();
      this.newMessage();
    }
  }
  // WorkspaceEnter(){
  //   console.log("navigating to enter email component");
  //   this.router.navigate(['/enterEmail']);
  // }


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
      if(workspacenameObject.WorkspaceName != null){
        console.log("checking----")
        this.Auth.setStatus(true);
        this.router.navigate(['/enterWorkspaceDetails']);
        console.log("checking----still")
      }else {
        return;
    }

    }, err => {
      this.error=err;
      console.log("Error1234");
    });



  }

}
