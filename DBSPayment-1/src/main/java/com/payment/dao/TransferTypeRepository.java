package com.payment.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.payment.entity.TransferType;

@Repository
public interface TransferTypeRepository extends JpaRepository<TransferType, String>{
	@Query(value="select transfer_type_description from transfer_type where transfer_code =:code",nativeQuery = true)
    public String getTransferTypeById(@Param("code") String code);
	
	@Query(value="select * from transfer_type where transfer_type_code =:code",nativeQuery = true)
    public TransferType getTransferType(@Param("code") String code);
}