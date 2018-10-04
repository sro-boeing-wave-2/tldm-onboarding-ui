import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';
import { TokenParams } from '../Model'
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-list-of-workspace',
  templateUrl: './list-of-workspace.component.html',
  styleUrls: ['./list-of-workspace.component.css']
})
export class ListOfWorkspaceComponent implements OnInit {

  workspaces = [];
  email: string;
  // _url: string ="http://172.23.238.229:2100";
  // redirect to chat ui
  // _url: string = "http://13.233.42.222/chat";
  _url: string ="http://172.23.238.206:7001/chat";
  currentEmail: string;
  token: string;
  tokenparam: TokenParams;
  constructor(private workspaceservice: OnboardingService, private router: Router, private localstorage: LocalStorageService) { }

  ngOnInit() {
    this.token = this.localstorage.retrieve('token');
    this.email = this.localstorage.retrieve('email');

    this.workspaceservice.currentMessageEmail.subscribe(email => {
    this.currentEmail = email;
      this.workspaceservice.getWorkspaces(this.email).subscribe(data => { this.workspaces = data })
    })
  }

  // public goToChatUI(workspace: string) {
  //   this.localstorage.store("workspacename",workspace);
  //   this.router.navigateByUrl(`${this._url}?email=${this.currentEmail}&workspace=${workspace}`).then();
  //   this.workspaceservice.enterChatUI(`${this._url}?email=${this.currentEmail}&workspace=${workspace}`).subscribe(data => console.log(data),err => console.log(err));
  // }




}
