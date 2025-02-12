package Fee_Report_Software;

import java.util.ArrayList;
import java.util.List;

public class AdminService {
	private DatabaseService dbs = new DatabaseService();

	
	public boolean loginOperation(String name,String password) 
	{
		return dbs.loginOperations(name, password);
	}
	
	public boolean registerOperation(String name,String password) 
	{
		return dbs.registration(name,password);
	}

	public boolean addAccountant(Accountant accountant) 
	{
		return dbs.addAccountants(accountant);
	}
	
	public void viewAccountant()
	{
		dbs.viewAccountants();
	}
	
	public void editAccountant(int id,String new_name,String new_email,String new_phone,String new_password) 
	{
		dbs.editAccountants(id,new_name,new_email,new_phone,new_password);
	}
	
	public void deleteAccountant(int id) 
	{
		dbs.deleteAccountants(id);
	}
	
	

}
