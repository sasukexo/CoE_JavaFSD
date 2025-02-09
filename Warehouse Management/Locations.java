package com.warehouse;

public class Locations {

	private String aisles;
	private String shelves;
	private String bin;
	
	public Locations(String aisles,String shelves,String bin) {
		this.aisles=aisles;
		this.shelves=shelves;
		this.bin=bin;
	}

	public Locations(String[] s) {
		this.aisles=s[0];
		this.shelves=s[1];
		this.bin=s[2];
	}
	
	@Override
	public String toString() {
		return aisles + "." + shelves + "." + bin;
	}


	public String getAisles() {
		return aisles;
	}

	public void setAisles(String aisles) {
		this.aisles = aisles;
	}

	public String getShelves() {
		return shelves;
	}

	public void setShelves(String shelves) {
		this.shelves = shelves;
	}

	public String getBin() {
		return bin;
	}

	public void setBin(String bin) {
		this.bin = bin;
	}
	
	
}
