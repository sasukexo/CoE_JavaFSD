package Fee_Report_Software;

import java.util.List;
import java.util.Scanner;

public class AdminUI {
	private AdminService adminService = new AdminService();
	private Scanner sc = new Scanner(System.in);
	
	public void start() 
	{
		boolean exit = true;
		
		while (exit) 
		{
			System.out.println("\n----- Admin Panel -----");
			System.out.println("1.Login");
			System.out.println("2.Register");
			System.out.println("3.Exit");
			System.out.print("Choose an option: ");
			int n = sc.nextInt();sc.nextLine();
			
			switch(n) 
			{
				case 1:{
							login();
							break;
					   }
				
				case 2:{
							register();
							break;
					   }
				
				case 3:{
							exit = false;
							break;
			   }
				
				default:{
							System.out.println("Invalid Entry!");
						}
			}
		}
	}
	
	private void login() 
	{
		System.out.print("Enter Username: ");
		String name = sc.next();
		System.out.print("\nEnter Password: ");
		System.out.println();
		String password = sc.next();
		
		if (adminService.loginOperation(name,password)) 
		{
			System.out.println("Login Successful");
			adminOperations();
		}
		else
		{
			System.out.println("Invalid Login");
		}
		
	}
	
	private void register() 
	{
		System.out.print("Enter Username: ");
		String name = sc.next();
		System.out.print("\nEnter Password: ");
		String password = sc.next();
		System.out.println();
		
		if (adminService.registerOperation(name,password)) 
		{
			System.out.println("Registration Successful");
		}
		else
		{
			System.out.println("Invalid Registration");
		}
		
	}
	
	private void adminOperations() 
	{
		boolean exit = true;
		
		while (exit) 
		{
			System.out.println("\n----- Admin Operations -----");
            System.out.println("1.Add Accountant");
            System.out.println("2.View Accountants");
            System.out.println("3.Edit Accountant");
            System.out.println("4.Delete Accountant");
            System.out.println("5.Logout");
            System.out.print("Choose an option: ");
            int option = sc.nextInt();sc.nextLine();
            System.out.println();
            
            switch (option) {
            	case 1:
            		addAccountant();
            		break;
            		
            	case 2:
            		viewAccountant();
            		break;
            		
            	case 3:
            		editAccountant();
            		break;
            		
            	case 4:
            		deleteAccountant();
            		break;
            		
            	case 5:
            		exit = false;
            		System.out.println("Logging out...");
            		break;
            		
            	default:
            		System.out.println("Invalid option! Please try again.");
            }
		}
	}
	
	private void addAccountant() 
	{
		 System.out.println("\n----- Add Accountant -----");
	     System.out.print("Enter Accountant Name: ");
	     String name = sc.nextLine();
	     System.out.print("Enter Accountant Email: ");
	     String email = sc.nextLine();
	     System.out.print("Enter Accountant Phone: ");
	     String phone = sc.nextLine();
	     System.out.print("Enter Accountant Password: ");
	     String password = sc.nextLine();
	     
	     Accountant accountant = new Accountant();
	     accountant.setName(name);
	     accountant.setEmail(email);
	     accountant.setPhone(phone);
	     accountant.setPassword(password);
	     
	     if (adminService.addAccountant(accountant)) 
	     {
	    	 System.out.println("Accountant Added Successfully");
	     }
	     else 
	     {
	    	 System.out.println("Failed to add accountant! Email might already exist.");
	     }
	}
	
	private void viewAccountant() 
	{
		adminService.viewAccountant();
	}
	
	private void editAccountant() 
	{
		System.out.print("\nEnter user id: ");
		int id = sc.nextInt();sc.nextLine();
		System.out.println();
		
		System.out.print("Enter New Accountant Name: ");
	    String new_name = sc.nextLine();
	    System.out.print("Enter New Accountant Email: ");
	    String new_email = sc.nextLine();
	    System.out.print("Enter New Accountant Phone: ");
	    String new_phone = sc.nextLine();
	    System.out.print("Enter New Accountant Password: ");
	    String new_password = sc.nextLine();
		
		adminService.editAccountant(id,new_name,new_email,new_phone,new_password);
	}
	
	private void deleteAccountant() 
	{
		System.out.print("\nEnter Accountant ID to Delete: ");
        int id = sc.nextInt();sc.nextLine();
        
        adminService.deleteAccountant(id);
	}
	
	

}
