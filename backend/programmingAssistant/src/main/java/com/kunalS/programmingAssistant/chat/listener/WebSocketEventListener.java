package com.kunalS.programmingAssistant.chat.listener;

import com.kunalS.programmingAssistant.chat.controller.ChatMessage;
import com.kunalS.programmingAssistant.chat.controller.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messageTemplate;

    @EventListener
    public void handleWebSocketDisconnetListener(
            SessionDisconnectEvent event
    ){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String)  headerAccessor.getSessionAttributes().get("username");
        if(username!=null){
            log.info("User disconneted :{} " , username);
            var chatMessage = ChatMessage.builder()
                    .messageType(MessageType.LEAVE)
                    .sender(username)
                    .build();
            messageTemplate.convertAndSend("/topic/public",chatMessage);
        }
    }

}
