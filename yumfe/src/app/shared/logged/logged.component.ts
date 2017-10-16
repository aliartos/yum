import { Component, OnInit } from '@angular/core';
import * as remote from '../../remote';
import { MatButtonModule } from '@angular/material';
import { AuthenticationService } from '../../shared/authentication.service';
import { routerTransition } from './router.animations';
import { CommService } from '../websocket/comm.service';

@Component({
  selector: 'app-logged',
  animations: [ routerTransition ],
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  private user: remote.User;

  constructor(private authenticationService: AuthenticationService, private commService:CommService ) { }

  ngOnInit() {

      this.user = this.authenticationService.getLoggedInUser();
      this.commService.messages.subscribe(msg => {			
        console.log("Response from websocket: " + msg);
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
