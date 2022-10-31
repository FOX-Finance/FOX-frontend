async function approveMax_contract(_contract, _account, _address) {
    console.log("-- [request] approveMax");
    let response = await _contract.methods.approveMax(_address).send({ from: _account });
    console.log("-- [response] approveMax :", response);
    return response;
}

async function allowance_contract(_contract, _account, _address) {
    console.log("-- [request] allowance");
    let response = await _contract.methods.allowance(_account, _address).call({ from: _account });
    console.log("-- [response] allowance :", response);
    return response;
}

export { approveMax_contract, allowance_contract };