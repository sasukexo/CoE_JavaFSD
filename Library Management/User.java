package com.library;

import java.util.List;

public class User {
	private String name;
	private String userID;
	private List<Book> borrowedBooks;
	
	public User(String name,String userId,List<Book> bb) {
		this.name=name;
		this.userID=userId;
		this.borrowedBooks=bb;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public List<Book> getBorrowedBooks() {
		return borrowedBooks;
	}
	public void setBorrowedBooks(List<Book> borrowedBooks) {
		this.borrowedBooks = borrowedBooks;
	}

	
}
