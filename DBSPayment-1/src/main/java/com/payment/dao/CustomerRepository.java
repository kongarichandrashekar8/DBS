package com.payment.dao;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.payment.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	
	@Query(value="select clear_balance from customer where customer_id =:cusId",nativeQuery = true)
    public double getClearBalanceById(@Param("cusId") long cusId);
	
	@Query(value="select * from customer where customer_id =:cusId",nativeQuery = true)
    public Customer getCustomer(@Param("cusId") long cusId);

}