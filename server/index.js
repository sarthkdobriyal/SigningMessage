const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 }  = require("ethereum-cryptography/keccak")
const { utf8ToBytes } = require("ethereum-cryptography/utils")
const { toHex } = require("ethereum-cryptography/utils")

app.use(cors());
app.use(express.json());




const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
  "04385c3a6ec0b9d57a4330dbd6284989be5bd00e41c535f9ca39b6ae7c521b81cd2443fef29e7f34aa8c8002eceaff422cd1f622bb4830714110e736044d8f084f": 110,
  "040c524ea502ecaf3d69a65380fa2a709874ab4dc1831af6d2ea02dd5033c5f22655713a178cbd04e3f910fde49ecbcc05d8c6cb38226749e34e7e406e5e9089e5":120,
  "048b4b2d22492865c590455e11a48fc1f07ee860348d8cf9cb4ea537819e6c1305770eef37f135ac08fe51426aa7653d5725d59df9e6b5e6eb3ec9305ef7f08e8a": 150,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


const verify =  (message, signature, publicKey, recoverBit) => {
  const hashmsg = keccak256(utf8ToBytes(JSON.stringify(message)))
     
  const isValid =  secp.verify( Uint8Array.from(signature.split(',')),hashmsg,Uint8Array.from(publicKey))
  // console.log(signature)
  // console.log(publicKey)
  // console.log("isValid", isValid)
  // const recoverPublicKey = secp.recoverPublicKey(hashmsg, signature, recoverBit);
  if(isValid) return true;
  else return false;
}

app.post("/send", (req, res) => {
  const { message , signature , recoverBit, publicKey } = req.body;
  console.log( message)
  console.log(typeof signature)
  console.log( publicKey)

  setInitialBalance(message.sender);
  setInitialBalance(message.recipient);

  if(verify(message , signature , recoverBit, publicKey)) {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }else{
    console.log("could not verify")
    res.status(404).send({
      message: "Could not verify",
    })
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
