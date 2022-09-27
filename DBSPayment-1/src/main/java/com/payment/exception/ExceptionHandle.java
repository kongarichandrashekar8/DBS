package com.payment.exception;

public class ExceptionHandle extends RuntimeException{
	
	private String message;
    public ExceptionHandle(String message) {
        super(message);
        this.message = message;
    }
    public ExceptionHandle() {
    }
}
