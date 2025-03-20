package com.kunalS.programmingAssistant;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class ProgrammingAssistantApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProgrammingAssistantApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}

//	@Bean
//	public ObjectMapper objectMapper(){
//		return new ObjectMapper();
//	}
}
