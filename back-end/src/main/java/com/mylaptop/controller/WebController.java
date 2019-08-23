/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mylaptop.controller;

import com.mylaptop.model.Student;
import com.mylaptop.service.StudentService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Raj
 */
@Controller
@RequestMapping("/")
public class WebController {
    
    @Autowired
  StudentService studentService;
    
   @RequestMapping("/list")
    public String getWorld()
    {
        System.out.println("World");
        
        List<Student>  listOfStudent;
        listOfStudent = studentService.getStudentList();
        
        for(int i=0;i<listOfStudent.size();i++)
        {
            System.out.println("name : "+listOfStudent.get(i).toString()+"\n");

        }
         
        return "world";
    }
    
    @RequestMapping("/student/{id}")
    public String getStudent(@PathVariable String id)
    {
        System.out.println("student");
        Student student = studentService.getStudent(Integer.parseInt(id));
        System.out.println(student.toString());
        return "world";
    }
    
    @RequestMapping("/hh")
    public String hh()
    {
        return "world";
    }
    
    @RequestMapping("/delete/{id}")
    public String deleteStudent(@PathVariable int id)
    {
        System.out.println("delete started");
        studentService.delete(id);
        System.out.println("Deleted");
        
        return "world";
    }
    
    @RequestMapping(value="/save",method = RequestMethod.POST)
    public String saveStudent(HttpServletRequest http)
    {
        System.out.println("World"+http.getParameter("name"));
        
        Student student = new Student();
        student.setName(http.getParameter("name"));
        student.setMobile(http.getParameter("mobile"));
        student.setCity(http.getParameter("city"));
        student.setDob(http.getParameter("dob"));
        
        studentService.saveStudent(student);
        System.out.println("Saved");
        return "world";
    }
    
        @RequestMapping(value="/update",method = RequestMethod.POST)
    public String updateStudent(HttpServletRequest http)
    {
        System.out.println("World"+http.getParameter("name"));
        
        Student student = new Student();
        student.setId(Integer.parseInt(http.getParameter("id")));
        student.setName(http.getParameter("name"));
        student.setMobile(http.getParameter("mobile"));
        student.setCity(http.getParameter("city"));
        student.setDob(http.getParameter("dob"));
        
        studentService.saveStudent(student);
        System.out.println("Updated");
        return "world";
    }
}
