//import logo from './logo.svg';
//import './App.css';
//import {SenderDetails} from "./SenderDetails"
import { Routes, Route } from "react-router-dom";
import AllTransactions from "./Components/AllTransactions";

//import ReceiverDetails from "./ReceiverDetails"

import Transaction from "./Components/Transaction";

import ShowTransaction from "./Components/ShowTransaction";
import ErrorMessage from "./Components/ErrorMessage";

function App() {
  return (
    <div className="App">
      {/* <Routes> 
         <Route path="/" element={<SenderForm/>}></Route>
         <Route path="/sreceiver" element={<ReceiverDetails/>}></Route>
         <Route path="/transaction" element={<TransactionDetails/>}></Route>

       </Routes> */}
      {/* <Transaction/>
        <Routes>
          <Route path="/final" element={<ShowTransaction/>}/>
        </Routes> */}
      <Routes>
        <Route path="/" element={<Transaction />} />
        <Route path="/transactionResponse/:id" element={<ShowTransaction />} />
        <Route path="/errorMessage/:eid" element={<ErrorMessage />} />
        <Route path="/allTransactions/:cid" element={<AllTransactions />} />
      </Routes>
    </div>
  );
}

export default App;
