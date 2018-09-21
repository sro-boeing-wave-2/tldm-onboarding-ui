import { Injectable } from '@angular/core';
import { Http, Headers, ResponseType } from '@angular/http';
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
export class OnboardingService {
  private _ipaddress = "http://localhost:80";

  private TokenApi: string = `${this._ipaddress}/onboard/login`;
  private UsersApi: string = `${this._ipaddress}onboard/users`;
  // private _signupUrlOnboarding: string = `${this._ipaddress}/api/onboard/signup`;
  private _url2: string = `${this._ipaddress}/onboard/create/workspace/email`;
  private _url3: string = `${this._ipaddress}/onboard/create/workspace/verify`;
  private _url4: string = `${this._ipaddress}/onboard/invite/verify`;
  private _createworkspaceUrl: string = `${this._ipaddress}/onboard/create/workspace`;
  private _signupUrl: string = `${this._ipaddress}/onboard/personaldetails`;
  private _workspacedetailsWithBots: string = `${this._ipaddress}/onboard/workspacedetails`;
  private inviteusers: string = `${this._ipaddress}/onboard/invite`;
  private ListofWorkspaceApi: string = `${this._ipaddress}/onboard/`;


  // private _ipaddress1 = "http://172.23.238.230:5004";
  // private workspaceobjecForChat = `${this._ipaddress1}/api/chat/workspaces`;
  // private _signupUrlChatApi = `${this._ipaddress1}/api/chat/workspaces/user/`;

  // private _ipaddress2 = "http://172.23.238.180:9999";
  // private _getBotsApi = `${this._ipaddress2}/api/applications/all`;

  AccessToken: string = "";
  private messageSourceEmail = new BehaviorSubject('');
  currentMessageEmail = this.messageSourceEmail.asObservable();

  private messageSourceWorkspace = new BehaviorSubject('');
  currentMessageWorkspace = this.messageSourceWorkspace.asObservable();

  private currentWorkspace = new BehaviorSubject('');
  currentWorkspaceName = this.messageSourceEmail.asObservable();

  private currentWorkspacewithChannels = new BehaviorSubject('');
  WorkspacewithChannels = this.currentWorkspacewithChannels.asObservable();

  constructor(public http: HttpClient, private localStorage: LocalStorageService) { }

  storeWorkspace(workspace) {
    this.currentWorkspace.next(workspace);
  }

  showEmailId(message: string) {
    console.log(message);
    this.messageSourceEmail.next(message)
  }

  showWorkspace(workspace: any) {
    this.messageSourceWorkspace.next(workspace)
  }

  workspacewithchannels(workwithChannels : any){
     this.currentWorkspacewithChannels.next(workwithChannels);
  }
  /*this is to post email to onboarding api */
  sendMail(email: any) {
    console.log(email);
    return this.http.post(this._url2, email, httpOptions);
  }

  /*this is to post otp to onboarding api */
  sendOTP(OTP: string) {
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(`"${OTP}"`);
    return this.http.post(this._url3, `"${OTP}"`, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error.message || 'Server error')));
  }

  handleError(err: HttpErrorResponse) {

  }
  /*this is to authorize login from onboarding api */
  login(login: any): Observable<TokenParams> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<TokenParams>(this.TokenApi, login, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  /*this is to get workspace list from onboarding api */
  getWorkspaces(email: string): Observable<Workspace[]> {
    console.log("Token", this.localStorage.retrieve("token"));
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.retrieve("token")}`
      })
    };
    return this.http.get<Workspace[]>(`${this.ListofWorkspaceApi}${email}`, httpOptions);
  }

  /*this is to post userdetails to onboarding api */
  PostDataBySignUp(signup: any) {
    console.log("TOKEN ", this.localStorage.retrieve("otpverifytoken"));
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.retrieve("otpverifytoken")}`
        // 'Authorization': `Bearer ${this.AccessToken}`
      })
    };

    return this.http.post(this._signupUrl, signup, httpOptions);
    }


  /*this is to post workspace object to onboarding api */
  postworkspace(work: any) {
    return this.http.post(this._createworkspaceUrl, work, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));;
  }


  /*This is to update existing workspace details with default Bots */
  postworkspaceDetails(Bots: any) {
    console.log(Bots);
    return this.http.put(this._workspacedetailsWithBots, Bots, httpOptions);
  }

  /*This is to send invite-email for a particular workspace */
  sendInviteMail(email: any) {
    console.log(email);
    return this.http.post(this.inviteusers, email, httpOptions);
  }

  /*This is to post workspace details with ID to chat API */
  getWorkspacesDetailsWithId(email: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.ListofWorkspaceApi}${email}`);
  }

  /*This is to post invite details to Onboarding API */
  postInviteData(inviteData: any) {
    return this.http.post(this._url4, inviteData, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

}

