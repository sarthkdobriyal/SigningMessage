import { useEffect, useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils' 

function Transfer({ setBalance}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("")
  const [signature , setSignature] = useState(null);
  const [recoverBit, setRecoveryBit] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    console.log("message transfer" , typeof message)
    console.log("signature Transfer" , typeof signature)
    console.log("publicKey transfer" ,typeof (publicKey))

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        message: message,
        signature: signature,
        recoverBit: recoverBit,
        publicKey: publicKey
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.message);
    }
  }

  const generateMessage = () => {
      const msg =  {
        sender: publicKey,
        amount: parseInt(sendAmount),
        recipient,
    }
    setMessage(msg)
    return msg
  }

  const generateSignature = async (e) => {
    console.log("privatekey get:" , privateKey)
    //genrate signature
    if(sendAmount && recipient && publicKey  && privateKey){
      const hashMsg = keccak256(utf8ToBytes(JSON.stringify(generateMessage())));
      console.log("get hashmsg",hashMsg);
      const _signature = await secp.sign(hashMsg, privateKey , {recovered:true})
      console.log("signature get", _signature[0].toString())
      setSignature(_signature[0].toString())
    }
  }
  
  useEffect(() => {
    generateSignature()
  }, [privateKey])

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Public Key || Address (for verification) 
        <input type="text" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} />
      </label>

      <label >
        Private Key <input type="text" name="privateKey" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} />
      </label>
      
        <label >
        Signature <input type="text" value={signature ? signature : ""} disabled />
          
        
      </label>


      <label>
        Recovery Bit <input type="number" name="" id="" value={recoverBit}onChange={(e) => setRecoveryBit(e.target.value)}  />
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
