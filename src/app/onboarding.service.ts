import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { Observable, throwError } from '../../node_modules/rxjs';
import {LoginViewModel, UserAccount, Workspace} from './Model'
import {HttpHeaders} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import{TokenParams} from './Model';
import { headersToString } from 'selenium-webdriver/http';
import { BehaviorSubject } from 'rxjs';
const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
 };

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private TokenApi: string = "http://172.23.238.206:5000/api/onboard/login";
  private  UsersApi :  string = "http://172.23.238.206:5000/api/users";
  private SignupApi: string = "http://172.23.238.206:5000/api/onboard/signup";
  private _url2: string = "http://172.23.238.162:5000/api/onboarding/create/workspace/email";
  private _url3: string = "http://172.23.238.162:5000/api/onboarding/create/workspace/verify";
  private _createworkspaceUrl: string = "http://172.23.238.162:5000/api/onboarding/create/workspace";
  private _signupUrl: string = "http://172.23.238.162:5000/api/onboarding/personaldetails";
  private _workspacedetails : string = "http://172.23.238.162:5000/api/onboarding/workspacedetails";
  private inviteusers : string = "http://172.23.238.162:5000/api/onboarding/invite";
  private ListofWorkspaceApi = "http://172.23.238.162:5000/api/onboarding/";

  AccessToken : string = "";
  private messageSourceEmail = new BehaviorSubject('');
  currentMessageEmail = this.messageSourceEmail.asObservable();
  private messageSourceWorkspace = new BehaviorSubject('');
  currentMessageWorkspace = this.messageSourceWorkspace.asObservable();
  private currentWorkspace = new BehaviorSubject('');
  currentWorkspaceName = this.messageSourceEmail.asObservable();

  constructor(public http : HttpClient) { }

  storeWorkspace(workspace) {
    this.currentWorkspace.next(workspace);
  }
  sendMail(email: any){
    console.log(email);
    return this.http.post(this._url2,email , httpOptions);
  }

  showEmailId(message: string) {
    console.log(message);
    this.messageSourceEmail.next(message)
  }

  showWorkspace(workspace: string) {
    this.messageSourceWorkspace.next(workspace)
  }


  sendOTP(OTP: string){
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
    return this.http.post(this._url3,`"${OTP}"`, httpOptions);
  }

  login (login : any):Observable<TokenParams>{
    console.log(login);

     return this.http.post<TokenParams>(this.TokenApi, login, httpOptions);
  }

  getUsers() : Observable<UserAccount[]>{
     var HeadersForUser = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.AccessToken}`
    });
    console.log(this.AccessToken);
    console.log(HeadersForUser.append('Authorization','Bearer ' + this.AccessToken))
        //HeadersForUser.append('Authorization','Bearer ' + this.AccessToken)

      return this.http.get<UserAccount[]>(this.UsersApi, {headers : HeadersForUser});
  }

  PostDataBySignUp(signup : any ){
    // var HeadersForUser = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.AccessToken}`
    // });
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.AccessToken}`
      })
    };

    return this.http.post(this._signupUrl,signup,httpOptions);
  }

  postworkspace(work : any){
   return this.http.post(this._createworkspaceUrl,work,httpOptions );
  }

  getWorkspaces(email : string): Observable<Workspace[]>{
      return this.http.get<Workspace []>(`this.ListofWorkspaceApi${email}`);
  }

  postworkspaceDetails(work : any){
    return this.http.put(this._workspacedetails,work,httpOptions );
   }
   sendInviteMail(email :any){
    console.log(email);
    return this.http.post(this.inviteusers,email , httpOptions);
   }


}

