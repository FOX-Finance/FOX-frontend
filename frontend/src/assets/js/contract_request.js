/* Send */
async function approveMax_contract(_contract, _account, _address) {
    console.log("-- [request] approveMax");
    let response = await _contract.methods.approveMax(_address).send({ from: _account });
    console.log("-- [response] approveMax :", response);
    return response;
}

async function openAndDepositAndBorrow_contract(_contract, _account, _depositAmount, _borrowAmount) {
    console.log("_depositAmount", _depositAmount)
    console.log("_borrowAmount", _borrowAmount)
    console.log("-- [request] openAndDepositAndBorrow");
    let response = await _contract.methods.openAndDepositAndBorrow(_depositAmount, _borrowAmount).send({ from: _account });
    console.log("-- [response] openAndDepositAndBorrow :", response);
    return response;
}

async function RepayAndWithdraw_contract(_contract, _account, _id, _repayAmount, _withdrawAmount) {
    console.log("-- [request] RepayAndWithdraw");
    let response = await _contract.methods.repayAndWithdraw(_id, _repayAmount, _withdrawAmount).send({ from: _account });
    console.log("-- [response] RepayAndWithdraw :", response);
    return response;
}

async function buybackRepayDebt_contract(_contract, _account, _id, _shareAmount) {
    console.log("-- [request] buybackRepayDebt");
    let response = await _contract.methods.buybackRepayDebt(_id, _shareAmount).send({ from: _account });
    console.log("-- [response] buybackRepayDebt :", response);
    return response;
}

/* Call */
async function allowance_contract(_contract, _account, _address) {
    console.log("-- [request] allowance");
    let response = await _contract.methods.allowance(_account, _address).call();
    console.log("-- [response] allowance :", response);
    return response;
}

async function requiredShareAmountFromCollateralToLtv_contract(_contract, _id, _collateralAmount, _ltv) {
    console.log("-- [request] requiredShareAmountFromCollateralToLtv");
    console.log("_collateralAmount", _collateralAmount)
    console.log("_ltv", _ltv)
    let response = await _contract.methods.requiredShareAmountFromCollateralToLtv(_id, _collateralAmount, _ltv).call();
    console.log("-- [response] requiredShareAmountFromCollateralToLtv :", response);
    return response;
}

async function requiredCollateralAmountFromShareToLtv_contract(_contract, _id, _shareAmount, _ltv) {
    console.log("-- [request] requiredCollateralAmountFromShareToLtv");
    let response = await _contract.methods.requiredCollateralAmountFromShareToLtv(_id, _shareAmount, _ltv).call();
    console.log("-- [response] requiredCollateralAmountFromShareToLtv :", response);
    return response;
}

async function expectedMintAmountToLtv_contract(_contract, _id, _collateralAmount, _ltv, _shareAmount) {
    console.log("-- [request] expectedMintAmountToLtv");
    let response = await _contract.methods.expectedMintAmountToLtv(_id, _collateralAmount, _ltv, _shareAmount).call();
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
    let response = await _contract.methods.defaultValuesMint(_account, _id).call();
    console.log("-- [response] defaultValuesMint :", response);
    return response;
}

async function expectedRedeemAmountToLtv_contract(_contract, _id, _stableAmount, _ltv) {
    console.log("-- [request] expectedRedeemAmountToLtv");
    let response = await _contract.methods.expectedRedeemAmountToLtv(_id, _stableAmount, _ltv).call();
    console.log("-- [response] expectedRedeemAmountToLtv :", response);
    return response;
}

async function balanceOf_contract(_contract, _account) {
    let response = await _contract.methods.balanceOf(_account).call();
    return response;
}

async function exchangedCollateralAmountFromShareToLtv_contract(_contract, _id, _shareAmount, _ltv) {
    console.log("-- [request] exchangedCollateralAmountFromShareToLtv");
    let response = await _contract.methods.exchangedCollateralAmountFromShareToLtv(_id, _shareAmount, _ltv).call();
    console.log("-- [response] exchangedCollateralAmountFromShareToLtv :", response);
    return response;
}

/* range */

async function ltvRangeWhenMint_contract(_contract, _id, _collateralAmount) {
    console.log("-- [request] ltvRangeWhenMint");
    let response = await _contract.methods.ltvRangeWhenMint(_id, _collateralAmount).call();
    console.log("-- [response] ltvRangeWhenMint :", response);
    return response;
}

async function ltvRangeWhenRedeem_contract(_contract, _id, _collectedStableAmount) {
    console.log("-- [request] ltvRangeWhenRedeem");
    let response = await _contract.methods.ltvRangeWhenRedeem(_id, _collectedStableAmount).call();
    console.log("-- [response] ltvRangeWhenRedeem :", response);
    return response;
}

async function ltvRangeWhenBuyback_contract(_contract, _id, _shareAmount) {
    console.log("-- [request] ltvRangeWhenBuyback");
    let response = await _contract.methods.ltvRangeWhenBuyback(_id, _shareAmount).call();
    console.log("-- [response] ltvRangeWhenBuyback :", response);
    return response;
}

async function shareAmountRangeWhenBuyback_contract(_contract, _id, _shareAmount) {
    console.log("-- [request] shareAmountRangeWhenBuyback");
    let response = await _contract.methods.shareAmountRangeWhenBuyback(_id, _shareAmount).call();
    console.log("-- [response] shareAmountRangeWhenBuyback :", response);
    return response;
}

export { approveMax_contract, openAndDepositAndBorrow_contract, RepayAndWithdraw_contract, buybackRepayDebt_contract, allowance_contract, requiredShareAmountFromCollateralToLtv_contract, requiredCollateralAmountFromShareToLtv_contract, expectedMintAmountToLtv_contract, defaultValuesMint_contract, expectedRedeemAmountToLtv_contract, balanceOf_contract, exchangedCollateralAmountFromShareToLtv_contract, ltvRangeWhenMint_contract, ltvRangeWhenRedeem_contract, ltvRangeWhenBuyback_contract, shareAmountRangeWhenBuyback_contract };