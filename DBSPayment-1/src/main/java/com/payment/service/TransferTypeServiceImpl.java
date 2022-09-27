package com.payment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.dao.TransferTypeRepository;
import com.payment.entity.TransferType;

@Service
public class TransferTypeServiceImpl implements TransferTypeService{

	@Autowired
	TransferTypeRepository transferTypeRepository;
	
	@Override
	public TransferType addTransferTypeDetails(TransferType transferType) {
		// TODO Auto-generated method stub
		return transferTypeRepository.save(transferType);
	}

	@Override
	public List<TransferType> getAllTransferTypes() {
		// TODO Auto-generated method stub
		return transferTypeRepository.findAll();
	}

}
