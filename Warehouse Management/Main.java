package com.warehouse;

import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;

public class Main {
	
	static Scanner sc=new Scanner(System.in);

	//Main program to start the application
	public static void main(String[] args) {
		boolean flag=true;
		int action=-1;
		System.out.println("WareHouse Management Service");
		do {
			System.out.printf("Choose any Action\n1.Order Products%-10s2.Admin%-10s3.Exit\n"," "," ");
			try {
				action=sc.nextInt();
				if(action < 1 || action > 3) {
					System.out.println("please choose from the above actions");
				}
			}
			catch ( InputMismatchException e ) {
				System.out.println("please choose from the above actions1");
			}
			
			switch(action) {
			case 1:{
				try {
					Runnable r=new Loader()::load;
					Thread t=new Thread(r);
					t.start();
				}
				catch(Exception e) {
					e.printStackTrace();
				}
				order();
				break;
			}
			case 2:{
				try {
					Runnable r=new Loader()::load;
					Thread t=new Thread(r);
					t.start();
				}
				catch(Exception e) {
					e.printStackTrace();
				}
				try {
					administrator();
				} catch (Exception e) {
					System.err.println("Invalid Product Error: No such product Available");
				}
				break;
			}
			case 3:{
				try {
					Runnable r=new Loader()::entityWriter;
					Thread t=new Thread(r);
					t.start();
				}
				catch(Exception e) {
					e.printStackTrace();
				}
				sc.close();
				flag=false;
				break;
			}
			default:break;
			}
			action=-1;
		}while(flag);

	}
	
	public static void order() {
		System.out.printf("1.Show Available products%-10s2.Search%-10s3.Home Page\n"," "," ");
		int choose=sc.nextInt();
		switch(choose) {
		case 1:{
			List<Product> l=ProductManager.getList();
			printAll(l);
			System.out.println("Enter the Serial number to select or enter -1 to go back to home");
			int select=sc.nextInt();
			if(select<1) {
				l=null;
				order();
			}
			else {
				purchase(l,select);
			}
			break;
		}
		case 2:{
			System.out.print("Search: ");
			String filter=sc.next().trim();
			List<Product> l=ProductManager.getList().stream().filter((o)->o.matchKeys(o.getName(), filter)).toList();
			printAll(l);
			System.out.println("Enter the Serial number to select or enter -1 to go back to home");
			int select=sc.nextInt();
			if(select<1) {
				l=null;
				order();
			}
			else {
				purchase(l,select);
			}
			break;
		}
		default:return;
		}
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			
			e.printStackTrace();
		}
	}
	
	//Admin Access for Data Manipulation
	public static void administrator() throws Exception{
		System.out.println("1.Update Stocks\t2.Home");
		int choose=sc.nextInt();
		switch(choose) {
		case 1:{
			List<Product> l=ProductManager.getList();
			detailPrint(l);
			int option=sc.nextInt();
			Product p=l.get(option-1);
			int tick;
			do {
				System.out.println("1.update id\n2.update name\n3.update quantity\n4.update location");
				tick=sc.nextInt();
				switch(tick) {
				case 1:p.setId(sc.next());break;
				case 2:p.setName(sc.nextLine());break;
				case 3:p.setQuantity(sc.nextInt());break;
				case 4:p.setLocation(new Locations(sc.nextLine().trim().split("[.]")));break;
				default:System.out.println("please enter only the below choice");
				}
				try {
					Runnable r=new Loader()::entityWriter;
					Thread t=new Thread(r);
					t.start();
				}
				catch(Exception e) {
					e.printStackTrace();
				}
			}while(tick<1 ||tick>4);
		}
		case 2:return;
		}
	}
	
	//Method to display all data of product
	public static void detailPrint(List<Product> l) {
		int i=1;
		System.out.println("*".repeat(30));
		for(Product p:l) {
			System.out.println((i++)+". id="+p.getId()+" name="+p.getName()+" quantity="+p.getQuantity()+" location="+p.getLocation());
		}
		System.out.println("*".repeat(30));
	}
	//Method to display the products
	public static void printAll(List<Product> l) {
		int i=1;
		System.out.println("********************************");
		for(Product p:l) {
			System.out.println((i++)+"."+p.getName());
		}
		System.out.println("********************************");
	}
	
	//Method to place order
	public static void purchase(List<Product> l,int position) {
		try {
			Product p=l.get(position-1);
			System.out.println("Enter the quantity to purchase");
			int q=sc.nextInt();
			if(p.getQuantity()-q<0) {
				Runnable r=new Loader(p,"Out of Stock : Transaction Failed")::logWriter;
				Thread t=new Thread(r);
				t.start();
				throw new OutOfStockException();
			}
			p.setQuantity(p.getQuantity()-q);
			Runnable r=new Loader(p,"Order Success")::logWriter;
			Thread t=new Thread(r);
			t.start();
			System.out.println("Successfully Ordered");
		}
		catch(IndexOutOfBoundsException e) {
			System.err.println("Invalid Product Error: No such product Available");
		}
		catch(OutOfStockException e) {
			System.err.println("Out of Stock Exception: No stock to process your transaction");
		}
	}
}
