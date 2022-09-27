package com.payment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.payment.entity.Currency;

@Service
public interface CurrencyService {
	public Optional<Currency> getCurrencyDetailsByCode(String currencyCode);
	public List<Currency> getAllCurrencyDetails();
	public Currency addCurrency(Currency currency);
	
}
