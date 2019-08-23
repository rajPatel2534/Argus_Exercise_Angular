/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mylaptop.dao;

import com.mylaptop.model.Student;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Raj
 */
@Repository
public class DaoServiceImpl implements DaoService {

    @Autowired
    SessionFactory factory;
    
    @Override
    public Student getStudent(int id) {
        Session session = factory.getCurrentSession();
        
      
        session.beginTransaction();
        

        Student student=session.get(Student.class,id);
        session.getTransaction().commit();
       session.close();
        return student;
              

    }

    @Override
    public void delete(int id) {
        
              Session session = factory.getCurrentSession();
        
        session.beginTransaction();
        

        
        Student student=new Student();
        student.setId(id);
        session.delete(student);
        session.getTransaction().commit();
        session.close();
        
        
    }

    @Override
    public List<Student> getStudentList() {
        Session session = factory.getCurrentSession();
        session.beginTransaction();
        Query<Student> query = session.createQuery("from Student",Student.class);
        List<Student> students  = query.getResultList();
        session.getTransaction().commit();
        session.close();
        return students;
    }

    @Override
    public void saveStudent(Student student) {
        Session session = factory.getCurrentSession();
        session.beginTransaction();
        session.saveOrUpdate(student);
        session.getTransaction().commit();
        session.close();
    }
    
    
 
    
}
