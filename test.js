import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Transaction() {
  const [transaction, setTransaction] = useState({
    transactionId: "",
    customer: "",
    currency: "",
    senderBank: "",
    receiverBank: "",
    reciverAccountHolderNumber: "",
    receiverAccountHolderName: "",
    transferType: "",
    message: "",
    amount: "",
    transferFees: "",
    totalAmount: "",
    transferDate: "",
  });
  const [customerId, setCustomerId] = useState();
  const [senderBankId, setSenderBankId] = useState();
  const [receiverBankId, setReceiverBankId] = useState();
  const [sender, setSender] = useState({
    senderId: "",
    senderName: "",
    senderBalance: "",
  });
  const [receiverBankDetails, setReceiverBankDetails] = useState({
    bankId: "",
    bankName: "",
  });
  const [senderBankDetails, setSenderBankDetails] = useState({
    bankId: "",
    bankName: "",
  });
  const [currencyObj, setCurrencyObj] = useState();
  const [senderBankObj, setSenderBankObj] = useState();
  const [receiverBankObj, setReceiverBankObj] = useState();
  const [transferTypeObj, setTransferObj] = useState();
  const [messageCode, setMessageCode] = useState();
  const [transferType, setTransferType] = useState();

  const [transferVisibility, setTransferVisibility] = useState(false);
  const [receiverVisibility, setReceiverVisibility] = useState(false);
  const [senderBankVisibility, setSenderBankVisibility] = useState(false);
  const [receiverBankVisibility, setReceiverBankVisibility] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("tdagsyhj");
    getCustomer();
  }, [customerId]);

  const getCustomer = (e) => {
    axios
      .get("http://localhost:8088/dbsapi/customer/" + customerId)

      .then((res) => {
        setSender({
          senderId: res.data.customerId,
          senderName: res.data.customerName,
          senderBalance: res.data.clearBalance,
        });
        setSenderBankVisibility(true);
        setCustomerId(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log("tdagsyhj");
    getSenderBank();
  }, [senderBankId]);
  const getSenderBank = (e) => {
    axios
      .get("http://localhost:8088/dbsapi/bank/" + senderBankId)

      .then((res) => {
        setSenderBankId(res.data);
        setSenderBankDetails({
          bankId: res.data.bankId,
          bankName: res.data.bankName,
        });
        setReceiverVisibility(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReceiverBank = (e) => {
    axios
      .get("http://localhost:8088/dbsapi/bank/" + receiverBankId)

      .then((res) => {
        setReceiverBankDetails({
          bankId: res.data.bankId,
          bankName: res.data.bankName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendDataToAPI = (e) => {
    axios
      .post(
        "http://localhost:8088/dbsapi/transaction",
        {
          transactionId: parseInt(transaction.transactionId),
          customer: {
            customerId: parseInt(transaction.customer),
            customerName: "Jack Sparrow",
            overDraftStatus: true,
            clearBalance: 400000,
            customerAddress: "Hyderabad,Telangana",
            customerCity: "Hyderabad",
            bank: { bic: "BCEYINYMTYU", bankName: "SBI" },
          },
          currency: {
            currencyCode: "INR",
            currencyName: "Indian rupee",
            conversionRate: 12.0,
          },
          senderBank: { bic: "BCEYINYMTYU", bankName: "SBI" },
          receiverBank: { bic: "BCEYINYMTYU", bankName: "SBI" },
          reciverAccountHolderNumber: parseInt(
            transaction.reciverAccountHolderNumber
          ),
          receiverAccountHolderName: transaction.receiverAccountHolderName,
          transferType: {
            transferTypeCode: "cus",
            transferTypeDescription: "customer type",
          },
          message: { messageCode: "QWE", instruction: "if" },
          amount: parseInt(transaction.amount),
          transferFees: parseInt(transaction.transferFees),
          totalAmount: parseInt(transaction.totalAmount),
          transferDate: transaction.transferDate,
        },
        { headers: { "Content-Type": "application/json; charset=utf-8" } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeTranscation = (e) => {
    e.preventDefault();
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCustomer = (e) => {
    e.preventDefault();
    if (e.target.value.length > 7) {
      setCustomerId(e.target.value);
    } else {
      setSenderBankVisibility(false);
      setSender({
        senderId: "",
        senderName: "",
        senderBalance: "",
      });
    }
  };
  const onChangeSenderBank = (e) => {
    e.preventDefault();
    if (e.target.value.length > 9) {
      setSenderBankId(e.target.value);
    } else {
      setReceiverVisibility(false);
      setSenderBankDetails({
        bankId: "",
        bankName: "",
      });
    }
  };
  const onChangeReceiverBank = (e) => {
    e.preventDefault();

    setReceiverBankId(e.target.value);
  };
  const onChangeTransferType = (e) => {
    e.preventDefault();
    setTransferType(e.target.value);
  };
  const onChangeMessageCode = (e) => {
    e.preventDefault();
    setMessageCode(e.target.value);
  };
  return (
    <div>
      <Form>
        <Form.Field>
          <h3>Sender Details</h3>
          <label>Sender Id</label>
          <input name="customerId" onChange={onChangeCustomer} />
        </Form.Field>
      </Form>

      <h3>sender name : {sender.senderName}</h3>
      <h3>Sender balance : {sender.senderBalance}</h3>

      {senderBankVisibility && (
        <Form>
          <Form.Field>
            <h3>Sender Bank Details</h3>
            <label>Sender Bank Id</label>
            <input name="senderBankId" onChange={onChangeSenderBank} />
          </Form.Field>
          <h3>sender bank name : {senderBankDetails.bankName}</h3>
        </Form>
      )}
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          transfer Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={transferType}
          onChange={onChangeTransferType}
          label="transferType"
        >
          <MenuItem value={0}>Customer</MenuItem>
          <MenuItem value={2}>Bank</MenuItem>
          <MenuItem value={3}>Self</MenuItem>
        </Select>
      </FormControl>

      {receiverVisibility && (
        <Form>
          <Form.Field>
            <h3>Receiver Bank</h3>
            <label>Receiver Bank Id</label>
            <input name="senderBankId" onChange={onChangeReceiverBank} />
          </Form.Field>
          <Button type="submit" onClick={getReceiverBank}>
            Next
          </Button>
        </Form>
      )}
      <h3>sender bank name : {receiverBankDetails.bankName}</h3>

      <Form>
        <Form.Field>
          <label>transactionId</label>
          <input
            name="transactionId"
            onChange={onChangeTranscation}
            placeholder="transactionId"
          />
        </Form.Field>

        <Form.Field>
          <label>Sender Id</label>
          <input name="customer" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>currency</label>
          <input name="currency" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>senderBank</label>
          <input name="senderBank" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>receiverBank</label>
          <input name="receiverBank" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>reciverAccountHolderNumber</label>
          <input
            name="reciverAccountHolderNumber"
            onChange={onChangeTranscation}
          />
        </Form.Field>
        <Form.Field>
          <label>receiverAccountHolderName</label>
          <input
            name="receiverAccountHolderName"
            onChange={onChangeTranscation}
          />
        </Form.Field>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Message Code
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={messageCode}
            onChange={onChangeMessageCode}
            label="messagecode"
          >
            <MenuItem value={1}>CHQB</MenuItem>
            <MenuItem value={0}>CORT</MenuItem>
            <MenuItem value={3}>HOLD</MenuItem>
            <MenuItem value={4}>INTC</MenuItem>
            <MenuItem value={5}>PHOB</MenuItem>
            <MenuItem value={6}>PHOI</MenuItem>
            <MenuItem value={7}>PHON</MenuItem>
            <MenuItem value={8}>REPA</MenuItem>
            <MenuItem value={9}>SDVA</MenuItem>
          </Select>
        </FormControl>

        <Form.Field>
          <label>amount</label>
          <input name="amount" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>transferFees</label>
          <input name="transferFees" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>totalAmount</label>
          <input name="totalAmount" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>transferDate</label>
          <input name="transferDate" onChange={onChangeTranscation} />
        </Form.Field>

        <Button type="submit" onClick={sendDataToAPI}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

/*
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

export default function Transaction() {
  const [transaction, setTransaction] = useState({
    transactionId: "",
    customer: "",
    currency: "",
    senderBank: "",
    receiverBank: "",
    reciverAccountHolderNumber: "",
    receiverAccountHolderName: "",
    transferType: "",
    message: "",
    amount: "",
    transferFees: "",
    totalAmount: "",
    transferDate: "",
  });
  const [customerObj, setCustomerObj] = useState();
  const [currencyObj, setCurrencyObj] = useState();
  const [senderBankObj, setSenderBankObj] = useState();
  const [receiverBankObj, setReceiverBankObj] = useState();
  const [transferTypeObj, setTransferObj] = useState();
  const [messageObj, setMessageObj] = useState();

  const sendDataToAPI = (e) => {
    axios
      .post(
        "http://localhost:8088/dbsapi/transaction",
        {
          transactionId: parseInt(transaction.transactionId),
          customer: {
            customerId: parseInt(transaction.customer),
            customerName: "Jack Sparrow",
            overDraftStatus: true,
            clearBalance: 400000,
            customerAddress: "Hyderabad,Telangana",
            customerCity: "Hyderabad",
            bank: { bic: "BCEYINYMTYU", bankName: "SBI" },
          },
          currency: {
            currencyCode: "INR",
            currencyName: "Indian rupee",
            conversionRate: 12.0,
          },
          senderBank: { bic: "BCEYINYMTYU", bankName: "SBI" },
          receiverBank: { bic: "BCEYINYMTYU", bankName: "SBI" },
          reciverAccountHolderNumber: parseInt(
            transaction.reciverAccountHolderNumber
          ),
          receiverAccountHolderName: transaction.receiverAccountHolderName,
          transferType: {
            transferTypeCode: "cus",
            transferTypeDescription: "customer type",
          },
          message: { messageCode: "QWE", instruction: "if" },
          amount: parseInt(transaction.amount),
          transferFees: parseInt(transaction.transferFees),
          totalAmount: parseInt(transaction.totalAmount),
          transferDate: transaction.transferDate,
        },
        { headers: { "Content-Type": "application/json; charset=utf-8" } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeTranscation = (e) => {
    e.preventDefault();
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Form>
        <Form.Field>
          <h3>Sender Details</h3>
          <label>Sender Id</label>
          <input name="customer" onChange={onChangeTranscation} />
        </Form.Field>
      </Form>
      <Form>
        <Form.Field>
          <label>transactionId</label>
          <input
            name="transactionId"
            onChange={onChangeTranscation}
            placeholder="transactionId"
          />
        </Form.Field>
        <Form.Field>
          <label>Sender Id</label>
          <input name="customer" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>currency</label>
          <input name="currency" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>senderBank</label>
          <input name="senderBank" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>receiverBank</label>
          <input name="receiverBank" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>reciverAccountHolderNumber</label>
          <input
            name="reciverAccountHolderNumber"
            onChange={onChangeTranscation}
          />
        </Form.Field>
        <Form.Field>
          <label>receiverAccountHolderName</label>
          <input
            name="receiverAccountHolderName"
            onChange={onChangeTranscation}
          />
        </Form.Field>
        <Form.Field>
          <label>transferType</label>
          <input name="transferType" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>message</label>
          <input name="message" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>amount</label>
          <input name="amount" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>transferFees</label>
          <input name="transferFees" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>totalAmount</label>
          <input name="totalAmount" onChange={onChangeTranscation} />
        </Form.Field>
        <Form.Field>
          <label>transferDate</label>
          <input name="transferDate" onChange={onChangeTranscation} />
        </Form.Field>

        <Button type="submit" onClick={sendDataToAPI}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
*/
