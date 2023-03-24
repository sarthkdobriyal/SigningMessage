import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
// import Sign from "./Sign";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      {/* <Sign 
        address={address}
        signature={signature}
        setSignature={setSignature}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />  */}
      <Transfer setBalance={setBalance}
      />
    </div>
  );
}

export default App;
