package com.jrtechnologies.yum.api;

import com.jrtechnologies.yum.api.model.WebSocketMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {


   // @MessageMapping("/hello")
    @SendTo("/ws")
    public WebSocketMessage greeting( ) throws Exception {
         
        return new WebSocketMessage("BALANCE","SERVER", "55", "TOKEN" )
    }

}