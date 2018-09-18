import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { BotIntegrationService } from '../bot-integration.service';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-default-bots',
  templateUrl: './add-default-bots.component.html',
  styleUrls: ['./add-default-bots.component.css']
})
export class AddDefaultBotsComponent implements OnInit {
  Bots;
  botSelected;
  constructor(private Botservice : OnboardingService, private router : Router, private localStorage: LocalStorageService, private ResponseBotData : ChatService, private getBotsService : BotIntegrationService,private Auth : AuthService) { }
  defaultBots;
  workspacewithchannels;

  ngOnInit() {
     this.getBotsService.getBots().subscribe(data => {this.Bots = data});
     this.defaultBots = this.localStorage.retrieve("workspacewithchannels");
     this.workspacewithchannels = this.localStorage.retrieve("workspacewithchannels");
     console.log(this.workspacewithchannels);
     }


  addBot()
  {
    console.log(JSON.stringify(this.botSelected));
    this.defaultBots["Bots"]=this.botSelected;

    console.log("Full Object", JSON.stringify(this.defaultBots));
    this.Botservice.postworkspaceDetails(this.defaultBots).subscribe(data => {
      console.log('Success!', data);
      error => console.log('Error!', error);
      if(data != null){
        this.Auth.setStatus(true);
        this.router.navigate(['/enterEmail']);

      }else {
        this.router.navigate(['/notfound'])
    }
      this.ResponseBotData.postworkspaceToChat(data).subscribe(workspace => console.log('Success', workspace))
    });;
  }
  // navigateToEnterEmail(){
  //   this.router.navigate(['/enterEmail']);
  // }

}
