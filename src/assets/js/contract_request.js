/* Send */

async function approveMax_contract(_contract, _account, _address) {
    console.log("-- [request] approveMax");
    let response = await _contract.connect(_account).approveMax(_address);
    await response.wait();
    console.log("-- [response] approveMax :", response);
    return response;
}

async function openAndDepositAndBorrow_contract(_contract, _account, _depositAmount, _borrowAmount) {
    console.log("_depositAmount", _depositAmount)
    console.log("_borrowAmount", _borrowAmount)
    console.log("-- [request] openAndDepositAndBorrow");
    let response = await _contract.connect(_account).openAndDepositAndBorrow(_depositAmount, _borrowAmount);
    await response.wait();
    console.log("-- [response] openAndDepositAndBorrow :", response);
    return response;
}

async function RepayAndWithdraw_contract(_contract, _account, _id, _repayAmount, _withdrawAmount) {
    console.log("-- [request] RepayAndWithdraw");
    let response = await _contract.connect(_account).repayAndWithdraw(_id, _repayAmount, _withdrawAmount);
    await response.wait();
    console.log("-- [response] RepayAndWithdraw :", response);
    return response;
}

async function buybackRepayDebt_contract(_contract, _account, _id, _shareAmount) {
    console.log("-- [request] buybackRepayDebt");
    let response = await _contract.connect(_account).buybackRepayDebt(_id, _shareAmount);
    await response.wait();
    console.log("-- [response] buybackRepayDebt :", response);
    return response;
}

async function recollateralize_contract(_contract, _account, _id, _collateralAmount, _ltv) {
    console.log("-- [request] recollateralize");
    let response = await _contract.connect(_account).recollateralize(_account.getAddress(), _id, _collateralAmount, _ltv);
    await response.wait();
    console.log("-- [response] recollateralize :", response);
    return response;
}

/* Faucet */

async function faucet_weth(_contract, _account, _amount) {
    console.log("-- [request] WETH faucet");
    let response = await _contract.connect(_account).mint(_account.getAddress(), _amount);
    await response.wait();
    console.log("-- [response] WETH faucet", response);
    return response;
}

async function faucet_foxs(_contract, _account, _amount) {
    console.log("-- [request] FOXS faucet");
    let response = await _contract.connect(_account).mint(_account.getAddress(), _amount);
    await response.wait();
    console.log("-- [response] FOXS faucet", response);
    return response;
}

/* Call */

async function tokenIdsOfOwner(_contract, _address) {
    const len = await _contract.balanceOf(_address);
    let tokenIds = [];
    for (let i = 0; i < len; i++) {
        tokenIds.push(await _contract.tokenOfOwnerByIndex(_address, i));
    }
    return tokenIds;
}

async function allowance_contract(_contract, _account, _address) {
    console.log("-- [request] allowance");
    let response = await _contract.allowance(_account.getAddress(), _address);
    console.log("-- [response] allowance :", response);
    return response;
}

async function requiredShareAmountFromCollateralToLtv_contract(_contract, _id, _collateralAmount, _ltv) {
    console.log("-- [request] requiredShareAmountFromCollateralToLtv");
    console.log("_collateralAmount", _collateralAmount)
    console.log("_ltv", _ltv)
    let response = await _contract.requiredShareAmountFromCollateralToLtv(_id, _collateralAmount, _ltv);
    console.log("-- [response] requiredShareAmountFromCollateralToLtv :", response);
    return response;
}

async function requiredCollateralAmountFromShareToLtv_contract(_contract, _id, _shareAmount, _ltv) {
    console.log("-- [request] requiredCollateralAmountFromShareToLtv");
    let response = await _contract.requiredCollateralAmountFromShareToLtv(_id, _shareAmount, _ltv);
    console.log("-- [response] requiredCollateralAmountFromShareToLtv :", response);
    return response;
}

async function expectedMintAmountToLtv_contract(_contract, _id, _collateralAmount, _ltv, _shareAmount) {
    console.log("-- [request] expectedMintAmountToLtv");
    let response = await _contract.expectedMintAmountToLtv(_id, _collateralAmount, _ltv, _shareAmount);
    console.log("-- [response] expectedMintAmountToLtv :", response);
    return response;
}

/*
async function currentLTV_contract(_contract, _id) {
    console.log("-- [request] currentLTV", _id);
    let response = await _contract.methods.currentLTV(_id).call();
    console.log("-- [response] currentLTV :", response);
    return response;
}
*/

async function defaultValuesMint_contract(_contract, _account, _id) {
    console.log("-- [request] defaultValuesMint", _id);
    let response = await _contract.defaultValuesMint(_account.getAddress(), _id);
    console.log("-- [response] defaultValuesMint :", response);
    return response;
}

async function defaultValueRedeem_contract(_contract, _account, _id) {
    console.log("-- [request] defaultValueRedeem", _id);
    let response = await _contract.defaultValueRedeem(_account.getAddress(), _id);
    console.log("-- [response] defaultValueRedeem :", response);
    return response;
}

async function defaultValuesRecollateralize_contract(_contract, _account, _id) {
    console.log("-- [request] defaultValuesRecollateralize", _id);
    let response = await _contract.defaultValuesRecollateralize(_account.getAddress(), _id);
    console.log("-- [response] defaultValuesRecollateralize :", response);
    return response;
}

async function expectedRedeemAmountToLtv_contract(_contract, _id, _stableAmount, _ltv) {
    console.log("-- [request] expectedRedeemAmountToLtv");
    let response = await _contract.expectedRedeemAmountToLtv(_id, _stableAmount, _ltv);
    console.log("-- [response] expectedRedeemAmountToLtv :", response);
    return response;
}

async function balanceOf_contract(_contract, _account) {
    let response = await _contract.balanceOf(_account.getAddress());
    return response;
}

async function exchangedCollateralAmountFromShareToLtv_contract(_contract, _id, _shareAmount, _ltv) {
    console.log("-- [request] exchangedCollateralAmountFromShareToLtv");
    let response = await _contract.exchangedCollateralAmountFromShareToLtv(_id, _shareAmount, _ltv);
    console.log("-- [response] exchangedCollateralAmountFromShareToLtv :", response);
    return response;
}

async function exchangedShareAmountFromCollateralToLtv_contract(_contract, _id, _collateralAmount, _ltv) {
    console.log("-- [request] exchangedShareAmountFromCollateralToLtv");
    let response = await _contract.exchangedShareAmountFromCollateralToLtv(_id, _collateralAmount, _ltv);
    console.log("-- [response] exchangedShareAmountFromCollateralToLtv :", response);
    return response;
}

async function trustLevel_contract(_contract) {
    let response = await _contract.trustLevel();
    return response;
}

async function maxLTV_contract(_contract) {
    let response = await _contract.maxLTV();
    return response;
}

/* range */

async function ltvRangeWhenMint_contract(_contract, _id, _collateralAmount, _shareAmount) {
    console.log("-- [request] ltvRangeWhenMint");
    let response = await _contract.ltvRangeWhenMint(_id, _collateralAmount, _shareAmount);
    console.log("-- [response] ltvRangeWhenMint :", response);
    return response;
}

async function shareAmountRangeWhenMint_contract(_contract, _account, _id, _collateralAmount, _ltv) {
    console.log("-- [request] shareAmountRangeWhenMint");
    let response = await _contract.shareAmountRangeWhenMint(_account.getAddress(), _id, _collateralAmount, _ltv);
    console.log("-- [response] shareAmountRangeWhenMint :", response);
    return response;
}

async function collateralAmountRangeWhenMint_contract(_contract, _account, _id, _ltv, _shareAmount) {
    console.log("-- [request] collateralAmountRangeWhenMint");
    let response = await _contract.collateralAmountRangeWhenMint(_account.getAddress(), _id, _ltv, _shareAmount);
    console.log("-- [response] collateralAmountRangeWhenMint :", response);
    return response;
}

async function ltvRangeWhenRedeem_contract(_contract, _id, stableAmount_) {
    console.log("-- [request] ltvRangeWhenRedeem");
    let response = await _contract.ltvRangeWhenRedeem(_id, stableAmount_);
    console.log("-- [response] ltvRangeWhenRedeem :", response);
    return response;
}

async function stableAmountRangeWhenRedeem_contract(_contract, _account, _id) {
    console.log("-- [request] stableAmountRangeWhenRedeem");
    let response = await _contract.stableAmountRangeWhenRedeem(_account.getAddress(), _id);
    console.log("-- [response] stableAmountRangeWhenRedeem :", response);
    return response;
}

async function ltvRangeWhenBuyback_contract(_contract, _id, _shareAmount) {
    console.log("-- [request] ltvRangeWhenBuyback");
    let response = await _contract.ltvRangeWhenBuyback(_id, _shareAmount);
    console.log("-- [response] ltvRangeWhenBuyback :", response);
    return response;
}

async function shareAmountRangeWhenBuyback_contract(_contract, _id, _shareAmount) {
    console.log("-- [request] shareAmountRangeWhenBuyback");
    let response = await _contract.shareAmountRangeWhenBuyback(_id, _shareAmount);
    console.log("-- [response] shareAmountRangeWhenBuyback :", response);
    return response;
}

async function ltvRangeWhenRecollateralize_contract(_contract, _id, _collateralAmount) {
    console.log("-- [request] ltvRangeWhenRecollateralize");
    let response = await _contract.ltvRangeWhenRecollateralize(_id, _collateralAmount);
    console.log("-- [response] ltvRangeWhenRecollateralize :", response);
    return response;
}

async function collateralAmountRangeWhenRecollateralize_contract(_contract, _account, _id, _ltv) {
    console.log("-- [request] collateralAmountRangeWhenRecollateralize");
    let response = await _contract.collateralAmountRangeWhenRecollateralize(_account.getAddress(), _id, _ltv);
    console.log("-- [response] collateralAmountRangeWhenRecollateralize :", response);
    return response;
}

export {
    approveMax_contract, openAndDepositAndBorrow_contract, RepayAndWithdraw_contract, buybackRepayDebt_contract, recollateralize_contract, allowance_contract, requiredShareAmountFromCollateralToLtv_contract, requiredCollateralAmountFromShareToLtv_contract, expectedMintAmountToLtv_contract, defaultValuesMint_contract, defaultValueRedeem_contract, defaultValuesRecollateralize_contract, expectedRedeemAmountToLtv_contract, balanceOf_contract, exchangedCollateralAmountFromShareToLtv_contract, exchangedShareAmountFromCollateralToLtv_contract, trustLevel_contract, maxLTV_contract, ltvRangeWhenMint_contract, shareAmountRangeWhenMint_contract, collateralAmountRangeWhenMint_contract, ltvRangeWhenRedeem_contract, stableAmountRangeWhenRedeem_contract, ltvRangeWhenBuyback_contract, shareAmountRangeWhenBuyback_contract, ltvRangeWhenRecollateralize_contract, collateralAmountRangeWhenRecollateralize_contract,
    faucet_weth, faucet_foxs,
    tokenIdsOfOwner
};
