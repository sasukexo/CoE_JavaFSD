package com.warehouse;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ProductManager {

	static List<Product> productmap;
	
	public ProductManager() {
		if(productmap==null) {
			productmap=new ArrayList<>();
		}
	}
	
	//Method to Read data from entities text file
	public void loadEntities() throws Exception{
		File f =new File(System.getProperties().get("user.dir")+"\\WareHouseManagement\\src\\Database\\entities.txt");
		Scanner sc=new Scanner(f);
		while(sc.hasNextLine()) {
			String[] s=sc.nextLine().trim().split("[,]");
			productmap.add(new Product(s[0],s[1],s[2],s[3]));
		}
		sc.close();
	}
	
	//Method to write data into entities text file
	public void writeEntities() throws Exception{
		if(productmap==null)return;
		FileOutputStream fos = new FileOutputStream(new File(System.getProperties().get("user.dir")+"\\WareHousemanagement\\src\\Database\\entities.txt"));
		for(Product p:productmap) {
			String data=p.toString()+"\n";
			for(int i=0;i<data.length();i++) {
				fos.write((int)data.charAt(i));
			}
		}
		fos.close();
	}
	
	public static List<Product> getList(){
		return productmap;
	}
}
