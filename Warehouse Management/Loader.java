package com.warehouse;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Loader {
	
	Product p;
	String res;
	public Loader(){
		
	}
	
	public Loader(Product p,String res){
		this.p=p;
		this.res=res;
	}
	//Method to load the products from entities into the Product and Location class 
	public void load() {
		
		if(ProductManager.getList()==null) {
			try {
				ProductManager p=new ProductManager();
				p.loadEntities();
			} catch (Exception e) {
				
				e.printStackTrace();
			}
		}
	}
	
	//Method to Write back the data onto the entities file
	public void entityWriter() {
		try {
			ProductManager p=new ProductManager();
			p.writeEntities();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	//Method to write Log data in log file
	public void logWriter() {
		try {
			FileReader fr=new FileReader(new File(System.getProperties().get("user.dir")+"\\WareHouseManagement\\src\\Database\\logs.txt"));
			FileWriter fw=new FileWriter(new File(System.getProperties().get("user.dir")+"\\WareHouseManagement\\src\\Database\\logs.txt"));
			String s;
			if(fr.read()!=-1) {
				s=p.getId()+"         "+p.getName()+"          "+p.getLocation()+"              "+res+"\n";
			}
			else {
				s="      ID                 Name           Location         Status\n"+p.getId()+"        "+p.getName()+"         "+p.getLocation()+"         "+res+"\n";
			}
			fw.append(s);
			fr.close();
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
