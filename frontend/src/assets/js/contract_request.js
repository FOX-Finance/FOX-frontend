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

/* Call */
async function allowance_contract(_contract, _account, _address) {
    console.log("-- [request] allowance", _contract, _address);
    let response = await _contract.methods.allowance(_account, _address).call();
    console.log("-- [response] allowance :", response);
    return response;
}

async function requiredShareAmountFromCollateralWithLtv_contract(_contract, _collateralAmount, _ltv) {
    console.log("-- [request] requiredShareAmountFromCollateralWithLtv");
    console.log("_collateralAmount", _collateralAmount)
    console.log("_ltv", _ltv)
    let response = await _contract.methods.requiredShareAmountFromCollateralWithLtv(_collateralAmount, _ltv).call();
    console.log("-- [response] requiredShareAmountFromCollateralWithLtv :", response);
    return response;
}

async function requiredCollateralAmountFromShareWithLtv_contract(_contract, _shareAmount, _ltv) {
    console.log("-- [request] requiredCollateralAmountFromShareWithLtv");
    let response = await _contract.methods.requiredCollateralAmountFromShareWithLtv(_shareAmount, _ltv).call();
    console.log("-- [response] requiredCollateralAmountFromShareWithLtv :", response);
    return response;
}

async function expectedMintAmountWithLtv_contract(_contract, _collateralAmount, _ltv, _shareAmount) {
    console.log("-- [request] expectedMintAmountWithLtv");
    let response = await _contract.methods.expectedMintAmountWithLtv(_collateralAmount, _ltv, _shareAmount).call();
    console.log("-- [response] expectedMintAmountWithLtv :", response);
    return response;
}

export { approveMax_contract, openAndDepositAndBorrow_contract, allowance_contract, requiredShareAmountFromCollateralWithLtv_contract, requiredCollateralAmountFromShareWithLtv_contract, expectedMintAmountWithLtv_contract };