import { FOX_CONTRACT_ADDR, FOX_CONTRACT_ABI, FOXFARM_CONTRACT_ADDR, FOXFARM_CONTRACT_ABI, WETH_CONTRACT_ADDR, FOXS_CONTRACT_ADDR, SIN_CONTRACT_ADDR, GATEWAY_CONTRACT_ADDR, WETH_CONTRACT_ABI, FOXS_CONTRACT_ABI, SIN_CONTRACT_ABI, GATEWAY_CONTRACT_ABI } from "./contract.js"
import { approveMax_contract, openAndDepositAndBorrow_contract, RepayAndWithdraw_contract, buybackRepayDebt_contract, recollateralize_contract, allowance_contract, requiredShareAmountFromCollateralToLtv_contract, requiredCollateralAmountFromShareToLtv_contract, expectedMintAmountToLtv_contract, defaultValuesMint_contract, defaultValueRedeem_contract, defaultValuesRecollateralize_contract, expectedRedeemAmountToLtv_contract, balanceOf_contract, exchangedCollateralAmountFromShareToLtv_contract, exchangedShareAmountFromCollateralToLtv_contract, trustLevel_contract, maxLTV_contract, ltvRangeWhenMint_contract, shareAmountRangeWhenMint_contract, collateralAmountRangeWhenMint_contract, ltvRangeWhenRedeem_contract, stableAmountRangeWhenRedeem_contract, ltvRangeWhenBuyback_contract, shareAmountRangeWhenBuyback_contract, ltvRangeWhenRecollateralize_contract, collateralAmountRangeWhenRecollateralize_contract, faucet_weth, faucet_foxs, tokenIdsOfOwner } from "./contract_request.js"

import { ethers } from "ethers";
let provider = new ethers.providers.Web3Provider(window.ethereum);

// TODO
// localhost
const targetChainId = '0x539';
const rpcUrl = "http://localhost:8545";
const chainName = "localhost";
const nativeCurrency = { name: "LocalCoin", decimals: 18, symbol: "LCC" };
// // FIL-test
// const targetChainId = '0x4CB2F';
// const rpcUrl = "https://api.calibration.node.glif.io/rpc/v1";
// const chainName = "Cailbration";
// const nativeCurrency = { name: "Filecoin", decimals: 18, symbol: "FIL" };

const ETHERS_MAX = ethers.constants.MaxUint256;

let account = '';
let address = '';

let contract_fox = '';
let contract_foxfarm = '';
let contract_weth = '';
let contract_foxs = '';
let contract_sin = '';
let contract_gateway = '';

/* 
 * Initialize functions
 */
async function connectContract() {
    console.log("connect to contract!");
    contract_fox = new ethers.Contract(FOX_CONTRACT_ADDR, FOX_CONTRACT_ABI, provider);
    contract_foxfarm = new ethers.Contract(FOXFARM_CONTRACT_ADDR, FOXFARM_CONTRACT_ABI, provider);
    contract_weth = new ethers.Contract(WETH_CONTRACT_ADDR, WETH_CONTRACT_ABI, provider);
    contract_foxs = new ethers.Contract(FOXS_CONTRACT_ADDR, FOXS_CONTRACT_ABI, provider);
    contract_sin = new ethers.Contract(SIN_CONTRACT_ADDR, SIN_CONTRACT_ABI, provider);
    contract_gateway = new ethers.Contract(GATEWAY_CONTRACT_ADDR, GATEWAY_CONTRACT_ABI, provider);
    console.log("connect to contract done.");
}

async function connectMetamask() {
    if (provider) {
        const { chainId } = await provider.getNetwork()

        if (chainId != targetChainId) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: targetChainId }]
                });

            } catch (e) {
                if (e.code === 4902) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: targetChainId,
                            chainName: chainName,
                            rpcUrls: [rpcUrl],
                            nativeCurrency: nativeCurrency,
                        }],
                    });
                } else {
                    console.error("Fail to switch network");
                }
            } finally {
                provider = new ethers.providers.Web3Provider(window.ethereum);
            }
        }

        account = provider.getSigner();
        address = await provider.getSigner().getAddress();
        await connectContract();

        return true;
    } else {
        alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    }
    return false;
}

async function addTokenToMetamask(tokenName) {
    const tokenContract = getContract(tokenName);
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();
    const tokenImage = getContractImg(tokenName);

    const options = {
        address: tokenContract.address,
        symbol: symbol,
        decimals: decimals,
        image: tokenImage,
    }
    console.log(options);

    if (provider) {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: options,
                },
            });
            if (wasAdded) {
                console.log('Token successfully added to wallet!');
            } else {
                throw new Error('Something went wrong.');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function getAccount() {
    return address;
}

function getContract(contractName) {
    if (contractName === "FOX") return contract_fox;
    else if (contractName === "FOXFARM") return contract_foxfarm;
    else if (contractName === "WETH") return contract_weth;
    else if (contractName === "FOXS") return contract_foxs;
    else if (contractName === "SIN") return contract_sin;
    else if (contractName === "GATEWAY") return contract_gateway;
}

// TODO: BNB -> ETH
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
    let response = await approveMax_contract(_contract, account, _address);
    return response;
}

async function openAndDepositAndBorrow(depositAmount, borrowAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await openAndDepositAndBorrow_contract(_contract, account, depositAmount, borrowAmount);
    return response;
}

async function redeem(cdpID, repayAmount, withdrawAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await RepayAndWithdraw_contract(_contract, account, cdpID, repayAmount, withdrawAmount);
    return response;
}

async function buyback(cdpID, shareAmount) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await buybackRepayDebt_contract(_contract, account, cdpID, shareAmount);
    return response;
}

async function recollateralize(cdpID, collateralAmount, ltv) {
    let _contract = getContract("FOXFARM");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await recollateralize_contract(_contract, account, cdpID, collateralAmount, ltv);
    return response;
}

/* faucet */

async function getFaucetWeth() {
    let _contract = getContract("WETH");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await faucet_weth(_contract, account, ethers.BigNumber.from(10).pow(18).mul(100));
    return response;
}

async function getFaucetFoxs() {
    let _contract = getContract("FOXS");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await faucet_foxs(_contract, account, ethers.BigNumber.from(10).pow(18).mul(100));
    return response;
}

/* view functions */

async function getTokenIdsOfOwner(contractName) {
    let _contract = getContract(contractName);
    if (_contract === '' || getAccount() === '') return 0;
    let response = await tokenIdsOfOwner(_contract, address);
    return response;
}

async function getBalance(contractName) {
    let _contract = getContract(contractName);
    if (_contract === '' || getAccount() === '') return 0;
    let response = await balanceOf_contract(_contract, account);
    return ethers.BigNumber.from(response);
}

async function getAllowance(contractName) {
    let _contract = getContract(contractName);
    let _address = getApproveAddress(contractName);
    if (_contract === '' || getAccount() === '') return 0;
    let response = await allowance_contract(_contract, account, _address);
    return ethers.BigNumber.from(response);
}

async function getShareAmount(cdpID, collateralAmount, ltv) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await requiredShareAmountFromCollateralToLtv_contract(_contract, cdpID, collateralAmount, ltv);
    return ethers.BigNumber.from(response);
}

async function getDebtAmount(cdpID, shareAmount, ltv) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await requiredCollateralAmountFromShareToLtv_contract(_contract, cdpID, shareAmount, ltv);
    return ethers.BigNumber.from(response);
}

async function getMintAmount(cdpID, collateralAmount, ltv, shareAmount) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await expectedMintAmountToLtv_contract(_contract, cdpID, collateralAmount, ltv, shareAmount);
    return ethers.BigNumber.from(response);
}

async function getdefaultValuesMint(cdpID) {
    let _contract = getContract("GATEWAY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await defaultValuesMint_contract(_contract, account, cdpID);
    return response;
}

async function getdefaultValuesRedeem(cdpID) {
    let _contract = getContract("GATEWAY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await defaultValueRedeem_contract(_contract, account, cdpID);
    return response;
}

async function getdefaultValuesRecollateralize(cdpID) {
    let _contract = getContract("GATEWAY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await defaultValuesRecollateralize_contract(_contract, account, cdpID);
    return response;
}

async function getRedeemAmount(cdpID, stableAmount, ltv) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await expectedRedeemAmountToLtv_contract(_contract, cdpID, stableAmount, ltv);
    return response;
}

async function getCollateralAmount(cdpID, shareAmount, ltv) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await exchangedCollateralAmountFromShareToLtv_contract(_contract, cdpID, shareAmount, ltv);
    return ethers.BigNumber.from(response);
}

async function getShareAmountInRecollateralize(cdpID, collateralAmount, ltv) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await exchangedShareAmountFromCollateralToLtv_contract(_contract, cdpID, collateralAmount, ltv);
    return ethers.BigNumber.from(response);
}

async function getTrustLevel() {
    let _contract = getContract("FOX");
    if (_contract === '') return 0;
    let response = await trustLevel_contract(_contract);
    return response;
}

async function getMaxLTV() {
    let _contract = getContract("FOXFARM");
    if (_contract === '') return 0;
    let response = await maxLTV_contract(_contract);
    return response;
}

/* range */

async function getLtvRangeWhenMint(cdpID, collateralAmount, shareAmount) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await ltvRangeWhenMint_contract(_contract, cdpID, collateralAmount, shareAmount);
    return response;
}

async function getFoxsRangeWhenMint(cdpID, collateralAmount, ltv) {
    let _contract = getContract("GATEWAY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await shareAmountRangeWhenMint_contract(_contract, account, cdpID, collateralAmount, ltv);
    return response;
}

async function getWethRangeWhenMint(cdpID, ltv, shareAmount) {
    let _contract = getContract("GATEWAY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await collateralAmountRangeWhenMint_contract(_contract, account, cdpID, ltv, shareAmount);
    return response;
}

async function getLtvRangeWhenRedeem(cdpID, stableAmount) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await ltvRangeWhenRedeem_contract(_contract, cdpID, stableAmount);
    return response;
}

async function getFoxRangeWhenRedeem(cdpID) {
    let _contract = getContract("GATEWAY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await stableAmountRangeWhenRedeem_contract(_contract, account, cdpID);
    return response;
}

async function getLtvRangeWhenBuyback(cdpID, shareAmount) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await ltvRangeWhenBuyback_contract(_contract, cdpID, shareAmount);
    return response;
}

async function getShareAmountRangeWhenBuyback(cdpID, shareAmount) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await shareAmountRangeWhenBuyback_contract(_contract, cdpID, shareAmount);
    return response;
}

async function getLtvRangeWhenRecollateralize(cdpID, collateralAmount) {
    let _contract = getContract("GATEWAY");
    if (_contract === '') return 0;
    let response = await ltvRangeWhenRecollateralize_contract(_contract, cdpID, collateralAmount);
    return response;
}

async function getWethRangeWhenRecollateralize(cdpID, ltv) {
    let _contract = getContract("GATEWAY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await collateralAmountRangeWhenRecollateralize_contract(_contract, account, cdpID, ltv);
    return response;
}

export { ETHERS_MAX, connectContract, connectMetamask, addTokenToMetamask, getAccount, approveMax, openAndDepositAndBorrow, redeem, buyback, recollateralize, getBalance, getAllowance, getShareAmount, getDebtAmount, getMintAmount, getdefaultValuesMint, getdefaultValuesRedeem, getdefaultValuesRecollateralize, getRedeemAmount, getCollateralAmount, getShareAmountInRecollateralize, getTrustLevel, getMaxLTV, getLtvRangeWhenMint, getFoxsRangeWhenMint, getWethRangeWhenMint, getLtvRangeWhenRedeem, getFoxRangeWhenRedeem, getLtvRangeWhenBuyback, getShareAmountRangeWhenBuyback, getLtvRangeWhenRecollateralize, getWethRangeWhenRecollateralize, getFaucetWeth, getFaucetFoxs, getTokenIdsOfOwner };