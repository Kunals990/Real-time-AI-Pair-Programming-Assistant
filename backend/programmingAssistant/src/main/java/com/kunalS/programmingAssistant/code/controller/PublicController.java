package com.kunalS.programmingAssistant.controller;

import com.kunalS.programmingAssistant.code.model.Code;
import com.kunalS.programmingAssistant.code.service.PublicControllerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/public")
@Slf4j
public class PublicController {

    @Autowired
    private PublicControllerService publicControllerService;

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck (){
        return new ResponseEntity<>("Public Controller Working Fine",HttpStatus.OK);
    }

    @PostMapping("/judgeCode")
    public ResponseEntity<?> judgeCode(@RequestBody Code code){
        try{
            String response = publicControllerService.judgeCode(code);
            return new ResponseEntity<>(response,HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/check")
    public ResponseEntity<?> hi(@RequestBody Code code){
        code.setSource_code(Base64.getEncoder().encodeToString(code.getSource_code().getBytes()));
        System.out.println(String.valueOf(code));
        return new ResponseEntity<>(code.getSource_code(),HttpStatus.CREATED);
    }


}
