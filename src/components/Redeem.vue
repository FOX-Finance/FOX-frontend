<script>
import {
  connectMetamask,
  getAccount,
  approveMax,
  getAllowance,
  getdefaultValuesRedeem,
  getLtvRangeWhenRedeem,
  getFoxRangeWhenRedeem,
  getRedeemAmount,
  redeem,
  getTrustLevel,
  getMaxLTV,
  getTokenIdsOfOwner,
} from "../assets/js/interface_request.js";
import { ethers } from "ethers";

export default {
  data() {
    return {
      connected: false,
      approval_fox: false,

      tokenIds: [],
      cdp: "",
      fox: ethers.BigNumber.from("0"),
      weth: ethers.BigNumber.from("0"),
      ltv: 0,
      foxs: ethers.BigNumber.from("0"),

      fox_format: "",
      weth_format: "",
      foxs_format: "",

      bFoxWrongRange: false,
      bLtvWrongRange: false,

      trustLevel: 0,
      maxLTV: 0,
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
      },
    },
    formattedLTV: {
      get() {
        if (this.ltv === "") return "";
        return +(this.ltv / 100).toFixed(2);
      },
      set(value) {
        this.ltv = +(+value.toFixed(2) * 100).toFixed(2);
        //this.checkRange();
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
        //this.checkRange();
      },
    },
  },
  mounted() {
    try {
      this.updateValues();
      this.checkAllowance();
    } catch (e) {}

    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
      if (this.connected) {
        this.updateValues();
        this.checkAllowance();
      }
    });

    if (getAccount() !== "") {
      this.connected = true;
    }
  },
  methods: {
    checkAllowance: function () {
      getAllowance("FOX").then((allowance_fox) => {
        console.log("allowance_fox", allowance_fox);
        if (allowance_fox != 0) {
          this.approval_fox = true;
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
      getTokenIdsOfOwner("FOXFARM").then((tokenIds) => {
        this.tokenIds = tokenIds;
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
      console.log("approveOnClick (approval_fox) : ", this.approval_fox);
      if (!this.approval_fox) {
        this.emitter.emit("loading-event", true);
        approveMax("FOX").then((success) => {
          this.emitter.emit("loading-event", false);
          if (success) this.approval_fox = true;
          else this.approval_fox = false;
        });
      }
    },
    redeemOnClick: function () {
      this.emitter.emit("loading-event", true);
      redeem(this.cdp, this.fox, this.weth).then((result) => {
        this.emitter.emit("loading-event", false);
        if (result) console.log("redeem success!");
        else console.log("redeem failed!");
      });
    },
    changeCDP: function () {
      getdefaultValuesRedeem(this.cdp).then((result) => {
        this.setFOX(result.stableAmount_);
        this.setWETH(result.collateralAmount_);
        this.ltv = result.ltv_;
        this.setFOXS(result.shareAmount_);
      });
    },
    setFOX: function (bigint_) {
      this.fox = ethers.BigNumber.from(bigint_);
      this.fox_format = ethers.utils.formatEther(
        ethers.BigNumber.from(bigint_)
      );
    },
    setWETH: function (bigint_) {
      this.weth = ethers.BigNumber.from(bigint_);
      this.weth_format = ethers.utils.formatEther(
        ethers.BigNumber.from(bigint_)
      );
    },
    setFOXS: function (bigint_) {
      this.foxs = ethers.BigNumber.from(bigint_);
      this.foxs_format = ethers.utils.formatEther(
        ethers.BigNumber.from(bigint_)
      );
    },
    updateMaxFoxOnClick: async function () {
      this.updateMaxFOX().then((result) => {
        this.inputFOX();
      });
    },
    updateMaxLtvOnClick: async function () {
      this.updateMaxLTV().then((result) => {
        this.inputLTV();
      });
    },
    updateMaxFOX: async function () {
      return getFoxRangeWhenRedeem(this.cdp).then((foxRange) => {
        this.setFOX(foxRange.upperBound_);
      });
    },
    updateMaxLTV: async function () {
      return getLtvRangeWhenRedeem(this.cdp, this.fox).then((ltvRange) => {
        this.ltv = ltvRange.upperBound_;
      });
    },
    inputFOX: async function (event) {
      this.updateWethAndFoxs().then((result) => {
        this.checkRange(event);
      });
    },
    inputLTV: async function (event) {
      this.inputFOX(event);
    },
    updateWethAndFoxs: async function () {
      return getRedeemAmount(this.cdp, this.fox, this.ltv).then((result) => {
        console.log("getRedeemAmount", result);
        this.setWETH(ethers.BigNumber.from(result.emittedCollateralAmount_));
        this.setFOXS(ethers.BigNumber.from(result.emittedShareAmount_));
      });
    },
    checkRange: async function (event) {
      // Fox range check
      getFoxRangeWhenRedeem(this.cdp).then((foxRange) => {
        let upperBound = ethers.BigNumber.from(foxRange.upperBound_);
        let lowerBound = ethers.BigNumber.from(foxRange.lowerBound_);
        this.bFoxWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.fox.gt(upperBound) ||
          this.fox.lt(lowerBound);
        console.log(
          this.bFoxWrongRange,
          "FOX RANGE!!! ",
          upperBound,
          lowerBound
        );
      });

      // ltv range check
      getLtvRangeWhenRedeem(this.cdp, this.fox).then((ltvRange) => {
        let upperBound = ltvRange.upperBound_; // should be <=
        let lowerBound = ltvRange.lowerBound_; // should be >
        this.bLtvWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.ltv > upperBound ||
          this.ltv < lowerBound;
        console.log(
          this.bLtvWrongRange,
          "LTV RANGE!!! ",
          upperBound,
          lowerBound
        );
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
            <!-- <option value="">Please select...</option> -->
            <option v-for="tokenId in tokenIds" :key="tokenId" :value="tokenId">
              {{ tokenId }}
            </option>
          </select>
          <button
            class="uk-button uk-button-grey form-button uk-form-width-medium uk-form-large uk-text-left"
            type="button"
            tabindex="-1"
            style="max-width: 100%"
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
        <span
          class="icon-circle"
          uk-icon="icon: arrow-down; ratio: 1.5;"
        ></span>
      </div>
      <div class="uk-inline form-icon">
        <a
          class="uk-form-icon uk-form-icon-flip input-form-icon"
          @click="updateMaxFoxOnClick()"
          ><img src="/img/fox-icon.png" style="width: 20px" /><span>FOX</span>
        </a>
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          :class="{ wrong: bFoxWrongRange }"
          type="number"
          min="0"
          v-model="formattedFOX"
          @input="inputFOX($event)"
          :disabled="cdp === ''"
        />
      </div>
      <div v-if="bFoxWrongRange" class="description wrap-top">
        <span style="font-weight: bold; color: red">WRONG VALUE!</span>
      </div>
      <div v-else class="description wrap-top">
        <span style="font-weight: bold">TRUST LEVEL:</span>
        {{ this.trustLevel }}%
      </div>
      <div class="wrap">
        <span
          class="icon-circle"
          uk-icon="icon: arrow-down; ratio: 1.5;"
        ></span>
      </div>
      <div class="uk-inline form-icon">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon"
          ><img src="/img/bnb-icon.png" style="width: 20px" /><span
            >BNB</span
          ></a
        >
        <input
          readonly
          class="uk-input result-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedWETH"
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
            v-model="formattedLTV"
            @input="inputLTV($event)"
            :disabled="cdp === ''"
          />
        </div>
      </div>
      <div v-if="bLtvWrongRange" class="description">
        <span style="font-weight: bold; color: red">WRONG VALUE!</span>
      </div>
      <div v-else class="description">
        <span style="font-weight: bold">MAX LTV:</span> {{ this.maxLTV }}%
      </div>
      <div class="wrap">
        <span class="icon-circle" uk-icon="plus"></span>
      </div>
      <div class="uk-inline form-icon">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon"
          ><img src="/img/foxs-icon.png" style="width: 20px" /><span
            >FOXS</span
          ></a
        >
        <input
          readonly
          class="uk-input result-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedFOXS"
        />
      </div>
      <hr />
      <div v-if="approval_fox">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="redeemOnClick"
        >
          Redeem
        </button>
      </div>
      <div v-else-if="connected">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="approveOnClick"
        >
          Approve(FOX)
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
