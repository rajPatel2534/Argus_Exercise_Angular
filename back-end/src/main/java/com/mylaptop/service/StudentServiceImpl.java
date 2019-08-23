/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mylaptop.service;

import com.mylaptop.dao.DaoService;
import com.mylaptop.model.Student;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

/**
 *
 * @author raj
 */

@Service
public class StudentServiceImpl implements StudentService {

   @Autowired
    DaoService daoService;
    
    @Override
    public Student getStudent(int id) {
        return daoService.getStudent(id);
    }

    @Override
    public void delete(int id) {
        daoService.delete(id);
    }

    @Override
    public List<Student> getStudentList() {
        return daoService.getStudentList();
    }
    
    @Override
    public void saveStudent(Student student) {
        daoService.saveStudent(student);
    }
    
    
}
