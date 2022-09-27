package com.payment.service;

import java.util.List;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.payment.entity.Bank;


@Service
public interface BankService {
	public Bank addBankDetails(Bank bank);
	public Bank updateBankDetails(Bank bank);
	public void deleteBank(String bic);
	public List<Bank> getAllBankDetails();
	public Bank getBankDetailsById(String bic);
}