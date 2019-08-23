/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mylaptop.dao;

import com.mylaptop.model.Student;
import java.util.List;

/**
 *
 * @author Raj
 */
public interface DaoService {
    
    public Student getStudent(int id);
    
    public void delete(int id);
    public List<Student> getStudentList();
    public void saveStudent(Student student);
}