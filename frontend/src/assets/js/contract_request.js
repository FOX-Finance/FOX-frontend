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

/* Call */
async function allowance_contract(_contract, _account, _address) {
    console.log("-- [request] allowance");
    let response = await _contract.methods.allowance(_account, _address).call();
    console.log("-- [response] allowance :", response);
    return response;
}

async function requiredShareAmountFromCollateralWithLtv_contract(_contract, _id, _collateralAmount, _ltv) {
    console.log("-- [request] requiredShareAmountFromCollateralWithLtv");
    console.log("_collateralAmount", _collateralAmount)
    console.log("_ltv", _ltv)
    let response = await _contract.methods.requiredShareAmountFromCollateralWithLtv(_id, _collateralAmount, _ltv).call();
    console.log("-- [response] requiredShareAmountFromCollateralWithLtv :", response);
    return response;
}

async function requiredCollateralAmountFromShareWithLtv_contract(_contract, _id, _shareAmount, _ltv) {
    console.log("-- [request] requiredCollateralAmountFromShareWithLtv");
    let response = await _contract.methods.requiredCollateralAmountFromShareWithLtv(_id, _shareAmount, _ltv).call();
    console.log("-- [response] requiredCollateralAmountFromShareWithLtv :", response);
    return response;
}

async function expectedMintAmountWithLtv_contract(_contract, _id, _collateralAmount, _ltv, _shareAmount) {
    console.log("-- [request] expectedMintAmountWithLtv");
    let response = await _contract.methods.expectedMintAmountWithLtv(_id, _collateralAmount, _ltv, _shareAmount).call();
    console.log("-- [response] expectedMintAmountWithLtv :", response);
    return response;
}

async function currentLTV_contract(_contract, _id) {
    console.log("-- [request] currentLTV", _id);
    let response = await _contract.methods.currentLTV(_id).call();
    console.log("-- [response] currentLTV :", response);
    return response;
}

async function expectedRedeemAmountWithLtv_contract(_contract, _stableAmount, _ltv) {
    console.log("-- [request] expectedRedeemAmountWithLtv");
    let response = await _contract.methods.expectedRedeemAmountWithLtv(_stableAmount, _ltv).call();
    console.log("-- [response] expectedRedeemAmountWithLtv :", response);
    return response;
}

async function withdrawAmountToLTV_contract(_contract, _id, _multipliedLtv) {
    console.log("-- [request] withdrawAmountToLTV", _id);
    console.log("_id", _id)
    console.log("_multipliedLtv", _multipliedLtv)
    let response = await _contract.methods.withdrawAmountToLTV(_id, _multipliedLtv).call();
    console.log("-- [response] withdrawAmountToLTV :", response);
    return response;
}

async function balanceOf_contract(_contract, _account) {
    let response = await _contract.methods.balanceOf(_account).call();
    return response;
}

export { approveMax_contract, openAndDepositAndBorrow_contract, RepayAndWithdraw_contract, allowance_contract, requiredShareAmountFromCollateralWithLtv_contract, requiredCollateralAmountFromShareWithLtv_contract, expectedMintAmountWithLtv_contract, currentLTV_contract, expectedRedeemAmountWithLtv_contract, withdrawAmountToLTV_contract, balanceOf_contract };