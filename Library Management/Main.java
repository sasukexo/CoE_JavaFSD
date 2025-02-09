package com.library;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

interface ILibrary {
	   void borrowBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException;
	   void returnBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException;
	   void reserveBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException;
	   Book searchBook(String title);
	}

abstract class LibrarySystem implements ILibrary {
	   protected List<Book> books;
	   protected List<User> users;

	   public abstract void addBook(Book book);
	   public abstract void addUser(User user);

	   // Implementations for ILibrary methods
}
class LibraryManager extends LibrarySystem {
	  
	public LibraryManager() {
		if(books==null) {
			books=new ArrayList<>();
		}
		if(users==null) {
			users=new ArrayList<>();
		}
	}
	@Override
	public void addBook(Book book) {
		
		books.add(book);
	}
	@Override
	public void addUser(User user) {
		
		users.add(user);
	}
	@Override
	public void borrowBook(String ISBN, String userID)
			throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException {
		for(User u:users) {
			if(u.getUserID().equals(userID)) {
				if(u.getBorrowedBooks().size()==5) {
					throw new MaxBooksAllowedException();
				}
				for(Book b:books) {
					if(b.getISBN().equals(ISBN)) {
						u.getBorrowedBooks().add(b);
					}
				}
				throw new BookNotFoundException();
			}
		}
		throw new UserNotFoundException();
	}
	@Override
	public void returnBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException {
		
		for(User u:users) {
			if(u.getUserID().equals(userID)) {
				for(Book b:books) {
					if(b.getISBN().equals(ISBN)) {
						u.getBorrowedBooks().remove(b);
					}
				}
				throw new BookNotFoundException();
			}
		}
		throw new UserNotFoundException();
	}
	@Override
	public void reserveBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException {
		for(User u:users) {
			if(u.getUserID().equals(userID)) {
				for(Book b:books) {
					if(b.getISBN().equals(ISBN)) {
						u.getBorrowedBooks().add(b);
					}
				}
				throw new BookNotFoundException();
			}
		}
		throw new UserNotFoundException();
		
	}
	@Override
	public Book searchBook(String title) {
		
		return null;
	}
	
}


public class Main {
	
	public static File f;

	public static void main(String[] args) {
		LibraryManager libManager=new LibraryManager();
		Scanner sc;
		try {
			f=new File(System.getProperties().get("user.dir")+"\\src\\files\\books.txt");
			sc=new Scanner(f);
			while(sc.hasNextLine()) {
				String[] s=sc.nextLine().trim().split("[:]");
				libManager.addBook(new Book(s[0],s[1],s[2]));
			}
			
			f=new File(System.getProperties().get("user.dir")+"\\src\\files\\users.txt");
			sc=new Scanner(f);
			while(sc.hasNextLine()) {
				String[] s=sc.nextLine().trim().split("[:]");
				List<Book> bb=new ArrayList<>();
				for(String temp:s[2].split(",")) {
					for(Book b:libManager.books) {
						if(b.getISBN().equals(temp)) {
							
							bb.add(b);
						}
				}
				System.out.println(bb.size());
				libManager.addUser(new User(s[0],s[1],bb));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			libManager.borrowBook(libManager.books.get(0).getISBN(),libManager.users.get(1).getUserID());
		} catch (BookNotFoundException e) {
			e.printStackTrace();
		} catch (UserNotFoundException e) {
			e.printStackTrace();
		} catch (MaxBooksAllowedException e) {
			e.printStackTrace();
		}

	}
	
	
}
