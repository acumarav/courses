package org.alext.learning.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/go")
@RestController
public class NameController {


    //http://localhost:8080/go/mytitle.mov
    @RequestMapping(value = "/{fileName}.{extension}" )
    public ResponseEntity<String> go(@PathVariable String fileName,@PathVariable String extension){
        System.out.println("NAME: "+fileName + extension);

        String body= "Name: "+fileName+extension;


        return ResponseEntity.ok(body);
    }
}
