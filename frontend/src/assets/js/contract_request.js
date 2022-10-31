/* Send */
async function approveMax_contract(_contract, _account, _address) {
    console.log("-- [request] approveMax");
    let response = await _contract.methods.approveMax(_address).send({ from: _account });
    console.log("-- [response] approveMax :", response);
    return response;
}

async function openAndDepositAndBorrow_contract(_contract, _account, _depositAmount, _borrowAmount) {
    console.log("-- [request] openAndDepositAndBorrow");
    let response = await _contract.methods.openAndDepositAndBorrow(_depositAmount, _borrowAmount).send({ from: _account });
    console.log("-- [response] openAndDepositAndBorrow :", response);
    return response;
}

/* Call */
async function allowance_contract(_contract, _account, _address) {
    console.log("-- [request] allowance");
    let response = await _contract.methods.allowance(_account, _address).call();
    console.log("-- [response] allowance :", response);
    return response;
}

async function requiredShareAmountFromDebt_contract(_contract, _debtAmount) {
    console.log("-- [request] requiredShareAmountFromDebt");
    let response = await _contract.methods.requiredShareAmountFromDebt(_debtAmount).call();
    console.log("-- [response] requiredShareAmountFromDebt :", response);
    return response;
}

async function requiredDebtAmountFromShare_contract(_contract, _shareAmount) {
    console.log("-- [request] requiredDebtAmountFromShare");
    let response = await _contract.methods.requiredDebtAmountFromShare(_shareAmount).call();
    console.log("-- [response] requiredDebtAmountFromShare :", response);
    return response;
}

export { approveMax_contract, openAndDepositAndBorrow_contract, allowance_contract, requiredShareAmountFromDebt_contract, requiredDebtAmountFromShare_contract };