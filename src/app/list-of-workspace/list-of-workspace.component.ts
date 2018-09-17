import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';
import{TokenParams} from '../Model'

@Component({
  selector: 'app-list-of-workspace',
  templateUrl: './list-of-workspace.component.html',
  styleUrls: ['./list-of-workspace.component.css']
})
export class ListOfWorkspaceComponent implements OnInit {

  workspaces = [];
  email : string;
  _url: string ="http://172.23.238.230:4200";
  currentEmail: string;
  tokenparam:TokenParams;
  constructor(private workspaceservice  : OnboardingService, private router : Router ) { }

  ngOnInit() {

        this.workspaceservice.currentMessageEmail.subscribe(email => {this.currentEmail=email;
        this.workspaceservice.getWorkspaces(this.currentEmail).subscribe(data => {this.workspaces = data})


        })

    }
  EnterWorkspaceName(){
    console.log("ascCQAW");
    this.router.navigate(['/enterWorkspace']);
  }

  submitWorkspace(workspace) {

    //this.workspaceservice.storeWorkspace(workspace);
  }


}
