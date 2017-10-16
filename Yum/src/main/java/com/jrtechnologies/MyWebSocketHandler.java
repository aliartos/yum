package com.jrtechnologies;

import com.google.gson.Gson;
import com.jrtechnologies.yum.api.model.WebSocketMessage;
import com.jrtechnologies.yum.data.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component; 
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@Component
public class MyWebSocketHandler extends TextWebSocketHandler {
	@Autowired
        private UserRepository userRepo;
            
	List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
        HashMap<Long, List<WebSocketSession>> userSessions = new HashMap<>();
        
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {
		
		for(WebSocketSession webSocketSession : sessions) {
                        System.out.println(message.getPayload());
                        System.out.println(webSocketSession);
			//Map value = new Gson().fromJson(message.getPayload(), Map.class);
                        WebSocketMessage msg = new Gson().fromJson(message.getPayload(), WebSocketMessage.class); 
                        
                        
                        //check user
                        if(msg.getToken()==null || msg.getToken().trim().length()==0){
                            //throw new ApiException(403, "Invalid token");
                            webSocketSession.sendMessage(new TextMessage("{error:'No auth token!'}")); 
                        }

                        Long clientUserId = 0L;
                        try{
                            Claims claims = JwtCodec.decode(msg.getToken());
                            clientUserId = Long.parseLong(claims.getSubject());
                        } catch(JwtException e){
                            webSocketSession.sendMessage(new TextMessage("{error:'Invalid token!'}")); 
                        } 
                        com.jrtechnologies.yum.data.entity.User userDAO = userRepo.findById(clientUserId);   
                        
                        if(userSessions.get(clientUserId)==null){
                            List<WebSocketSession> userSessionList = new CopyOnWriteArrayList<>();
                            userSessionList.add(webSocketSession);
                            userSessions.put(clientUserId, userSessionList);
                        }
                        else{                            
                            userSessions.get(clientUserId).add(webSocketSession);
                        }
                        
                        
                        
			//webSocketSession.sendMessage(new TextMessage("Hello " + value.get("name") + " !"));
                        webSocketSession.sendMessage(new TextMessage("Hello ! "+ msg)); 
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//the messages will be broadcasted to all users.
		sessions.add(session);
	}
        
        void updateBalance(){
            
        }
}