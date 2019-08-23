/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mylaptop.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Raj
 */
@Entity
@Table(name = "student")
public class Student implements Serializable {


 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;
    
    @Column(name="mobile")
    private String mobile;
    
    @Column(name="dob")    
    private String dob;
    
    @Column(name="city")      
    private String city;

    public Student() {
    }

    public Student(String name, String mobile, String dob, String city) {
        this.name = name;
        this.mobile = mobile;
        this.dob = dob;
        this.city = city;
    }

  
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "Student{" + "id=" + id + ", name=" + name + ", mobile=" + mobile + ", dob=" + dob + ", city=" + city + '}';
    }

 
    
    
}
