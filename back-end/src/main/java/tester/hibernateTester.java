/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tester;

import com.mylaptop.model.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 *
 * @author Raj
 */
public class hibernateTester {
 
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Student.class).buildSessionFactory();
        Session session = factory.getCurrentSession();
        
        try{
        session.beginTransaction();
        
        Student demo1 = (Student) session.get(Student.class, 2);
            System.out.println(""+demo1.toString());

        }
        
        finally{
                    session.close();
                    factory.close();
                          
        
        }
        

    }
}
