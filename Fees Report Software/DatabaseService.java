package Fee_Report_Software;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class DatabaseService {
	private Connection conn;
	
	public DatabaseService() 
	{
		try 
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("Driver loaded successfully");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/fee_management","root","password");
			System.out.println("Database Connected Successfully");
		}
		catch (ClassNotFoundException e) {
            System.err.println("JDBC Driver not found: " + e.getMessage());
		}
		catch (SQLException e) 
		{
			e.printStackTrace();
			System.out.println("Failed to connect database");
		}
	}
	
	public boolean loginOperations(String name,String password) {
		String query = "SELECT * FROM admin WHERE username = ? AND password = ?";
		try(PreparedStatement pst  = conn.prepareStatement(query))
		{
			pst.setString(1, name);
			pst.setString(2, password);
			ResultSet res = pst.executeQuery();
			return res.next();
		}
		catch(SQLException e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	public boolean registration(String name,String password)
	{
		String query = "INSERT INTO admin (username,password) VALUES(?,?)";
		
		try(PreparedStatement pst = conn.prepareStatement(query))
		{
			pst.setString(1, name);
			pst.setString(2, password);
			int rows = pst.executeUpdate();
			return rows > 0;
		}
		catch(SQLException e) 
		{
			e.printStackTrace();
			return false;	
		}
	}
	
	public boolean addAccountants(Accountant accountant) 
	{
		String query = "INSERT INTO accountant (name,email,phone,password) VALUES(?,?,?,?)";
		
		try(PreparedStatement pst = conn.prepareStatement(query))
		{
			pst.setString(1, accountant.getName());
			pst.setString(2, accountant.getEmail());
			pst.setString(3, accountant.getPhone());
			pst.setString(4, accountant.getPassword());
			int rows = pst.executeUpdate();
			return rows > 0;
		}
		catch(SQLException e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	public void viewAccountants()
	{
		String query = "SELECT * FROM accountant";
		
		try(Statement st = conn.createStatement())
		{
			ResultSet rs = st.executeQuery(query);
			
			while (rs.next()) 
			{
				int id = rs.getInt(1);
				String name = rs.getString(2);
				String email = rs.getString(3);
				String phone = rs.getString(4);
				String password = rs.getString(5);
				
				System.out.println("Id:"+id+", "+"Name:"+name+", "+"Email:"+email+", "+"Phone:"+phone+", "+"Password:"+password+".");
			}
		}
		catch (SQLException e) 
		{
			e.printStackTrace();
		}
		
		
	}
	
	public void editAccountants(int id,String new_name,String new_email,String new_phone,String new_password) 
	{
		String query = "UPDATE accountant SET name = ?,email = ?,phone = ?,password = ? WHERE id = ?";
		
		try(PreparedStatement pst = conn.prepareStatement(query))
		{
			pst.setString(1, new_name);
			pst.setString(2, new_email);
			pst.setString(3, new_phone);
			pst.setString(4, new_password);
			pst.setInt(5, id);
			
			int rows = pst.executeUpdate();
			
			if (rows > 0) 
			{
				System.out.println("Successfully Updated");
			}
			else 
			{
				System.out.println("Invalid ID");
			}
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
	}
	
	public void deleteAccountants(int id) 
	{
		String query = "DELETE FROM accountant WHERE id = ?";
		
		try(PreparedStatement pst = conn.prepareStatement(query))
		{
			pst.setInt(1, id);
			int row = pst.executeUpdate();
			
			if (row > 0) 
			{
				System.out.println("Data deleted successfully");
			}
			else 
			{
				System.out.println("Invalid ID");
			}
		}
		catch(SQLException e) 
		{
			e.printStackTrace();
		}
	}
	

}
