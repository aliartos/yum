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
	private messages: Subject<Message>;
	private wsMessages: Subject<Message>;
	protected wsBasePath = 'ws://localhost:8080/ws';

	constructor(private wsService: WebsocketService, @Optional() @Inject(WS_BASE_PATH) wsBasePath: string, private location: Location) {

		// wsMessages handles actual  web socket messages, it can be destroyed and recreated so we use this.messages as a constant observable
		this.wsMessages = new Subject<Message>(); 
		this.messages = new Subject<Message>();

		if (wsBasePath) {
            this.wsBasePath = wsBasePath;
		}
		this.connect(); 

		// Check connection in the specified interval
        Observable.interval(10000).takeWhile(() => true).subscribe(() => {
            if(wsService.getWebSocket().readyState === wsService.getWebSocket().CLOSED){
				console.log("Trying to Reconnect");
                this.connect();
            }

		});
 
	}

	private connect(){
		this.wsMessages = <Subject<Message>>this.wsService
		.connect(this.wsBasePath)
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

		
		this.wsMessages.subscribe( msg=>{
			this.messages.next(msg);
		}, error=>{
			console.log("Web socket error: ", error);
		})
		
	}

	public receiveMessage(){
		return this.messages;
	}

	public sendMessage(command, origin, message, token ){
		let msg: Message = {
			command: command, 
			origin: origin,
			message: message,
			token: token };
		this.wsMessages.next(msg);	
	}
}