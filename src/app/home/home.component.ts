import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
  }
  getWorkspace(){
    console.log("creating workspace");
    this.router.navigate(['/enterWorkspace']);
  }
  getLogged(){
    console.log("log in");
    this.router.navigate(['/login']);
  }
  redirectTOtp(){
    this.router.navigate(['/enterOTP'])
  }

}
