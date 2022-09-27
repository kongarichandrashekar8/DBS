package com.payment.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.dao.BankRepository;
import com.payment.entity.Bank;
import com.payment.exception.ExceptionHandle;

@Service
public class BankServiceImpl implements BankService{
	
	@Autowired
	BankRepository bankrepository;

	@Override
	public Bank addBankDetails(Bank bank) {
		return bankrepository.save(bank);
	}

	@Override
	public Bank updateBankDetails(Bank bank) {
		return null;
	}

	@Override
	public void deleteBank(String bic) {
		bankrepository.deleteById(bic);
	}

	@Override
	public List<Bank> getAllBankDetails() {
		return bankrepository.findAll();
	}

	@Override
	public Bank getBankDetailsById(String bic) {
		Bank b=new Bank();
		b=bankrepository.getBankById(bic);
		System.out.println(b);
		
		if(b==null) {
			System.out.print("ifblock");
			throw new ExceptionHandle("bank Id not found........%%%%%%%");
		}
		b.getBankName();
		
		return b;
	}

}