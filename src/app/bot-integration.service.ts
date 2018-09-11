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
export class BotIntegrationService {
  private _ipaddress2 = "http://172.23.238.180:9999";
  private _getBotsApi = `${this._ipaddress2}/api/applications/all`;

  constructor(public http: HttpClient, private localStorage: LocalStorageService) { }

  /*This is to get all Bots details from Integration Microservice */
  getBots() {
    return this.http.get(this._getBotsApi);
  }
}
