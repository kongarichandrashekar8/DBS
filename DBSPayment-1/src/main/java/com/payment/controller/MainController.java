package com.payment.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payment.dao.CustomerRepository;
import com.payment.entity.Bank;
import com.payment.entity.Currency;
import com.payment.entity.Customer;
import com.payment.entity.Message;
import com.payment.entity.Transaction;
import com.payment.entity.TransactionObject;
import com.payment.entity.TransferType;
import com.payment.exception.ExceptionHandle;
import com.payment.service.BankService;
import com.payment.service.CurrencyService;
import com.payment.service.CustomerService;
import com.payment.service.MessageService;
import com.payment.service.TransactionService;
import com.payment.service.TransferTypeService;
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/dbsapi")

public class MainController {
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	BankService bankService;
	
	@Autowired
	CustomerService customerService;  //update
	
	@Autowired
	CurrencyService currencyService;
	
	@Autowired
	MessageService messageService;
	
	@Autowired
	TransferTypeService transferTypeService;
	
	@Autowired
	TransactionService transactionService;
	
	@GetMapping(value = "/addbank")
	Customer addbankDetails() {
//		Bank bank = new Bank();
//		bank.setBic("BCEYINYMTYU");
//		bank.setBankName("SBI");
//		Bank result = bankService.addBankDetails(bank);
		
		Customer customer =new Customer();
		customer.setClearBalance(0);
		customer.setCustomerAddress("Mumbai,Maharastra");
		customer.setCustomerCity("Munbai");
		customer.setCustomerId(56382872);
		customer.setCustomerName("Sravani ");
		customer.setOverDraftStatus(false);
		Customer customerResult=customerService.addCustomerDetails(customer);
		Customer customer1 =new Customer();
		customer1.setClearBalance(500000);
		customer1.setCustomerAddress("Mumbai,Maharastra");
		customer1.setCustomerCity("Munbai");
		customer1.setCustomerId(12453276);
		customer1.setCustomerName("pranathi");
		customer1.setOverDraftStatus(true);
		customerService.addCustomerDetails(customer1);
	
		
		
		
//		Currency currency=new Currency();
//		currency.setConversionRate(12);
//		currency.setCurrencyCode("INR");
//		currency.setCurrencyName("Indian rupee");
//		Currency currencyResult=currencyService.addCurrency(currency);
//		
//		Message message=new Message();
//		message.setInstruction("if");
//		message.setMessageCode("QWE");
//		Message messageResult=messageService.addMessageDetails(message);
//		
//		TransferType transferType=new TransferType();
//		transferType.setTransferTypeCode("cus");
//		transferType.setTransferTypeDescription("customer type");
//		TransferType transferTypeResult=transferTypeService.addTransferTypeDetails(transferType);
		
		
		return customerResult;
	}
	
	@CrossOrigin("*")
	@GetMapping(value="/getCustomer/{customerid}")
	Optional<Customer> getCustomerDetails(@PathVariable("customerid") long customerid) {
		
		
		return customerRepository.findById(customerid);
		
	}
	
	@CrossOrigin("*")
	@GetMapping(value="/getBankDetails/{bic}")
	Bank getBankDetailsById(@PathVariable("bic") String bic){
		
		return bankService.getBankDetailsById(bic);
		
	}
	
	@CrossOrigin("*")
	@GetMapping(value="/getAllTransferTypes")
	List<TransferType> getAllTransferTypes(){
		return transferTypeService.getAllTransferTypes();
	}
	
	@CrossOrigin("*")
	@GetMapping(value="/getMessageCodes")
	List<Message> getMessageCodes(){
		return messageService.getMessageCodes();
	}
	
	@GetMapping(value="/addTransferType")
	TransferType addTransferType() {
		TransferType tt=new TransferType("Customer","This is Customer Type");
		return transferTypeService.addTransferTypeDetails(tt);
	}
	
	/*
	@GetMapping(value="/getAllCustomerDetails")
	List<Customer> getListOfCustomers(){
	
	
		
		
		
		return customerRepository.findAll();
		
	}*/
	@CrossOrigin("*")
	//@PostMapping(value="/transaction")
	Transaction addTranscation(@RequestBody Transaction transaction)throws ExceptionHandle {
		System.out.println("fwdhs");
		
		return transactionService.saveTransaction(transaction);//new ResponseEntity(transactionService, HttpStatus.OK);
	}
	@GetMapping(value="/getAmount")
	double getAmount() {
		return customerRepository.getClearBalanceById(87654321);
		
	}
	@CrossOrigin("*")
	@GetMapping(value="/customer/{customerId}")
	Customer getCustomer(@PathVariable("customerId")long cus) {
		return customerService.getCustomer(cus);
	}
	@CrossOrigin("*")
	@GetMapping(value="/bank/{bankId}")
	Bank getBank(@PathVariable("bankId")String bankId) {
		return bankService.getBankDetailsById(bankId);
	}
	
	@CrossOrigin("*")
	@PostMapping(value="/transaction")
	Transaction transcation(@RequestBody TransactionObject transactionObject)throws ExceptionHandle {
		System.out.println("fwdhs");
		
		return transactionService.saveTransaction(transactionObject);//new ResponseEntity(transactionService, HttpStatus.OK);
	}
	@CrossOrigin("*")
    @GetMapping(value="/transaction/{id}")
    Optional<Transaction> getTransactionById(@PathVariable("id") int id){
        return transactionService.getTransactionDetailById(id);
    }
	
	@CrossOrigin("*")
    @GetMapping(value="/alltransaction/{cid}")
    List<Transaction> getAllTransactionById(@PathVariable("cid") long cid){
        return transactionService.getAllTransactionsByCustomerId(cid);
    }
	
	
}