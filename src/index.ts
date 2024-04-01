import * as EthTokens from "./Core/Consts/EthTokens";
import * as TrxTokens from "./Core/Consts/TrxTokens";
import * as BscTokens from "./Core/Consts/BscTokens";

import EthContract from "./Core/Blockchain/Eth/EthContract";
import EthWallet from "./Core/Blockchain/Eth/EthWallet";

import TrxContract from "./Core/Blockchain/Trx/TrxContract";
import TrxWallet from "./Core/Blockchain/Trx/TrxWallet";

import Wallet from "./Core/Wallet";

import WalletInterface from "./Core/Interfaces/WalletInterface";
import Contract20Interface from "./Core/Interfaces/Contract20Interface";

export {Wallet, TrxWallet, EthWallet, TrxContract, EthContract, EthTokens, TrxTokens, BscTokens, WalletInterface, Contract20Interface}