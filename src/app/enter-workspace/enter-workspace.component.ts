import { Component, OnInit } from '@angular/core';
import{Workspace} from '../Model';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-enter-workspace',
  templateUrl: './enter-workspace.component.html',
  styleUrls: ['./enter-workspace.component.css']
})
export class EnterWorkspaceComponent implements OnInit {

  workspaceModel = new Workspace('','',null,null);
  constructor(private router : Router, private _workspaceservice : OnboardingService) { }

  ngOnInit() {
  }
  WorkspaceEnter(){
    console.log("navigating to enter email component");
    this.router.navigate(['/enterEmail']);
  }

  newMessage() {
    console.log(this.workspaceModel.WorkspaceName);
    this._workspaceservice.showWorkspace(this.workspaceModel.WorkspaceName);
  }
}
