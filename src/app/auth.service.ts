import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')||'false')
  private verified = false;
  setStatus(value : boolean){
     this.verified = value
  }
  get isdataSent(){
     this.setStatus
     return this.verified;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn','true')
  }
  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn')||this.loggedInStatus.toString())
  }

  constructor() { }
}
