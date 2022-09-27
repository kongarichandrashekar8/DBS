package com.payment.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.dao.CustomerRepository;
import com.payment.entity.Customer;

@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	CustomerRepository customerRepository;

	@Override
	public Customer getCustomer(long customerId) {
		// TODO Auto-generated method stub
		return customerRepository.getCustomer(customerId);
	}

	@Override
	public Customer addCustomerDetails(Customer customer) {
		
		return customerRepository.save(customer);
	}
	
	
}
