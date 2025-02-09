package com.warehouse;

public class Product {

	private String id;
	private String name;
	private int quantity;
	private Locations location;
	
	public Product(String id,String name,String quantity,String location){
		this.id=id;
		this.name=name;
		this.quantity=Integer.parseInt(quantity);
		String[] loc=location.trim().split("[.]");
		this.location=new Locations(loc[0],loc[1],loc[2]);
	}

	
	@Override
	public String toString() {
		return id + "," + name + "," + quantity + "," + location.toString();
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Locations getLocation() {
		return location;
	}

	public void setLocation(Locations location) {
		this.location = location;
	}
	
	//Method to filter the products
	public boolean matchKeys(String name,String filter) {
		for(int i=0;i<=name.length()-filter.length();i++){
			if(name.substring(i, i+filter.length()).equalsIgnoreCase(filter)) {
				return true;
			}
		}
		return false;
	}
}
