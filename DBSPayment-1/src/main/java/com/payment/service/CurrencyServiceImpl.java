package com.payment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.dao.CurrencyRepository;
import com.payment.entity.Currency;

@Service
public class CurrencyServiceImpl implements CurrencyService {

	@Autowired
	CurrencyRepository currencyRepository;
	
	@Override
	public Optional<Currency> getCurrencyDetailsByCode(String currencyCode) {
		
		
		return currencyRepository.findById(currencyCode);
	}

	@Override
	public List<Currency> getAllCurrencyDetails() {
		
		return currencyRepository.findAll();
	}

	@Override
	public Currency addCurrency(Currency currency) {
		
		return currencyRepository.save(currency);
	}

}
