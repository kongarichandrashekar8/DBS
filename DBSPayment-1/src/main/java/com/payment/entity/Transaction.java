package com.payment.entity;

import java.util.Optional;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Transaction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int transactionId;
	
	@ManyToOne
	@JoinColumn(name = "customerId")
	private Customer customer;
	
	@ManyToOne
	@JoinColumn(name = "currencycode")
	private Currency currency;
	
	@ManyToOne
	@JoinColumn(name = "senderBic")
	private Bank senderBank;
	
	@ManyToOne
	@JoinColumn(name = "receiverBic")
	private Bank receiverBank;
	
	private long reciverAccountHolderNumber;
	private String receiverAccountHolderName;
	
	@ManyToOne
	@JoinColumn(name = "transferTyperCode")
	private TransferType transferType;
	
	@ManyToOne
	@JoinColumn(name = "messageCode")
	private Message message;
	
	private double amount;
	private double transferFees;
	private double totalAmount;
	private String transferDate;
}
