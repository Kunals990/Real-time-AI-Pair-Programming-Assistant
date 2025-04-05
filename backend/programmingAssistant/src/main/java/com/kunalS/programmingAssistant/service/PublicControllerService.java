package com.kunalS.programmingAssistant.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kunalS.programmingAssistant.entity.Code;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.SQLOutput;
import java.util.Base64;

@Service
@Slf4j
public class PublicControllerService {



    //api request to judge0
    public String judgeCode(Code code){
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(code);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=stdout,stderr,status_id,language_id"))
                    .header("x-rapidapi-key", "0f89e84298msh22a31235865c8dep1109f6jsn3e2d8f7c68ae")
                    .header("x-rapidapi-host", "judge0-ce.p.rapidapi.com")
                    .header("Content-Type", "application/json")
                    .method("POST", HttpRequest.BodyPublishers.ofString(String.valueOf(json)))
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        }
        catch (Exception e){
            System.out.println(e);
            return "error";
        }

    }

}
