import { Component, OnInit } from '@angular/core';
import * as remote from '../../remote';
import { MatButtonModule } from '@angular/material';
import { AuthenticationService } from '../../shared/authentication.service';
import { routerTransition } from './router.animations';
import { CommService } from '../websocket/comm.service';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-logged',
  animations: [ routerTransition ],
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  private user: remote.User;

  constructor(private authenticationService: AuthenticationService, private commService:CommService, private balanceService: BalanceService) { }

  ngOnInit() {

      this.user = this.authenticationService.getLoggedInUser();
      this.commService.receiveMessage().subscribe(msg => {			
        console.log("Response from websocket: " + JSON.stringify(msg));
        if(!msg || !msg.command){ return; }

        if(msg.command =="HELLO"){
          console.log("Subscribe");
          this.commService.sendMessage("SUBSCRIBE", this.user.userName, "", this.authenticationService.getToken());
        }

        if(msg.command =="BALANCE"){
          this.balanceService.updateBalance(Number(msg.message));
        }

      });
      
      
  }

  getUser(){
    return this.user;
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  animationStarted(event){
    //console.log(event);
  }

  animationDone(event){
    //console.log(event);
  }
}
