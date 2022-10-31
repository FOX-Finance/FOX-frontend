/*
 * Declarations
 */
import { FOX_CONTRACT_ADDR, FOX_CONTRACT_ABI, FOXFARM_CONTRACT_ADDR, FOXFARM_CONTRACT_ABI, WETH_CONTRACT_ADDR, FOXS_CONTRACT_ADDR, SIN_CONTRACT_ADDR, WETH_CONTRACT_ABI, FOXS_CONTRACT_ABI, SIN_CONTRACT_ABI } from "./contract.js"
import { approveMax_contract, openAndDepositAndBorrow_contract, allowance_contract, requiredShareAmountFromDebt_contract, requiredDebtAmountFromShare_contract  } from "./contract_request.js"
const binanceTestChainId = '0x61';
const binanceMainChainId = '0x56';

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
                        chainId: binanceTestChainId,
                        chainName: 'Smart Chain - Testnet',
                        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'], blockExplorerUrls: ['https://testnet.bscscan.com'],
                        nativeCurrency: {
                            symbol: 'BNB',
                            decimals: 18
                        }
                    }
                ]
            });

            const chainId = await provider.request({ method: 'eth_chainId' });
            try {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: binanceTestChainId }],
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

function getApproveAddress(contractName) {
    if (contractName === "WETH") return FOXFARM_CONTRACT_ADDR;
    else if (contractName === "FOXS") return FOX_CONTRACT_ADDR;
    else if (contractName === "SIN") return FOX_CONTRACT_ADDR;
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

async function getAllowance(contractName) {
    let _contract = getContract(contractName);
    let _address = getApproveAddress(contractName);
    if (_contract === '' || getAccount() === '') return 0;
    let response = await allowance_contract(_contract, getAccount(), _address);
    return response;
}

async function getShareAmount(debtAmount) {
    let _contract = getContract("FOX");
    if (_contract === '') return 0;
    let response = await requiredShareAmountFromDebt_contract(_contract, debtAmount);
    return response;
}

async function getDebtAmount(shareAmount) {
    let _contract = getContract("FOX");
    if (_contract === '') return 0;
    let response = await requiredDebtAmountFromShare_contract(_contract, shareAmount);
    return response;
}

export { connectContract, connectMetamask, getAccount, approveMax, openAndDepositAndBorrow, getAllowance, getShareAmount, getDebtAmount };