import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-add-default-bots',
  templateUrl: './add-default-bots.component.html',
  styleUrls: ['./add-default-bots.component.css']
})
export class AddDefaultBotsComponent implements OnInit {
  Bots;
  botSelected;
  constructor(private Botservice : OnboardingService, private router : Router, private localStorage: LocalStorageService) { }
  defaultBots;

  ngOnInit() {
     this.Botservice.getBots().subscribe(data => {this.Bots = data});
     this.defaultBots = this.localStorage.retrieve("workspacewithchannels");

  }

  addBot()
  {
    console.log(JSON.stringify(this.botSelected));
    this.defaultBots["Bots"]=this.botSelected;

    console.log("Full Object", JSON.stringify(this.defaultBots));
    this.Botservice.postworkspaceDetails(this.defaultBots).subscribe(data => {
      console.log('Success!', data),
      error => console.log('Error!', error);
      this.router.navigate(['/enterEmail']);
    });;
  }
  // navigateToEnterEmail(){
  //   this.router.navigate(['/enterEmail']);
  // }

}
