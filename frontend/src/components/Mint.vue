<script>
import {
  ETHERS_MAX,
  connectMetamask,
  getAccount,
  approveMax,
  openAndDepositAndBorrow,
  getAllowance,
  getShareAmount,
  getDebtAmount,
  getMintAmount,
  getdefaultValuesMint,
  getTrustLevel,
  getMaxLTV,
  getLtvRangeWhenMint,
  getFoxsRangeWhenMint,
  getWethRangeWhenMint,
} from "../assets/js/interface_request.js";
import { ethers } from "ethers";

export default {
  data() {
    return {
      connected: false,
      approval_weth: false,
      approval_foxs: false,

      cdp: "",
      weth: ethers.BigNumber.from("0"),
      ltv: 0,
      foxs: ethers.BigNumber.from("0"),
      fox: ethers.BigNumber.from("0"),

      weth_format: "",
      foxs_format: "",
      fox_format: "",

      bWethWrongRange: false,
      bLtvWrongRange: false,
      bFoxsWrongRange: false,

      trustLevel: 0,
      maxLTV: 0,
      ETHERS_MAX: ETHERS_MAX,
    };
  },
  computed: {
    formattedWETH: {
      get() {
        if (this.weth_format === "") return "";
        return this.weth_format;
      },
      set(value) {
        let sValue = value.toString();
        this.weth_format = sValue;
        if (sValue === "") sValue = "0";
        this.weth = ethers.utils.parseUnits(sValue, "ether");
        this.checkRange();
      },
    },
    formattedLTV: {
      get() {
        if (this.ltv === "") return "";
        return +(this.ltv / 100).toFixed(2);
      },
      set(value) {
        this.ltv = +(+value.toFixed(2) * 100).toFixed(2);
        this.checkRange();
      },
    },
    formattedFOXS: {
      get() {
        if (this.foxs_format === "") return "";
        return this.foxs_format;
      },
      set(value) {
        let sValue = value.toString();
        this.foxs_format = sValue;
        if (sValue === "") sValue = "0";
        this.foxs = ethers.utils.parseUnits(sValue, "ether");
        this.checkRange();
      },
    },
    formattedFOX: {
      get() {
        if (this.fox_format === "") return "";
        return this.fox_format;
      },
      set(value) {
        let sValue = value.toString();
        this.fox_format = sValue;
        if (sValue === "") sValue = "0";
        this.fox = ethers.utils.parseUnits(sValue, "ether");
      },
    },
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
      if (this.connected) this.checkAllowance();
    });

    if (getAccount() !== "") {
      this.connected = true;
    }

    this.updateValues();
    this.checkAllowance();
  },
  methods: {
    checkAllowance: function () {
      getAllowance("WETH").then((allowance_weth) => {
        console.log("allowance_weth", allowance_weth);
        if (allowance_weth && !allowance_weth.isZero()) {
          this.approval_weth = true;
          getAllowance("FOXS").then((allowance_foxs) => {
            if (allowance_foxs && !allowance_foxs.isZero()) {
              this.approval_foxs = true;
            }
          });
        }
      });
    },
    updateValues: function () {
      getTrustLevel().then((result) => {
        this.trustLevel = +(result / 100).toFixed(2);
      });
      getMaxLTV().then((result) => {
        this.maxLTV = +(result / 100).toFixed(2);
      });
    },
    connectOnClick: function () {
      console.log("connected : ", this.connected);
      if (getAccount() !== "" || this.connected) return;

      connectMetamask().then((success) => {
        if (success) {
          console.log("metamask successfully connected!");
          this.emitter.emit("metamask-connect-event", true);
        } else {
          console.log("metamask connection failed!");
          this.emitter.emit("metamask-connect-event", false);
        }
      });
    },
    approveOnClick: function () {
      console.log("approveOnClick (approval_weth) : ", this.approval_weth);
      if (!this.approval_weth) {
        this.emitter.emit("loading-event", true);
        approveMax("WETH").then((success) => {
          this.emitter.emit("loading-event", false);
          if (success) this.approval_weth = true;
          else this.approval_weth = false;
        });
      } else if (!this.approval_foxs) {
        this.emitter.emit("loading-event", true);
        approveMax("FOXS").then((success) => {
          this.emitter.emit("loading-event", false);
          if (success) this.approval_foxs = true;
          else this.approval_foxs = false;
        });
      }
    },
    mintOnClick: function () {
      this.emitter.emit("loading-event", true);
      openAndDepositAndBorrow(this.weth, this.fox).then((result) => {
        this.emitter.emit("loading-event", false);
        if (result) console.log("mint success!");
        else console.log("mint failed!");
      });
    },
    changeCDP: function () {
      getdefaultValuesMint(this.cdp).then((result) => {
        this.ltv = result.ltv_;
        this.setWETH(result.collateralAmount_);
        this.setFOXS(result.shareAmount_);
        this.setFOX(result.stableAmount_);
      });
    },
    setWETH: function (bigint_) {
      this.weth = ethers.BigNumber.from(bigint_);
      this.weth_format = ethers.utils.formatEther(ethers.BigNumber.from(bigint_));
    },
    setFOXS: function (bigint_) {
      this.foxs = ethers.BigNumber.from(bigint_);
      this.foxs_format = ethers.utils.formatEther(ethers.BigNumber.from(bigint_));
    },
    setFOX: function (bigint_) {
      this.fox = ethers.BigNumber.from(bigint_);
      this.fox_format = ethers.utils.formatEther(ethers.BigNumber.from(bigint_));
    },
    updateMaxWethOnClick: async function () {
      this.updateMaxWETH().then((result) => {
        this.inputWETH();
      });
    },
    updateMaxLtvOnClick: async function () {
      this.updateMaxLTV().then((result) => {
        this.inputLTV();
      });
    },
    updateMaxFoxsOnClick: async function () {
      this.updateMaxFOXS().then((result) => {
        this.inputFOXS();
      });
    },
    updateMaxWETH: async function () {
      return getWethRangeWhenMint(this.cdp, this.ltv, this.foxs).then((wethRange) => {
        this.setWETH(wethRange.upperBound_);
      });
    },
    updateMaxLTV: async function () {
      return getLtvRangeWhenMint(this.cdp, this.weth, this.foxs).then((ltvRange) => {
        this.ltv = ltvRange.upperBound_;
      });
    },
    updateMaxFOXS: async function () {
      return getFoxsRangeWhenMint(this.cdp, this.weth, this.ltv).then((foxsRange) => {
        this.setFOXS(foxsRange.upperBound_);
      });
    },
    inputWETH: async function (event) {
      this.updateFoxsAndFox().then((result) => {
        this.checkRange(event);
      });
    },
    inputFOXS: async function (event) {
      this.updateWethAndFox().then((result) => {
        this.checkRange(event);
      });
    },
    inputLTV: async function (event) {
      this.inputWETH(event);
    },
    updateFoxsAndFox: async function () {
      return getShareAmount(this.cdp, this.weth, this.ltv).then((result) => {
        this.setFOXS(result);
        getMintAmount(this.cdp, this.weth, this.ltv, this.foxs).then((mintResult) => {
          this.setFOX(mintResult);
        });
      });
    },
    updateWethAndFox: async function () {
      return getDebtAmount(this.cdp, this.foxs, this.ltv).then((result) => {
        this.setWETH(result);
        getMintAmount(this.cdp, this.weth, this.ltv, this.foxs).then((mintResult) => {
          this.setFOX(mintResult);
        });
      });
    },
    checkRange: async function (event) {
      // ltv range check
      console.log("Range Check CDP:", this.cdp, "weth : ", this.weth, "foxs:", this.foxs);
      getLtvRangeWhenMint(this.cdp, this.weth, this.foxs).then((ltvRange) => {
        let upperBound = ltvRange.upperBound_; // should be <=
        let lowerBound = ltvRange.lowerBound_; // should be >
        this.bLtvWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.ltv > upperBound ||
          this.ltv < lowerBound;
        console.log(this.bLtvWrongRange, "LTV RANGE!!! ", upperBound, lowerBound);
      });

      // Foxs range check
      getFoxsRangeWhenMint(this.cdp, this.weth, this.ltv).then((foxsRange) => {
        let upperBound = ethers.BigNumber.from(foxsRange.upperBound_);
        let lowerBound = ethers.BigNumber.from(foxsRange.lowerBound_);
        this.bFoxsWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.foxs.gt(upperBound) ||
          this.foxs.lt(lowerBound);
        console.log(this.bFoxsWrongRange, "FOXS RANGE!!! ", upperBound, lowerBound);
      });

      // Weth range check
      getWethRangeWhenMint(this.cdp, this.ltv, this.foxs).then((wethRange) => {
        let upperBound = ethers.BigNumber.from(wethRange.upperBound_);
        let lowerBound = ethers.BigNumber.from(wethRange.lowerBound_);
        this.bWethWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.weth.gt(upperBound) ||
          this.weth.lt(lowerBound);
        console.log(this.bWethWrongRange, "WETH RANGE!!! ", upperBound, lowerBound);
      });
    },
  },
};
</script>

<template>
  <div class="uk-width-1-1">
    <div v-if="!connected" class="wallet-outer uk-width-1-1">
      <div class="wallet-inner">
        <span uk-icon="icon: more; ratio: 3"></span>
        <p>Please connect to wallet</p>
      </div>
    </div>
    <div class="uk-width-1-1">
      <hr />
      <div class="uk-inline form-icon">
        <div
          uk-form-custom="target: > button > span:first-child"
          style="padding-left: 0px; padding-right: 0px"
        >
          <a class="uk-form-icon uk-form-icon-flip input-form-icon">
            <span>CDP#</span>
          </a>
          <select
            v-model="cdp"
            aria-label="Custom controls"
            class="form-button uk-form-width-medium uk-form-large"
            @change="changeCDP"
            :disabled="!connected"
          >
            <option value="">Please select...</option>
            <option :value="ETHERS_MAX">Open</option>
            <option value="0">CDP #0</option>
            <option value="1">CDP #1</option>
            <option value="2">CDP #2</option>
          </select>
          <button
            class="uk-button uk-button-grey form-button uk-form-width-medium uk-form-large uk-text-left"
            type="button"
            tabindex="-1"
            style="max-width: 100%"
            :disabled="!connected"
          >
            <span></span>
            <span
              uk-icon="icon: chevron-down"
              style="float: right; position: relative; right: 95px; top: 17px"
            ></span>
          </button>
        </div>
      </div>

      <div class="wrap">
        <span class="icon-circle" uk-icon="icon: arrow-down; ratio: 1.5;"></span>
      </div>
      <div class="uk-inline form-icon">
        <a
          class="uk-form-icon uk-form-icon-flip input-form-icon"
          @click="updateMaxWethOnClick()"
          ><img src="../img/bnb-icon.png" style="width: 20px" /><span>WETH</span>
        </a>
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          :class="{ wrong: bWethWrongRange }"
          type="number"
          min="0"
          v-model="formattedWETH"
          @input="inputWETH($event)"
          :disabled="cdp === ''"
        />
      </div>
      <div class="wrap">
        <div class="uk-inline">
          <a
            class="uk-form-icon uk-form-icon-flip input-form-icon"
            @click="updateMaxLtvOnClick()"
            ><span>LTV(%)</span></a
          >
          <input
            class="uk-input input-form uk-form-width-medium uk-form-large"
            :class="{ wrong: bLtvWrongRange }"
            type="number"
            min="0"
            v-model="formattedLTV"
            @input="inputLTV($event)"
            :disabled="cdp === ''"
          />
        </div>
      </div>
      <div v-if="bWethWrongRange || bLtvWrongRange" class="description">
        <span style="font-weight: bold; color: red">WRONG VALUE!</span>
      </div>
      <div v-else class="description">
        <span style="font-weight: bold">MAX LTV:</span> {{ this.maxLTV }}%
      </div>
      <div class="wrap">
        <span class="icon-circle" uk-icon="plus"></span>
      </div>
      <div class="uk-inline form-icon">
        <a
          class="uk-form-icon uk-form-icon-flip input-form-icon"
          @click="updateMaxFoxsOnClick()"
        >
          <img src="../img/foxs-icon.png" style="width: 20px" />
          <span>FOXS</span>
        </a>
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          :class="{ wrong: bFoxsWrongRange }"
          type="number"
          v-model="formattedFOXS"
          @input="inputFOXS($event)"
          :disabled="cdp === ''"
        />
      </div>
      <div v-if="bFoxsWrongRange" class="description wrap-top">
        <span style="font-weight: bold; color: red">WRONG VALUE!</span>
      </div>
      <div v-else class="description wrap-top">
        <span style="font-weight: bold">TRUST LEVEL:</span> {{ this.trustLevel }}%
      </div>
      <div class="wrap">
        <span class="icon-circle" uk-icon="icon: arrow-down; ratio: 1.5;"></span>
      </div>
      <div class="uk-inline form-icon">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon">
          <img src="../img/fox-icon.png" style="width: 20px" />
          <span>FOX</span>
        </a>
        <input
          readonly
          class="uk-input result-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedFOX"
        />
      </div>
      <hr />
      <div v-if="approval_weth && approval_foxs">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="mintOnClick"
        >
          Mint
        </button>
      </div>
      <div v-else-if="connected">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="approveOnClick"
        >
          <span v-if="!approval_weth">Approve(WETH)</span>
          <span v-else-if="!approval_foxs">Approve(FOXS)</span>
        </button>
      </div>
      <div v-else>
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="connectOnClick"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  </div>
</template>