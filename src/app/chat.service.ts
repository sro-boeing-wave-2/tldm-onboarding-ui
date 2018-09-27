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
import { environment } from '../environments/environment.prod';
//import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private _ipaddress1 = "http://172.23.238.230:5004";
  // private _ipaddress1 = "http://172.23.238.165:7000/connect";
  baseUrl = environment.baseUrlforChat
  // private _ipaddress1 = "http://172.23.238.206:7001/connect";
  // private _ipaddress1 ="http://localhost:80";
  private workspaceobjecForChat = `${this.baseUrl}`;
  private _signupUrlChatApi = `${this.baseUrl}/`;

  constructor(public http: HttpClient, private localStorage: LocalStorageService) { }

  postworkspaceToChat(workspaceWithBots: any) {

    return this.http.post(this.workspaceobjecForChat, workspaceWithBots).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  postSignupDataToChat(signup: any, workspace: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.retrieve("otpverifytoken")}`
      })
    };
    console.log(workspace);
    return this.http.put(`${this._signupUrlChatApi}user/${workspace}`, signup, httpOptions);
  }

}
