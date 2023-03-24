const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")


const privateKey = toHex(secp.utils.randomPrivateKey());
console.log("private key: " + privateKey)




const publicKey = toHex(secp.getPublicKey(privateKey))
console.log("\npublic key: " + publicKey)


// 1. 
//6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e
//04385c3a6ec0b9d57a4330dbd6284989be5bd00e41c535f9ca39b6ae7c521b81cd2443fef29e7f34aa8c8002eceaff422cd1f622bb4830714110e736044d8f084f

// 2.
// 162436be5115d713adce526d13e395be7ff3ba83e75fe898717cfe73a00b3d82
// 040c524ea502ecaf3d69a65380fa2a709874ab4dc1831af6d2ea02dd5033c5f22655713a178cbd04e3f910fde49ecbcc05d8c6cb38226749e34e7e406e5e9089e5

// 3.
// 3690251d6d700b6780290241ea00e85db4634f78752a5e48b986d34b32f47d3e
//048b4b2d22492865c590455e11a48fc1f07ee860348d8cf9cb4ea537819e6c1305770eef37f135ac08fe51426aa7653d5725d59df9e6b5e6eb3ec9305ef7f08e8a