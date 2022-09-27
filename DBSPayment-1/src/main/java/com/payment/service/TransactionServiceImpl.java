package com.payment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.dao.BankRepository;
import com.payment.dao.CurrencyRepository;
import com.payment.dao.CustomerRepository;
import com.payment.dao.MessageRepository;
import com.payment.dao.SanctionListRepository;
import com.payment.dao.TransactionRepository;
import com.payment.dao.TransferTypeRepository;
import com.payment.entity.Bank;
import com.payment.entity.Currency;
import com.payment.entity.Customer;
import com.payment.entity.Message;
import com.payment.entity.SanctionList;
import com.payment.entity.Transaction;
import com.payment.entity.TransactionObject;
import com.payment.entity.TransferType;
import com.payment.exception.ExceptionHandle;

@Service
public class TransactionServiceImpl implements TransactionService{
	
	@Autowired 
	TransactionRepository transactionRepository;
	@Autowired 
	TransferTypeRepository transferTypeRepository;
	
	@Autowired
	SanctionListRepository sanctionListRepository;
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	CurrencyRepository currencyRepository;
	
	@Autowired
	BankRepository bankRepository;
	
	@Autowired
	MessageRepository messageRepository;

	@Override
	public Transaction saveTransaction(Transaction transaction) {
		String receiverName=transaction.getReceiverAccountHolderName();
		System.out.println(receiverName);
		SanctionList obj=sanctionListRepository.getSactionList(receiverName);
		System.out.println(obj);
        if(obj!=null) {
            //return exception message sender in block list
            throw new ExceptionHandle("Receiver is in block list");
        }
        Customer sender=customerRepository.getCustomer(transaction.getCustomer().getCustomerId());
        double amount=transaction.getAmount();
        double tranferFee=amount*(0.2);
        double totalAmount=amount+tranferFee;
                
        System.out.println("transfer fee: " + tranferFee);



       if(sender.getClearBalance()<totalAmount) {
            
            if(!sender.isOverDraftStatus()) {
                //send low balance message(exception)
                throw new ExceptionHandle("Low Balance");
            }
            
        }
        Customer recevier=customerRepository.getCustomer(transaction.getReciverAccountHolderNumber());
        System.out.print(transaction.getTransferType());
        if(transaction.getTransferType().getTransferTypeCode().equalsIgnoreCase("BANK")) {
//            if(sender.getBank().getBankName()!="HDFC" || recevier.getBank().getBankName()!="HDFC") {
//                //throw exception message incorrect transfertype
//                throw new ExceptionHandle("Incorrect transfertype");
//            }
        }
        
        System.out.println("befor : " + sender.getClearBalance() + " " + recevier.getClearBalance());
        double senderamo=sender.getClearBalance();
        
         sender.setClearBalance(senderamo-totalAmount);
         double ra=recevier.getClearBalance();
        recevier.setClearBalance(ra+amount);
        
        System.out.println("After : " + sender.getClearBalance() + " " + recevier.getClearBalance());



       
        transaction.setTransferFees(tranferFee);
        transaction.setTotalAmount(totalAmount);
        
        
        
        return transactionRepository.save(transaction);
	}

	@Override
	public Transaction saveTransaction(TransactionObject transactionObject) throws ExceptionHandle {
		try {
			Transaction transaction=new Transaction();
			/*
			 * String customerId;
		String currencyCode;
		String senderBankId;
		String receiverBankId;
		String reciverAccountHolderNumber;
		String reciverAccountHolderName;
		String transferType;
		String message;
		String amount;
			 */
			
			String receiverName=transactionObject.getReciverAccountHolderName();
			System.out.println(receiverName);
			SanctionList obj=sanctionListRepository.getSactionList(receiverName);
			System.out.println(obj);
	        if(obj!=null) {
	            
	            throw new ExceptionHandle("Receiver is in block list");
	        }
	        long senderId=Long.parseLong(transactionObject.getSenderId());
	        Customer sender=customerRepository.getCustomer(senderId);
	        
	       Currency currency= currencyRepository.getCurrencyById(transactionObject.getCurrencyCode());
	        float currencyRate = currency.getConversionRate();
	       
	        
	        double amount=Double.parseDouble(transactionObject.getAmount() );
	        amount=amount* currencyRate;
	        double tranferFee=amount*(0.2);
	        double totalAmount=amount+tranferFee;
	                
	        System.out.println("transfer fee: " + tranferFee);



	       if(sender.getClearBalance()<totalAmount) {
	            
	            if(!sender.isOverDraftStatus()) {
	                //send low balance message(exception)
	                throw new ExceptionHandle("Low Balance");
	            }
	            
	        }
	       	long recevierId=Long.parseLong(transactionObject.getReciverAccountHolderNumber());
	        Customer recevier=customerRepository.getCustomer(recevierId);
	        if(recevier==null) {
	        	throw new ExceptionHandle("Incorrect Receiver Details");
	        }
	        if(!recevier.getCustomerName().equalsIgnoreCase(receiverName)) {
	        	throw new ExceptionHandle("Receiver name is wrong");
	        }
	        //System.out.print(transactionObject.getTransferType());
	        String transferType=transactionObject.getTransferType();
	        TransferType transferTypeObj=transferTypeRepository.getTransferType(transferType);
	        if(transferType.equalsIgnoreCase("BANK")) {
//	            if(sender.getBank().getBankName()!="HDFC" || recevier.getBank().getBankName()!="HDFC") {
//	                //throw exception message incorrect transfertype
//	                throw new ExceptionHandle("Incorrect transfertype");
//	            }
	        	if(sender.getCustomerName()!="HDFC" || recevier.getCustomerName()!="HDFC") {
	        		throw new ExceptionHandle("Incorrect transfertype");
	        	}
	        }
	        
	        System.out.println("before : " + sender.getClearBalance() + " " + recevier.getClearBalance());
	        double senderamo=sender.getClearBalance();
	        
	         sender.setClearBalance(senderamo-totalAmount);
	         double ra=recevier.getClearBalance();
	        recevier.setClearBalance(ra+amount);
	        
	        System.out.println("After : " + sender.getClearBalance() + " " + recevier.getClearBalance());



	       
	        transaction.setTransferFees(tranferFee);
	        transaction.setTotalAmount(totalAmount);
	        transaction.setAmount(amount);
	        transaction.setCurrency(currency);
	        System.out.println(transactionObject.getSenderBankId());
	        Bank senderBank=bankRepository.getBankById(transactionObject.getSenderBankId());
	        if(senderBank==null) {
	        	throw new ExceptionHandle("Incorrect sender bank details");
	        	
	        }
	        Bank receiverBank=bankRepository.getBankById(transactionObject.getReceiverBankId());
	        if(receiverBank==null) {
	        	throw new ExceptionHandle("Incorrect receiver bank details");        }
	        
	        transaction.setReceiverBank(receiverBank);
	        transaction.setSenderBank(senderBank);
	        Message meesage=messageRepository.getMessageById(transactionObject.getMessage());
	        transaction.setMessage(meesage);
	        transaction.setCustomer(sender);
	        transaction.setReceiverAccountHolderName(receiverName);
	        transaction.setReciverAccountHolderNumber(recevierId);
	        transaction.setTransferDate("23/09/2022");
	        transaction.setTransferType(transferTypeObj);
			
			return transactionRepository.save(transaction);
		}
		finally {
			System.out.println("in finally block");
		}
		
	}
	@Override
	public Optional<Transaction> getTransactionDetailById(int transactionId) {
	    // TODO Auto-generated method stub
	    return transactionRepository.findById(transactionId);
	}

	@Override
	public List<Transaction> getAllTransactionsByCustomerId(long cid) {
		// TODO Auto-generated method stub
		return transactionRepository.findAllByCustId( cid);
	}
	
	

}
