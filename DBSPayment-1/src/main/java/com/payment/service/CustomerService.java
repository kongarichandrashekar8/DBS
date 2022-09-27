package com.payment.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.payment.entity.Customer;

@Service
public interface CustomerService {

	public Customer getCustomer(long customerId);
	public Customer addCustomerDetails(Customer customer);
}
