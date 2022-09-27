import CheckCircleRounded from "@mui/icons-material/CheckCircle";

import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router";
import Button from "@mui/material/Button";

export default function ShowTransaction() {
  const [id, setId] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const params = useParams();
  const [flag, setFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/dbsapi/transaction/" + params.id)
      .then((res) => {
        setTransaction(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response) {
        //     console.log(err.response.data.message);
        //    }
        setErrorFlag(true);
      });
  }, []);
  // console.log(transaction)
  function goToTransaction() {
    navigation("/");
  }
  function goToAllTransaction() {
    navigation("/allTransactions/" + transaction.customer.customerId);
  }

  return (
    <>
      {flag && (
        <div className="final-card">
          <CheckCircleRounded
            fontSize="inherit"
            style={{ fontSize: "90px", color: "green", paddingLeft: "195px" }}
          />
          <h3>Transaction Successful!</h3>
          {/* <h4>{JSON.stringify(transaction)}</h4> */}

          {/* <p>{console.log(transaction)}</p> */}
          <p>Sender Id : {transaction.customer.customerId}</p>
          <p>Clear Balance : {Math.round(transaction.customer.clearBalance)}</p>
          <p>Currency code : {transaction.currency.currencyCode}</p>
          <p>Sender Bank BIC : {transaction.senderBank.bic}</p>
          <p>Receiver Bank BIC : {transaction.receiverBank.bic}</p>
          <p>Transfer Type : {transaction.transferType.transferTypeCode}</p>
          <p>Message code : {transaction.message.messageCode}</p>
          <p>Amount : {transaction.amount}/-</p>
          <p>Transfer Fee : {transaction.transferFees}</p>
          <p>Total Amount : {transaction.totalAmount}</p>
          {/* <p>Transfer Date : {transaction.transferDate}</p> */}
          <br></br>

          <Button variant="contained" type="submit" onClick={goToTransaction}>
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            style={{ float: "right" }}
            onClick={goToAllTransaction}
          >
            All Transactions
          </Button>
        </div>
      )}
    </>
  );

  // return(
  //     <>
  //         <div className="final-card">
  //         <CancelIcon
  //             fontSize="inherit"
  //             style={{ fontSize: "90px", color:"red" }}
  //         />

  //             <p>Transaction Unsuccessful</p>
  //         </div>
  //     </>
  // )
}
