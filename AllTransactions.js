import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AllTransactions() {
  const [transactions, setTransactions] = useState();
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/dbsapi/alltransaction/" + params.cid)
      .then((res) => {
        setTransactions(res.data);
        //setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h3>List of transactions</h3>
      {/* {<p>{JSON.stringify(transactions)}</p>} */}
      <table border="2px;">
        <tr>
          <th>CustomerId</th>
          <th>CustomerName</th>
          <th>Sender BIC</th>
          <th>Sender BAnk Name</th>
          <th>Receiver BIC</th>
          <th>Receiver Bank Name</th>
          <th>Receiver Acc Number</th>
          <th>Receiver Name</th>
          <th>Currency Code</th>
          <th>Amount</th>
          <th>Transfer Fees</th>
          <th>Total amount</th>
          <th>Message instruction</th>
        </tr>
        {transactions &&
          transactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.customer.customerId}</td>
              <td>{t.customer.customerName}</td>
              <td>{t.senderBank.bic}</td>
              <td>{t.senderBank.bankName}</td>
              <td>{t.receiverBank.bic}</td>
              <td>{t.receiverBank.bankName}</td>
              <td>{t.reciverAccountHolderNumber}</td>
              <td>{t.receiverAccountHolderName}</td>
              <td>{t.currency.currencyCode}</td>
              <td>{t.amount}</td>
              <td>{t.transferFees}</td>
              <td>{t.totalAmount}</td>
              <td>{t.message.instruction}</td>
            </tr>
          ))}
      </table>
    </>
  );
}
export default AllTransactions;
