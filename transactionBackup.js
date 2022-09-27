import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
import TextField from "@mui/material/TextField";

export default function Transaction() {
  const [transaction, setTransaction] = useState({
    senderId: "",
    currencyCode: "",
    senderBankId: "",
    receiverBankId: "",
    reciverAccountHolderNumber: "",
    reciverAccountHolderName: "", //change1
    transferType: "",
    message: "",
    amount: "",
  });

  //validating form input
  const [idError, setIdError] = useState("");
  const [bankIdError, setBankIdError] = useState("");

  const [customerId, setCustomerId] = useState("");
  const [senderBankId, setSenderBankId] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [message, setMessage] = useState();
  const [amount, setAmount] = useState("");
  const [receiverBankId, setReceiverBankId] = useState();
  const [senderName, setSenderName] = useState(); //change 2
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
  const [transferTypeObj, setTransferObj] = useState();
  const [messageCode, setMessageCode] = useState("");
  const [transferType, setTransferType] = useState();
  const [receiverName, setReceiverName] = useState();
  const [receiverId, setReceiverId] = useState();

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
      .get("http://localhost:8080/dbsapi/customer/" + customerId)

      .then((res) => {
        setSender({
          senderId: res.data.customerId,
          senderName: res.data.customerName,
          senderBalance: res.data.clearBalance,
        });
        setSenderBankVisibility(true);
        setCustomerId(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log("tdagsyhj");
    getSenderBank();
  }, [senderBankId]);
  const getSenderBank = (e) => {
    axios
      .get("http://localhost:8080/dbsapi/bank/" + senderBankId)

      .then((res) => {
        setSenderBankId(res.data);
        setSenderBankDetails({
          bankId: res.data.bic,
          bankName: res.data.bankName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // Update the document title using the browser API
    console.log("tdagsyhj");
    getReceiverBank();
  }, [receiverBankId]);
  const getReceiverBank = (e) => {
    axios
      .get("http://localhost:8080/dbsapi/bank/" + receiverBankId)

      .then((res) => {
        setReceiverBankDetails({
          bankId: res.data.bic,
          bankName: res.data.bankName,
        });
        setReceiverVisibility(true);
      })
      .catch((err) => {
        console.log(err);
        setReceiverBankDetails({
          bankId: "",
          bankName: "",
        });
      });
  };

  const sendDataToAPI = (e) => {
    axios
      .post(
        "http://localhost:8080/dbsapi/transaction",
        {
          senderId: sender.senderId,
          currencyCode: currencyCode,
          senderBankId: senderBankDetails.bankId,
          receiverBankId: receiverBankDetails.bankId,
          reciverAccountHolderNumber: receiverId,
          reciverAccountHolderName: receiverName,

          transferType: transferType,
          message: messageCode,
          amount: amount,
        },
        { headers: { "Content-Type": "application/json; charset=utf-8" } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        //console.log(error);
        if (error.response) {
          console.log("hgcjbdscjs");

          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  const onChangeTranscation = (e) => {
    e.preventDefault();
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  // let validate=false
  // const validateId=()=>{
  //     if(customerId.length<=7){
  //     setIdError("Id must be atleast 7 characters")
  //     validate=true
  //     }
  // }

  const onChangeCustomer = (e) => {
    e.preventDefault();

    //validating for 7 chars
    // if(e.target.value.length<=7){
    //   setIdError("Id must be atleast 8 characters")
    // }

    if (e.target.value.length > 7) {
      setCustomerId(e.target.value);
    } else {
      setSenderBankVisibility(false);
      setSender({
        senderId: "",
        senderName: "",
        senderBalance: "",
      });
      setIdError("Id must be atleast 8 digits");
    }
  };
  const onChangeSenderBank = (e) => {
    e.preventDefault();
    if (e.target.value.length > 10) {
      setSenderBankId(e.target.value);
      setTransferVisibility(true);
    } else {
      setReceiverBankVisibility(false);
      setSenderBankDetails({
        bankId: "",
        bankName: "",
      });
      setBankIdError("Id must be atleast 10 characters");
    }
  };
  const onChangeReceiverBank = (e) => {
    e.preventDefault();

    if (e.target.value.length > 10) {
      setReceiverBankId(e.target.value);
    } else {
      setReceiverBankDetails({
        bankId: "",
        bankName: "",
      });
    }
  };
  const onChangeTransferType = (e) => {
    e.preventDefault();
    setTransferType(e.target.value);
    if (e.target.value != "Self") {
      setReceiverBankVisibility(true);
    } else {
      setReceiverBankVisibility(false);
      setReceiverVisibility(false);
    }
  };
  const onChangeReciverId = (e) => {
    e.preventDefault();
    setReceiverId(e.target.value);
  };
  const onChangeMessageCode = (e) => {
    e.preventDefault();
    setMessageCode(e.target.value);
  };
  const onChangeAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };
  const onChangeReciverName = (e) => {
    e.preventDefault();
    setReceiverName(e.target.value);
  };
  const onChangeCurrencyCode = (e) => {
    e.preventDefault();
    setCurrencyCode(e.target.value);
    console.log(currencyCode);
  };
  return (
    <div>
      <div class="card">
        <Form>
          <Form.Field>
            <h3>Sender Details</h3>
            <label>Sender Id </label>
            {/* <input name="customerId" onChange={onChangeCustomer} /> */}
            <TextField
              error={idError ? true : false}
              id="outlined-basic"
              label="Sender Id"
              variant="outlined"
              onChange={onChangeCustomer}
              helperText={idError}
            />
          </Form.Field>
        </Form>
      </div>

      {senderBankVisibility && (
        <div class="card">
          <Form>
            <h3>Sender name : {sender.senderName}</h3>
            <h3>Sender balance : {sender.senderBalance}</h3>
            <Form.Field>
              <h3>Sender Bank Details</h3>
              <label>Sender Bank Id </label>

              {/* <input name="senderBankId" onChange={onChangeSenderBank} /> */}

              <TextField
                error={bankIdError ? true : false}
                id="outlined-basic"
                label="Sender Bank Id"
                variant="outlined"
                onChange={onChangeSenderBank}
                helperText={bankIdError}
              />
            </Form.Field>
          </Form>
        </div>
      )}
      {transferVisibility && (
        <div class="card">
          <h3>Sender bank name : {senderBankDetails.bankName}</h3>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Transfer Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={transferType}
              onChange={onChangeTransferType}
              label="transferType"
            >
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
              <MenuItem value="Self">Self</MenuItem>
            </Select>
          </FormControl>
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
            <br></br>
            <label>Amount </label>
            {/* <input name="amount" onChange={onChangeTranscation} /> */}
            <TextField
              //  error={idError?true:false}
              id="outlined-basic"
              label="Amount"
              value={amount}
              variant="outlined"
              onChange={onChangeAmount}
            />
          </Form.Field>
          <Form.Field>
            <br></br>
            <label>Currency </label>
            {/* <input name="currency" onChange={onChangeTranscation} /> */}
            <TextField
              //  error={idError?true:false}
              id="outlined-basic"
              label="Currency"
              variant="outlined"
              value={currencyCode}
              onChange={onChangeCurrencyCode}
            />
          </Form.Field>{" "}
        </div>
      )}

      {receiverBankVisibility && (
        <div class="card">
          <Form>
            <Form.Field>
              <h3>Receiver Bank </h3>
              <label>Receiver Bank Id </label>
              {/* <input name="senderBankId" onChange={onChangeReceiverBank} /> */}
              <TextField
                //  error={idError?true:false}
                id="outlined-basic"
                label="Receiver bank id"
                variant="outlined"
                onChange={onChangeReceiverBank}
              />
            </Form.Field>
          </Form>
        </div>
      )}

      {receiverVisibility && (
        <Form>
          <h3>Receiver bank name : {receiverBankDetails.bankName}</h3>
          <Form.Field>
            <label>ReciverAccountHolderNumber </label>
            {/* <input
              name="reciverAccountHolderNumber"
              onChange={onChangeTranscation}
            /> */}
            <TextField
              //  error={idError?true:false}
              id="outlined-basic"
              label="Receiver account number"
              variant="outlined"
              onChange={onChangeReciverId}
            />
          </Form.Field>
          <Form.Field>
            <label>ReceiverAccountHolderName </label>
            {/* <input
              name="receiverAccountHolderName"
              onChange={onChangeTranscation}
            /> */}
            <TextField
              //  error={idError?true:false}
              id="outlined-basic"
              label="Receiver name"
              variant="outlined"
              onChange={onChangeReciverName}
            />
          </Form.Field>

          <Button type="submit" onClick={sendDataToAPI}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}
