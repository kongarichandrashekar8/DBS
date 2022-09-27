package com.payment.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.payment.entity.Transaction;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
	@Query(value="select * from transaction where customer_id =:cid",nativeQuery = true)
    public List<Transaction> findAllByCustId(@Param("cid") long cid);
}