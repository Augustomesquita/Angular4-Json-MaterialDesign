/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.springwebsocket;

import java.security.Principal;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

/**
 *
 * @author augusto
 */
@Configuration
@EnableWebSocketMessageBroker
public class JWebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Autowired
    JWebSocketSessionService sessionService;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/angularing-ws").setHandshakeHandler(new RandomUsernameHandshakeHandler()).setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app")
                .enableSimpleBroker("/topic", "/queue");
    }

    private class RandomUsernameHandshakeHandler extends DefaultHandshakeHandler {

        @Override
        protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
            UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken("angularing-user-" + ThreadLocalRandom.current().nextInt(1, 9999 + 1), null);
            while (sessionService.getSessionFromPrincipal(user) != null) {
                user = new UsernamePasswordAuthenticationToken("angularing-user-" + ThreadLocalRandom.current().nextInt(1, 9999 + 1), null);
            }
            // Melhor forma seria utiliza "new UsernamePasswordAuthenticationToken("angularing-user-" + UUID.randomUUID().toString(), null);"
            // porém para medidas de didática, foi utilizado o ThreadLocalRandom.
            return user;
        }

    }

}
