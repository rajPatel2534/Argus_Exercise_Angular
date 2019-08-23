/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mylaptop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mylaptop.model.Student;
import com.mylaptop.service.StudentService;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author raj
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/rest")
public class WebRestController {
    
        @Autowired
  StudentService studentService;
    
   @GetMapping("/list")
    public ResponseEntity<List<Student>> getWorld()
    {
        System.out.println("World");
        
        List<Student>  listOfStudent;
        listOfStudent = studentService.getStudentList();
        
        for(int i=0;i<listOfStudent.size();i++)
        {
            System.out.println("name : "+listOfStudent.get(i).toString()+"\n");

        }
         
        return ResponseEntity.ok(listOfStudent);
    }
    
    @GetMapping(value="/student/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable String id)
    {
        System.out.println("student");
        Student student = studentService.getStudent(Integer.parseInt(id));
        System.out.println(student.toString());
        return ResponseEntity.ok(student);
    }
    
    @RequestMapping("/hh")
    public String hh()
    {
        return "world";
    }
    
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity deleteStudent(@PathVariable int id)
    {
        System.out.println("delete started");
        try
        {
            studentService.delete(id);
        
            System.out.println("Deleted");
            return  new ResponseEntity(HttpStatus.OK);
 
        }
        catch(Exception e)
        {
            e.printStackTrace();    
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value="/save",consumes = "application/json")
    @ResponseBody
    public Student saveStudent(@RequestBody  String student)
    {
        System.out.println("World"+student);
        
        Student studentObj = new Student();
        ObjectMapper mapper=new ObjectMapper();
            try {
                studentObj = mapper.readValue(student, Student.class);
                System.out.println("--"+studentObj.getCity());
            } catch (IOException ex) {
                Logger.getLogger(WebRestController.class.getName()).log(Level.SEVERE, null, ex);
            }
        
//        student.setName(http.getParameter("name"));
//        student.setMobile(http.getParameter("mobile"));
//        student.setCity(http.getParameter("city"));
//        student.setDob(http.getParameter("dob"));
        
        studentService.saveStudent(studentObj);
        System.out.println("Saved");
   
        return studentObj;
    }
        @CrossOrigin(origins = "http://localhost:4200/*")
        @PostMapping(value="/update",consumes = "application/json")
        @ResponseBody
    public ResponseEntity    updateStudent(@RequestBody  Student student)
    {
        System.out.println("World"+student.toString());
        System.out.println("Update start"+student.getId());
        
        
//        Student studentObj = new Student();
//        ObjectMapper mapper=new ObjectMapper();
//            try {
//                studentObj = mapper.readValue(student, Student.class);
//                studentObj.setId(Integer.parseInt())
//                System.out.println("--"+studentObj.getCity());
//            } catch (IOException ex) {
//                Logger.getLogger(WebRestController.class.getName()).log(Level.SEVERE, null, ex);
//            }
        
        studentService.saveStudent(student);
        System.out.println("Updated");
            return  new ResponseEntity(HttpStatus.OK);
    }

}
