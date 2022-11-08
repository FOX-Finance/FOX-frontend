<script>
import {
  connectMetamask,
  getAccount,
  approveMax,
  getAllowance,
  //getCurrentLTVFromCDP,
  getRedeemAmount,
  redeem,
  getBalance,
} from "../assets/js/interface_request.js";
import { ethers } from "ethers";

export default {
  data() {
    return {
      connected: false,
      approval_fox: false,

      cdp: "",
      fox: ethers.BigNumber.from("0"),
      weth: ethers.BigNumber.from("0"),
      ltv: 0,
      foxs: ethers.BigNumber.from("0"),

      fox_format: "",
      weth_format: "",
      foxs_format: "",
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

    this.checkAllowance();
  },
  methods: {
    checkAllowance: function () {
      getAllowance("FOX").then((allowance_fox) => {
        if (allowance_fox != 0) {
          this.approval_fox = true;
        }
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
      // new => empty 리턴하도로 바꾼다함
      /*
      getCurrentLTVFromCDP(this.cdp).then((result) => {
        this.ltv = result;
      });
      */
    },
    inputFOX: function (event) {
      getBalance("FOX").then((currentFOX) => {
        let bWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.fox > currentFOX;
        // TODO: bWorngRange => notify
        // ..

        getRedeemAmount(this.cdp, this.fox, this.ltv).then((result) => {
          console.log("RESULT!", result[0]);
          this.weth = ethers.BigNumber.from(result[0]);
          this.foxs = ethers.BigNumber.from(result[1]);
        });
      });
    },
    inputLTV: function () {
      this.inputFOX();
    },
  },
};
</script>

<template>
  <div class="uk-width-1-1">
    <hr />
    <div class="uk-inline form-icon">
      <div
        uk-form-custom="target: > button > span:first-child"
        style="padding-left: 0px; padding-right: 0px"
      >
        <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#">
          <span>CDP#</span>
        </a>
        <select
          v-model="cdp"
          aria-label="Custom controls"
          class="form-button uk-form-width-medium uk-form-large"
          @change="changeCDP"
        >
          <option value="">Please select...</option>
          <option value="0">CDP #0</option>
          <option value="1">CDP #1</option>
          <option value="2">CDP #2</option>
          <option value="3">CDP #3</option>
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
      <span class="icon-circle" uk-icon="icon: arrow-down; ratio: 1.5;"></span>
    </div>
    <div class="uk-inline form-icon">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><img src="../img/fox-icon.png" style="width: 20px" /><span>FOX</span>
      </a>
      <input
        class="uk-input input-form uk-form-width-medium uk-form-large"
        type="number"
        min="0"
        v-model="formattedFOX"
        @input="inputFOX($event)"
      />
    </div>
    <div class="wrap">
      <span class="icon-circle" uk-icon="icon: arrow-down; ratio: 1.5;"></span>
    </div>
    <div class="uk-inline form-icon">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><img src="../img/bnb-icon.png" style="width: 20px" /><span>BNB</span></a
      >
      <input
        readonly
        class="uk-input result-form uk-form-width-medium uk-form-large"
        type="number"
        v-model="formattedWETH"
        @input="inputWETH"
      />
    </div>
    <div class="wrap">
      <div class="uk-inline">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
          ><span>LTV(%)</span></a
        >
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedLTV"
          @input="inputLTV"
        />
      </div>
    </div>
    <div class="description">
      <span style="font-weight: bold">EXCHANGE RATES</span>USDC: $1.000
    </div>
    <div class="wrap">
      <span class="icon-circle" uk-icon="plus"></span>
    </div>
    <div class="uk-inline form-icon">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><img src="../img/foxs-icon.png" style="width: 20px" /><span>FOXS</span></a
      >
      <input
        readonly
        class="uk-input result-form uk-form-width-medium uk-form-large"
        type="number"
        v-model="formattedFOXS"
        @input="inputFOXS"
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
</template>
