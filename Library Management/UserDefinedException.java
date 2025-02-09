package com.library;

public class UserDefinedException {

	
}

@SuppressWarnings("serial")
class BookNotFoundException extends Exception{
	public BookNotFoundException() {
		
	}
}

@SuppressWarnings("serial")
class UserNotFoundException extends Exception{
	public UserNotFoundException() {
		
	}
}

@SuppressWarnings("serial")
class MaxBooksAllowedException extends Exception{
	public MaxBooksAllowedException() {
		
	}
}