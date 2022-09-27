package com.payment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionObject {
	
	String senderId;
	String currencyCode;
	String senderBankId;
	String receiverBankId;
	String reciverAccountHolderNumber;
	String reciverAccountHolderName;
	String transferType;
	String message;
	String amount;
	

}
