import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ShowTransaction from "./ShowTransaction";
import { useNavigate } from "react-router";

import SendIcon from "@mui/icons-material/Send";

/*useState , useEffect ,Routes ,useNavigate,useParams*/
/*chang visibility*/

export default function Transaction() {
  const navigation = useNavigate();
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
  const [selectedDate, setSelectedDate] = useState("");
  const [idError, setIdError] = useState("");
  const [recIdError, setRecIdError] = useState("");
  const [bankIdError, setBankIdError] = useState("");
  const [receiverBankIdError, setReceiverBankIdError] = useState("");
  const [errorResponse, setErrorResponse] = useState("error");

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
  const [transferType, setTransferType] = useState("");
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
      .catch((err) => {
        console.log(err);
        // setSenderBankVisibility(false);
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
        //setSenderBankVisibility(false); //change2
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
        setReceiverVisibility(false); //change1
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
        navigation("/transactionResponse/" + res.data.transactionId);
      })
      .catch((error) => {
        console.log(error);
        console.log(errorResponse);
        if (error.response) {
          console.log(error.response.data.message);
          setErrorResponse(error.response.data.message);
          console.log(errorResponse);
        }
        console.log(errorResponse);
        navigation("/errorMessage/" + error.response.data.message);
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
      setIdError(false);
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
    if (e.target.value.length >= 10) {
      setSenderBankId(e.target.value);
      setTransferVisibility(true);
      setBankIdError(false);
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

    if (e.target.value.length >= 10) {
      setReceiverBankId(e.target.value);
      setReceiverBankIdError(false);
    } else {
      setReceiverBankDetails({
        bankId: "",
        bankName: "",
      });
      setReceiverBankIdError("Id must be atleast 10 characters");
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
    if (e.target.value.length > 7) {
      setReceiverId(e.target.value);
      setRecIdError(false);
    } else {
      setRecIdError("Id must be atleast 8 characters");
    }
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
  const onChangeDate = (e) => {
    e.preventDefault();
    setSelectedDate(e.target.value);
  };
  return (
    <div>
      <div class="card">
        <Form>
          <Form.Field>
            <h3>Sender Details</h3>
            <label class="form-label">Sender Id </label>
            {/* <input name="customerId" onChange={onChangeCustomer} /> */}
            <TextField
              error={idError ? true : false}
              id="outlined-basic"
              label="Sender Id"
              variant="outlined"
              helperText={idError}
              onChange={onChangeCustomer}
            />
          </Form.Field>
        </Form>
      </div>

      {senderBankVisibility && (
        <div class="card">
          <Form>
            <p>Sender name : {sender.senderName}</p>
            <p>Sender balance : {sender.senderBalance}</p>
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
              <MenuItem value={"Customer"}>Customer</MenuItem>
              <MenuItem value={"Bank"}>Bank</MenuItem>
              <MenuItem value={"Self"}>Self</MenuItem>
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
              <MenuItem value={"CHQB"}>CHQB</MenuItem>
              <MenuItem value={"CORT"}>CORT</MenuItem>
              <MenuItem value={"HOLD"}>HOLD</MenuItem>
              <MenuItem value={"INTC"}>INTC</MenuItem>
              <MenuItem value={"PHOB"}>PHOB</MenuItem>
              <MenuItem value={"PHOI"}>PHOI</MenuItem>
              <MenuItem value={"PHON"}>PHON</MenuItem>
              <MenuItem value={"REPA"}>REPA</MenuItem>
              <MenuItem value={"SDVA"}>SDVA</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={currencyCode}
              onChange={onChangeCurrencyCode}
              label="Currency"
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
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
            {/* <label>Currency </label> */}

            {/* <input name="currency" onChange={onChangeTranscation} /> */}
            {/* <TextField
              //  error={idError?true:false}
              id="outlined-basic"
              label="Currency"
              variant="outlined"
              value={currencyCode}
              onChange={onChangeCurrencyCode}
            /> */}
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
                error={receiverBankIdError ? true : false}
                id="outlined-basic"
                label="Receiver bank id"
                variant="outlined"
                helperText={receiverBankIdError}
                onChange={onChangeReceiverBank}
              />
            </Form.Field>
          </Form>
        </div>
      )}

      {receiverVisibility && (
        <div class="card">
          <Form>
            <h3>Receiver bank name : {receiverBankDetails.bankName}</h3>
            <Form.Field>
              <label>Reciver ID </label>
              {/* <input
              name="reciverAccountHolderNumber"
              onChange={onChangeTranscation}
            /> */}
              <TextField
                error={recIdError ? true : false}
                id="outlined-basic"
                label="Receiver account number"
                variant="outlined"
                helperText={recIdError}
                onChange={onChangeReciverId}
              />
            </Form.Field>
            <br></br>
            <Form.Field>
              <label>Receiver Name </label>
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

            <br></br>
            <Button
              variant="contained"
              type="submit"
              onClick={sendDataToAPI}
              style={{ marginBottom: "20px", float: "right" }}
            >
              Transfer <SendIcon />
            </Button>

            <br></br>
          </Form>
        </div>
      )}
    </div>
  );
}
