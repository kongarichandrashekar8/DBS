package com.payment.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.payment.entity.Currency;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, String>{
	@Query(value="select * from currency where currency_code =:code",nativeQuery = true)
    public Currency getCurrencyById(@Param("code") String code);

	
}