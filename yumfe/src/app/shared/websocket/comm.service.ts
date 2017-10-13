import { Inject, Injectable,  Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { APP_BASE_HREF } from '@angular/common';
import { Location } from '@angular/common';
import { WS_BASE_PATH } from '../../remote/variables';
export interface Message {
	command: string, //CMD, CHAT
	origin: string,
	message: string,
	token: string
}

@Injectable()
export class CommService {
	public messages: Subject<Message>;
	protected wsBasePath = 'ws://localhost:8080/ws';

	constructor(wsService: WebsocketService, @Optional() @Inject(WS_BASE_PATH) wsBasePath: string, private location: Location) {

		//this.location.

		if (wsBasePath) {
            this.wsBasePath = wsBasePath;
		}
		
		this.messages = <Subject<Message>>wsService
			.connect(wsBasePath)
			.map((response: MessageEvent): Message => {
				console.log(response);
				let data = JSON.parse(response.data);
				return {
					command: data.command,
					origin: data.origin,
					message: data.message,
					token: data.token
				};
			});
	}
}