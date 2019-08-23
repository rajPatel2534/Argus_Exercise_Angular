/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tester;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Raj
 */
public class Test {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/postgres";
Properties props = new Properties();
props.setProperty("user","postgres");
props.setProperty("password","password");
//props.setProperty("ssl","true");
        try {
            Connection conn = DriverManager.getConnection(url, props);
            if(conn != null)
            {
                System.out.println("connected");
            }
        } catch (SQLException ex) {
            Logger.getLogger(Test.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
}
