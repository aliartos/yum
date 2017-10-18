package com.jrtechnologies;

import com.google.gson.Gson;
import com.jrtechnologies.tasks.ScheduledTasks;
import com.jrtechnologies.yum.api.model.WebSocketMessage;
import com.jrtechnologies.yum.data.repository.UserRepository;
import com.jrtechnologies.yum.service.EmailService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
//@Service
public class YumWebSocketHandler extends TextWebSocketHandler {
     
    private static UserRepository userRepo;
    
    @Autowired
    public YumWebSocketHandler(UserRepository userRep) {
        YumWebSocketHandler.userRepo = userRep; 
    }
    public YumWebSocketHandler( ) {
         
    }
    
    static List<WebSocketSession>  sessions = new CopyOnWriteArrayList<>();
    static HashMap<Long, List<WebSocketSession>> userSessions = new HashMap<>();

    private static final Logger log = LoggerFactory.getLogger(YumWebSocketHandler.class);

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws InterruptedException, IOException {
 
        System.out.println(message.getPayload());
        System.out.println(session); 
        
        WebSocketMessage msg = new Gson().fromJson(message.getPayload(), WebSocketMessage.class);

        //check user
        if (msg.getToken() == null || msg.getToken().trim().length() == 0) { 
            session.sendMessage(new TextMessage("{ERROR:'No auth token!'}"));
            removeSession(session);
        }

        Long clientUserId = 0L;
        try {
            Claims claims = JwtCodec.decode(msg.getToken());
            clientUserId = Long.parseLong(claims.getSubject());
        } catch (JwtException e) {
            session.sendMessage(new TextMessage("{ERROR:'Invalid token!'}"));
            removeSession(session);
        }

        com.jrtechnologies.yum.data.entity.User userDAO = userRepo.findById(clientUserId);

        // Store user session if it is a new one
        if (userSessions.get(clientUserId) == null) {
            List<WebSocketSession> userSessionList = new CopyOnWriteArrayList<>();
            userSessionList.add(session);
            userSessions.put(clientUserId, userSessionList);
        } else {

            if(!userSessions.get(clientUserId).contains(session)){
                userSessions.get(clientUserId).add(session);
            }
        }
 
        
        System.out.println("User Sessions: "+ userSessions);
        
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("New session "+ session);
        sessions.add(session);
        WebSocketMessage msgResponse = new WebSocketMessage("HELLO", "SERVER", "Hello welcome to yum websockets\n valid commands are: CHAT..  ! ", "");
        session.sendMessage(new TextMessage(new Gson().toJson(msgResponse)));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Closed session "+ session);
        sessions.remove(session);
        for (Map.Entry<Long, List<WebSocketSession>> entry : userSessions.entrySet()) {
            for(WebSocketSession wsSession : entry.getValue()){
                if(session.equals(wsSession)){
                    entry.getValue().remove(wsSession);
                }
            } 
        }
    }

 

    private void removeSession(WebSocketSession session) {
        sessions.remove(session);
    }

    public void sendBalanceToUser(long userid, BigDecimal balance) {
        com.jrtechnologies.yum.data.entity.User user = userRepo.findById(userid);

         
        if (userSessions.get(userid) == null) {
            log.info("No user sessions for user: " + user.getLastName());
            return;
        }

        WebSocketMessage msg = new WebSocketMessage("BALANCE", "SERVER", balance.toString(), "");
        for (WebSocketSession wsSession : userSessions.get(userid)) {
            try {
                wsSession.sendMessage(new TextMessage(new Gson().toJson(msg)));
            } catch (IOException ex) {
                log.error(YumWebSocketHandler.class.getName() + ": " + "failed to send user balance");
            }
        }
    }
}
