import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError } from '../../node_modules/rxjs';
import { LoginViewModel, UserAccount, Workspace } from './Model'
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TokenParams } from './Model';
import { headersToString } from 'selenium-webdriver/http';
import { BehaviorSubject } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private _ipaddress = "http://172.23.238.162:5000";
  private _ipaddress1 ="http://172.23.238.230:5000";
  private TokenApi: string = `${this._ipaddress}/api/onboard/login`;
  private UsersApi: string = `${this._ipaddress}/api/users`;
  private _signupUrlOnboarding: string = `${this._ipaddress}/api/onboard/signup`;
  private _url2: string = `${this._ipaddress}/api/onboarding/create/workspace/email`;
  private _url3: string = `${this._ipaddress}/api/onboarding/create/workspace/verify`;
  private _createworkspaceUrl: string = `${this._ipaddress}/api/onboarding/create/workspace`;
  private _signupUrl: string = `${this._ipaddress}/api/onboarding/personaldetails`;
  private _workspacedetails: string = `${this._ipaddress}/api/onboarding/workspacedetails`;
  private inviteusers: string = `${this._ipaddress}/api/onboarding/invite`;
  private ListofWorkspaceApi = `${this._ipaddress}/api/onboarding/`;
  private workspaceobjecForChat = `${this._ipaddress1}/api/chat/workspaces`;
  private _signupUrlChatApi = `${this._ipaddress1}/api/chat/workspaces/user/`;

  AccessToken: string = "";
  private messageSourceEmail = new BehaviorSubject('');
  currentMessageEmail = this.messageSourceEmail.asObservable();
  private messageSourceWorkspace = new BehaviorSubject('');
  currentMessageWorkspace = this.messageSourceWorkspace.asObservable();
  private currentWorkspace = new BehaviorSubject('');
  currentWorkspaceName = this.messageSourceEmail.asObservable();

  constructor(public http: HttpClient) { }

  storeWorkspace(workspace) {
    this.currentWorkspace.next(workspace);
  }

  showEmailId(message: string) {
    console.log(message);
    this.messageSourceEmail.next(message)
  }

  showWorkspace(workspace: string) {
    this.messageSourceWorkspace.next(workspace)
  }

  /*this is to post email to onboarding api */
  sendMail(email: any) {
    console.log(email);
    return this.http.post(this._url2, email, httpOptions);
  }

/*this is to post otp to onboarding api */
  sendOTP(OTP: string) {
    // var HeadersForUser = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.AccessToken}`
    // });
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(`"${OTP}"`);
    return this.http.post(this._url3, `"${OTP}"`, httpOptions);
  }
/*this is to authorize login from onboarding api */
  login(login: any): Observable<TokenParams> {
    console.log(login);

    return this.http.post<TokenParams>(this.TokenApi, login, httpOptions);
  }

  getUsers(): Observable<UserAccount[]> {
    var HeadersForUser = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.AccessToken}`
    });
    console.log(this.AccessToken);
    console.log(HeadersForUser.append('Authorization', 'Bearer ' + this.AccessToken))
    //HeadersForUser.append('Authorization','Bearer ' + this.AccessToken)

    return this.http.get<UserAccount[]>(this.UsersApi, { headers: HeadersForUser });
  }

  /*this is to post userdetails to onboarding api */
  PostDataBySignUp(signup: any) {

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.AccessToken}`
      })
    };

    return this.http.post(this._signupUrl, signup, httpOptions);
    // return this.http.post(this._signupUrlChatApi, signup, httpOptions);
  }

  postSignupDataToChat(signup: any, workspace: string){
    console.log(workspace);
    return this.http.put(`${this._signupUrlChatApi}${workspace}`, signup);
  }


  /*this is to post workspace object to onboarding api */
  postworkspace(work: any) {
    return this.http.post(this._createworkspaceUrl, work, httpOptions);
  }

  postworkspaceToChat(work: any) {
    return this.http.post(this.workspaceobjecForChat, work, httpOptions);
  }

  /*this is to get workspace list from onboarding api */
  getWorkspaces(email: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`this.ListofWorkspaceApi${email}`);
  }

  /*This is to update existing workspace details */
  postworkspaceDetails(work: any) {
    return this.http.put(this._workspacedetails, work, httpOptions);
  }

  /*This is to send invite-email for a particular workspace */
  sendInviteMail(email: any) {
    console.log(email);
    return this.http.post(this.inviteusers, email, httpOptions);
  }

  /*This is to post workspace details with ID to chat API */
  getWorkspacesDetailsWithId(email: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`this.ListofWorkspaceApi${email}`);
  }

  /*This is to post signup details to chat API */



}

