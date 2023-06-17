<script>
import {
  connectMetamask,
  getAccount,
  approveMax,
  getAllowance,
  getdefaultValuesRecollateralize,
  getLtvRangeWhenRecollateralize,
  getWethRangeWhenRecollateralize,
  getShareAmountInRecollateralize,
  recollateralize,
  getTrustLevel,
  getMaxLTV,
  getTokenIds,
} from "../assets/js/interface_request.js";
import { ethers } from "ethers";

export default {
  data() {
    return {
      connected: false,
      approval_weth: false,

      tokenIds: [],
      cdp: "",
      weth: ethers.BigNumber.from("0"),
      ltv: 0,
      foxs: ethers.BigNumber.from("0"),

      weth_format: "",
      foxs_format: "",

      bWethWrongRange: false,
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
        //this.checkRange();
      },
    },
    formattedLTV: {
      get() {
        if (this.ltv === "") return "";
        return +(this.ltv / 100).toFixed(2);
      },
      set(value) {
        console.log("set ltv!!", value);
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
      getAllowance("WETH").then((allowance_weth) => {
        if (allowance_weth != 0) {
          this.approval_weth = true;
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
      getTokenIds().then((result) => {
        this.tokenIds = result;
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
    approveOnClick: async function () {
      if (!this.approval_weth) {
        this.emitter.emit("loading-event", true);
        try {
          const success = await approveMax("WETH");
          if (success) this.approval_weth = true;
          else this.approval_weth = false;
        } catch (e) {
        } finally {
          this.emitter.emit("loading-event", false);
        }
      }
    },
    RecollateralizeOnClick: async function () {
      this.emitter.emit("loading-event", true);
      try {
        const result = await recollateralize(this.cdp, this.weth, this.ltv);
        if (result) console.log("recollateralize success!");
        else console.log("recollateralize failed!");
      } catch (e) {
      } finally {
        this.emitter.emit("loading-event", false);
      }
    },
    changeCDP: function () {
      getdefaultValuesRecollateralize(this.cdp).then((result) => {
        this.setWETH(result.collateralAmount_);
        this.ltv = result.ltv_;
        this.setFOXS(result.shareAmount_);
      });
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
    updateMaxWETH: async function () {
      return getWethRangeWhenRecollateralize(this.cdp, this.ltv).then(
        (wethRange) => {
          this.setWETH(wethRange.upperBound_);
        }
      );
    },
    updateMaxLTV: async function () {
      return getLtvRangeWhenRecollateralize(this.cdp, this.weth).then(
        (ltvRange) => {
          this.ltv = ltvRange.upperBound_;
        }
      );
    },
    inputWETH: async function (event) {
      this.updateFoxs().then((result) => {
        this.checkRange(event);
      });
    },
    inputLTV: async function (event) {
      this.updateFoxs().then((result) => {
        this.checkRange(event);
      });
    },
    updateFoxs: async function () {
      return getShareAmountInRecollateralize(
        this.cdp,
        this.weth,
        this.ltv
      ).then((result) => {
        console.log("getShareAmountInRecollateralize", result);
        this.setFOXS(ethers.BigNumber.from(result));
      });
    },
    checkRange: async function (event) {
      // Weth range check
      getWethRangeWhenRecollateralize(this.cdp, this.ltv).then((wethRange) => {
        let upperBound = ethers.BigNumber.from(wethRange.upperBound_);
        let lowerBound = ethers.BigNumber.from(wethRange.lowerBound_);
        this.bWethWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.weth.gt(upperBound) ||
          this.weth.lt(lowerBound);
        console.log(
          this.bWethWrongRange,
          "WETH RANGE!!! ",
          upperBound,
          lowerBound
        );
      });

      // ltv range check
      getLtvRangeWhenRecollateralize(this.cdp, this.weth).then((ltvRange) => {
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
          lowerBound,
          this.ltv
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
          uk-icon="icon: arrow-down; ratio: 2;"
          style="margin-left: -1px"
        ></span>
      </div>
      <div class="uk-inline form-icon">
        <a
          class="uk-form-icon uk-form-icon-flip input-form-icon"
          @click="updateMaxWethOnClick()"
          ><img src="/img/fil-icon.png" style="width: 20px" /><span
            >FIL</span
          ></a
        >
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
      <hr class="custom-divider-vertical" />
      <div class="description">
        <span style="font-weight: bold">TRUST LEVEL:</span>
        {{ this.trustLevel }}%
      </div>
      <div class="wrap">
        <span
          class="icon-circle"
          uk-icon="icon: arrow-down; ratio: 2;"
          style="margin-left: -1px"
        ></span>
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
      <div v-if="approval_weth">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="RecollateralizeOnClick"
        >
          Recollateralize
        </button>
      </div>
      <div v-else-if="connected">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="approveOnClick"
        >
          Approve(WETH)
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
