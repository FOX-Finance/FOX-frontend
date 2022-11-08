/*
 * Declarations
 */
import { ethers } from "ethers";
import { DECIMAL, FOX_CONTRACT_ADDR, FOX_CONTRACT_ABI, FOXFARM_CONTRACT_ADDR, FOXFARM_CONTRACT_ABI, WETH_CONTRACT_ADDR, FOXS_CONTRACT_ADDR, SIN_CONTRACT_ADDR, WETH_CONTRACT_ABI, FOXS_CONTRACT_ABI, SIN_CONTRACT_ABI } from "./contract.js"
import { approveMax_contract, openAndDepositAndBorrow_contract, RepayAndWithdraw_contract, buybackRepayDebt_contract, allowance_contract, requiredShareAmountFromCollateralToLtv_contract, requiredCollateralAmountFromShareToLtv_contract, expectedMintAmountToLtv_contract, defaultValuesMint_contract, expectedRedeemAmountToLtv_contract, balanceOf_contract, exchangedCollateralAmountFromShareToLtv_contract, ltvRangeWhenMint_contract, shareAmountRangeWhenMint_contract, collateralAmountRangeWhenMint_contract,ltvRangeWhenRedeem_contract, ltvRangeWhenBuyback_contract, shareAmountRangeWhenBuyback_contract } from "./contract_request.js"
const binanceTestChainId = '0x61';
const binanceMainChainId = '0x56';
const binanceRPCUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const binanceBlockExploreUrl = 'https://testnet.bscscan.com';
const localhostRPCUrl = 'http://localhost:8545';
const localhostChainId = '0x7A69'; // 31337
const ETHERS_MAX = ethers.constants.MaxUint256;

let account = '';
let contract_fox = '';
let contract_foxfarm = '';
let contract_weth = '';
let contract_foxs = '';
let contract_sin = '';

/* 
 * Initialize functions
 */
async function connectContract() {
    console.log("connect to contract!");
    window.web3 = new Web3(window.ethereum);
    contract_fox = await new window.web3.eth.Contract(FOX_CONTRACT_ABI, FOX_CONTRACT_ADDR);
    contract_foxfarm = await new window.web3.eth.Contract(FOXFARM_CONTRACT_ABI, FOXFARM_CONTRACT_ADDR);
    contract_weth = await new window.web3.eth.Contract(WETH_CONTRACT_ABI, WETH_CONTRACT_ADDR);
    contract_foxs = await new window.web3.eth.Contract(FOXS_CONTRACT_ABI, FOXS_CONTRACT_ADDR);
    contract_sin = await new window.web3.eth.Contract(SIN_CONTRACT_ABI, SIN_CONTRACT_ADDR);
    console.log("connect to contract done.");
}

async function connectMetamask() {
    // metamask installed
    const provider = window.ethereum;
    if (provider) {
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: localhostChainId,
                        chainName: 'Localhost 8545',
                        rpcUrls: [localhostRPCUrl],
                        //blockExplorerUrls: [],
                        nativeCurrency: {
                            symbol: 'LTBNB',
                            decimals: 18
                        }
                    }
                ]
            });

            const chainId = await provider.request({ method: 'eth_chainId' });
            try {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: localhostChainId }],
                });
                console.log("You have succefully switched to Binance Test network")

                // set global variables (contract, account)
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                account = accounts[0];
                return true;
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    console.log("This network is not available in your metamask, please add it");
                }
                console.log("Failed to switch to the network");
            }
        } catch (addError) {
            console.log(addError);
        }
    }
    return false;
}

async function addTokenToMetamask(tokenName) {
    const tokenContract = getContract(tokenName);
    const symbol = await tokenContract.methods.symbol().call();
    const decimals = await tokenContract.methods.decimals().call();
    const tokenImage = getContractImg(tokenName);

    const provider = window.ethereum;
    if (provider) {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await provider.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                      address: tokenContract._address,
                      symbol: symbol,
                      decimals: decimals,
                      image: tokenImage,
                    },
                  },
            });
            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function getAccount() {
    return account;
}

function getContract(contractName) {
    if (contractName === "FOX") return contract_fox;
    else if (contractName === "FOXFARM") return contract_foxfarm;
    else if (contractName === "WETH") return contract_weth;
    else if (contractName === "FOXS") return contract_foxs;
    else if (contractName === "SIN") return contract_sin;
}

function getContractImg(contractName) {
    if (contractName === "WETH") return 'https://github.com/FOX-Finance/FOX-frontend/blob/main/frontend/src/img/bnb-icon.png?raw=true';
    else if (contractName === "FOXS") return 'https://github.com/FOX-Finance/FOX-frontend/blob/main/frontend/src/img/foxs-icon.png?raw=true';
    else if (contractName === "FOX") return 'https://github.com/FOX-Finance/FOX-frontend/blob/main/frontend/src/img/fox-icon.png?raw=true';
}

function getApproveAddress(contractName) {
    if (contractName === "WETH") return FOXFARM_CONTRACT_ADDR;
    else if (contractName === "FOXS") return FOXFARM_CONTRACT_ADDR;
    else if (contractName === "FOX") return FOXFARM_CONTRACT_ADDR;
}

/* 
 * Test Contract functions
 */

async function approveMax(contractName) {
    let _contract = getContract(contractName);
    let _address = getApproveAddress(contractName);
    if (_contract === '' || getAccount() === '') return 0;
    let response = await approveMax_contract(_contract, getAccount(), _address);
    return response;
}

async function openAndDepositAndBorrow(depositAmount, borrowAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await openAndDepositAndBorrow_contract(_contract, getAccount(), depositAmount, borrowAmount);
    return response;
}

async function redeem(cdpID, repayAmount, withdrawAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await RepayAndWithdraw_contract(_contract, getAccount(), cdpID, repayAmount, withdrawAmount);
    return response;
}

async function buyback(cdpID, shareAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await buybackRepayDebt_contract(_contract, getAccount(), cdpID, shareAmount);
    return response;
}

async function getBalance(contractName) {
    let _contract = getContract(contractName);
    if (_contract === '' || getAccount() === '') return 0;
    let response = await balanceOf_contract(_contract, getAccount());
    return ethers.BigNumber.from(response);
}

async function getAllowance(contractName) {
    let _contract = getContract(contractName);
    let _address = getApproveAddress(contractName);
    if (_contract === '' || getAccount() === '') return 0;
    let response = await allowance_contract(_contract, getAccount(), _address);
    return ethers.BigNumber.from(response);
}

async function getShareAmount(cdpID, collateralAmount, ltv) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await requiredShareAmountFromCollateralToLtv_contract(_contract, cdpID, collateralAmount, ltv);
    return ethers.BigNumber.from(response);
}

async function getDebtAmount(cdpID, shareAmount, ltv) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await requiredCollateralAmountFromShareToLtv_contract(_contract, cdpID, shareAmount, ltv);
    return ethers.BigNumber.from(response);
}

async function getMintAmount(cdpID, collateralAmount, ltv, shareAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await expectedMintAmountToLtv_contract(_contract, cdpID, collateralAmount, ltv, shareAmount);
    return ethers.BigNumber.from(response);
}

async function getdefaultValuesMint(cdpID) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await defaultValuesMint_contract(_contract, getAccount(), cdpID);
    return response;
}

async function getRedeemAmount(cdpID, stableAmount, ltv) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await expectedRedeemAmountToLtv_contract(_contract, cdpID, stableAmount, ltv);
    return response;
}

async function getCollateralAmount(cdpID, shareAmount, ltv) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await exchangedCollateralAmountFromShareToLtv_contract(_contract, cdpID, shareAmount, ltv);
    return ethers.BigNumber.from(response);
}

/* range */

async function getLtvRangeWhenMint(cdpID, collateralAmount, shareAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await ltvRangeWhenMint_contract(_contract, cdpID, collateralAmount, shareAmount);
    return response;
}

async function getFoxsRangeWhenMint(cdpID, collateralAmount, ltv) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await shareAmountRangeWhenMint_contract(_contract, getAccount(), cdpID, collateralAmount, ltv);
    return response;
}

async function getWethRangeWhenMint(cdpID, ltv, shareAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await collateralAmountRangeWhenMint_contract(_contract, getAccount(), cdpID, ltv, shareAmount);
    return response;
}

async function getLtvRangeWhenRedeem(cdpID, collectedStableAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await ltvRangeWhenRedeem_contract(_contract, cdpID, collectedStableAmount);
    return response;
}

async function getLtvRangeWhenBuyback(cdpID, shareAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await ltvRangeWhenBuyback_contract(_contract, cdpID, shareAmount);
    return response;
}

async function getShareAmountRangeWhenBuyback(cdpID, shareAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await shareAmountRangeWhenBuyback_contract(_contract, cdpID, shareAmount);
    return response;
}

export { ETHERS_MAX, connectContract, connectMetamask, addTokenToMetamask, getAccount, approveMax, openAndDepositAndBorrow, redeem, buyback, getBalance, getAllowance, getShareAmount, getDebtAmount, getMintAmount, getdefaultValuesMint, getRedeemAmount, getCollateralAmount, getLtvRangeWhenMint, getFoxsRangeWhenMint, getWethRangeWhenMint, getLtvRangeWhenRedeem, getLtvRangeWhenBuyback, getShareAmountRangeWhenBuyback };