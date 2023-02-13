const Web3 = require("web3");
const jsonInterface = require("../config/FavorTube.json");
const tokenJsonInterface = require("../config/FavorToken.json");
const rpcURL = process.env.ENDPOINT;
const address = process.env.CONTRACT
const tokenAddress = process.env.TOKEN_CONTRACT

const web3 = new Web3(rpcURL);
const contract = new web3.eth.Contract(jsonInterface.abi, address);
const tokenContract = new web3.eth.Contract(tokenJsonInterface.abi, tokenAddress);

module.exports = {
    address,
    tokenAddress,
    eth: web3.eth,
    web3,
    contract,
    tokenContract
}
