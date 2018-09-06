import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-workspace',
  templateUrl: './list-of-workspace.component.html',
  styleUrls: ['./list-of-workspace.component.css']
})
export class ListOfWorkspaceComponent implements OnInit {

  workspaces = [];
  email : string;
  _url: string ="http://172.23.238.182:9999";
  currentEmail: string;
  constructor(private workspaceservice  : OnboardingService, private router : Router ) { }

  ngOnInit() {
    //this.workspaceservice.getWorkspaces(this.email).subscribe(data => this.workspaces=data, err => console.log(err));
    this.workspaceservice.currentMessageEmail.subscribe(email => this.currentEmail=email);
    this.workspaces = [
      "TLDM"
    ]
  }
  // getWorkspaceList(){
  //   console.log(this.email);

  // }
  EnterWorkspaceName(){
    console.log("ascCQAW");
    this.router.navigate(['/enterWorkspace']);
  }

  submitWorkspace(workspace) {

    //this.workspaceservice.storeWorkspace(workspace);
  }


}
