package com.payment.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.payment.entity.Bank;

@Repository
public interface BankRepository extends JpaRepository<Bank, String>{
	@Query(value="select * from bank where bic =:code",nativeQuery = true)
    public Bank getBankById(@Param("code") String code);
} 