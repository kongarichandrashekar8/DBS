package com.payment.service;

import java.util.List;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.payment.entity.Transaction;
import com.payment.entity.TransactionObject;
import com.payment.exception.ExceptionHandle;

@Service
public interface TransactionService {

	public Transaction saveTransaction(Transaction transaction) throws ExceptionHandle;
	public Transaction saveTransaction(TransactionObject transaction) throws ExceptionHandle;
	Optional<Transaction> getTransactionDetailById(int transactionId);
	List<Transaction> getAllTransactionsByCustomerId(long cid);
	
}
