import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
  }
  redirectToHome(){
    console.log("redirecting to home");
    this.router.navigate(['/enterWorkspace']);
  }
  getLogged(){
    console.log("log in");
    this.router.navigate(['/login']);
  }

}
