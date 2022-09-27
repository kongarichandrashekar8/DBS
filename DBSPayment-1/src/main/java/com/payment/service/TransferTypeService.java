package com.payment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.payment.entity.TransferType;

@Service
public interface TransferTypeService {

	
	public TransferType addTransferTypeDetails(TransferType transferType);
	List<TransferType> getAllTransferTypes();
	
	
	
	
}
