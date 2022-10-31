import FOX from './json/FOX.json'
import FOXFARM from './json/FoxFarm.json'
import WETH from './json/WETH.json'
import FOXS from './json/FOXS.json'
import SIN from './json/SIN.json'
import address from './json/env.json'

const DECIMAL = 10**18;
const DECIMAL14 = BigInt(10**14);
const PRECISION = 10**4;

const FOX_CONTRACT_ADDR = address.FOX;
const FOXFARM_CONTRACT_ADDR = address.FoxFarm;
const WETH_CONTRACT_ADDR = address.WETH;
const FOXS_CONTRACT_ADDR = address.FOXS;
const SIN_CONTRACT_ADDR = address.SIN;

const FOX_CONTRACT_ABI = FOX.abi;
const FOXFARM_CONTRACT_ABI = FOXFARM.abi;
const WETH_CONTRACT_ABI = WETH.abi;
const FOXS_CONTRACT_ABI = FOXS.abi;
const SIN_CONTRACT_ABI = SIN.abi;

export { DECIMAL, DECIMAL14, PRECISION, FOX_CONTRACT_ADDR, FOX_CONTRACT_ABI, FOXFARM_CONTRACT_ADDR, FOXFARM_CONTRACT_ABI, WETH_CONTRACT_ADDR, FOXS_CONTRACT_ADDR, SIN_CONTRACT_ADDR, WETH_CONTRACT_ABI, FOXS_CONTRACT_ABI, SIN_CONTRACT_ABI };