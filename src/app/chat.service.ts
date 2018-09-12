import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError } from '../../node_modules/rxjs';
import { LoginViewModel, UserAccount, Workspace } from './Model'
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TokenParams } from './Model';
import { headersToString } from 'selenium-webdriver/http';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { catchError } from 'rxjs/operators';
//import { throwError } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private _ipaddress1 = "http://172.23.238.230:5004";
  private _ipaddress1 = "http://172.23.238.165:7000/connect";
  private workspaceobjecForChat = `${this._ipaddress1}/api/chat/workspaces`;
  private _signupUrlChatApi = `${this._ipaddress1}/api/chat/workspaces/user/`;

  constructor(public http: HttpClient, private localStorage: LocalStorageService) { }

  postworkspaceToChat(workspaceWithBots: any) {
    return this.http.post(this.workspaceobjecForChat, workspaceWithBots, httpOptions);
  }

  postSignupDataToChat(signup: any, workspace: string) {
    console.log(workspace);
    return this.http.put(`${this._signupUrlChatApi}${workspace}`, signup);
  }

}
