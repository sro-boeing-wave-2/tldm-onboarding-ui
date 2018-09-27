import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { BotIntegrationService } from '../bot-integration.service';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-add-default-bots',
  templateUrl: './add-default-bots.component.html',
  styleUrls: ['./add-default-bots.component.css']
})
export class AddDefaultBotsComponent implements OnInit {
  Bots;
  botSelected;
  defaultBots;
  workspacewithchannels;
  hubconnection: HubConnection;
  constructor(private Botservice: OnboardingService, private router: Router,
    private localStorage: LocalStorageService,
    private ResponseBotData: ChatService,
    private getBotsService: BotIntegrationService, private Auth: AuthService) {

    this.hubconnection = new HubConnectionBuilder()
      .withUrl('http://13.233.42.222/connect/chat')
      .build();


  }



  ngOnInit() {
    this.getBotsService.getBots().subscribe(data => { this.Bots = data });
    this.Botservice.WorkspacewithChannels.subscribe(workspacewithchannels => { this.workspacewithchannels = workspacewithchannels; })
    // this.defaultBots = this.localStorage.retrieve("workspacewithchannels")
    //   .subscribe( data => {
    //   console.log("it's coming here")
    console.log(this.workspacewithchannels.length);
    if (this.workspacewithchannels.length != 0) {
      // console.log("it's coming here")
      this.Auth.setStatus(true);
      // this.router.navigate(['/default']);

    } else {
      console.log("it's coming here")
      this.router.navigate(['/pagenotfound'])
    }

    // this.workspacewithchannels = this.local  Storage.retrieve("workspacewithchannels");
    console.log(this.workspacewithchannels);
  }

  sendUserdetails() {
    this.hubconnection.invoke('sendAllUserChannel').catch(err => console.error(err));
  }


  addBot() {
    console.log(JSON.stringify(this.botSelected));
    this.workspacewithchannels["Bots"] = this.botSelected;

    console.log("Full Object", JSON.stringify(this.workspacewithchannels));
    this.Botservice.postworkspaceDetails(this.workspacewithchannels).subscribe(data => {
      console.log('Success!', data);
      error => console.log('Error!', error);
      this.ResponseBotData.postworkspaceToChat(data).subscribe(workspace => {
        console.log('Success', workspace);
        this.hubconnection
        .start()
        .then(() => { this.sendUserdetails();console.log('Connection started!') })
        .catch(err => console.log('Error while establishing connection :('));

      })

      if (data != null) {
        this.Auth.setStatus(true);
        this.router.navigate(['/enterEmail']);

      } else {
        return;
      }
      // console.log(data);
    });;
  }


}
