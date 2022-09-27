package com.payment.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.payment.entity.Customer;
import com.payment.entity.SanctionList;

@Repository
public interface SanctionListRepository extends JpaRepository<SanctionList, String>{
	@Query(value="select * from sanction_list where name =:n",nativeQuery = true)
    public SanctionList getSactionList(@Param("n") String n);
}
