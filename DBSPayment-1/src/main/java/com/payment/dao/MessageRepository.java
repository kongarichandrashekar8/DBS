package com.payment.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.payment.entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, String>{
	@Query(value="select instruction from message where message_code =:code",nativeQuery = true)
    public String getInstructionById(@Param("code") String code);
	
	@Query(value="select * from message where message_code =:code",nativeQuery = true)
    public Message getMessageById(@Param("code") String code);
}