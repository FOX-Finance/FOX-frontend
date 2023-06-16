<script>
import {
  connectMetamask,
  getAccount,
  approveMax,
  getAllowance,
  //getCurrentLTVFromCDP,
  getCollateralAmount,
  buyback,
  getBalance,
  getTokenIdsOfOwner,
} from "../assets/js/interface_request.js";
import { ethers } from "ethers";

export default {
  data() {
    return {
      connected: false,
      approval_foxs: false,
      approval_fox: false,

      tokenIds: [],
      cdp: "",
      foxs: ethers.BigNumber.from("0"),
      weth: ethers.BigNumber.from("0"),
      ltv: 0,

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
      getAllowance("FOXS").then((allowance_foxs) => {
        if (allowance_foxs != 0) {
          this.approval_foxs = true;
          getAllowance("FOX").then((allowance_fox) => {
            if (allowance_fox != 0) {
              this.approval_fox = true;
            }
          });
        }
      });
    },
    updateValues: function () {
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
      console.log("approveOnClick (approval_foxs) : ", this.approval_foxs);
      if (!this.approval_foxs) {
        this.emitter.emit("loading-event", true);
        approveMax("FOXS").then((success) => {
          this.emitter.emit("loading-event", false);
          if (success) this.approval_foxs = true;
          else this.approval_foxs = false;
        });
      } else if (!this.approval_fox) {
        this.emitter.emit("loading-event", true);
        approveMax("FOX").then((success) => {
          this.emitter.emit("loading-event", false);
          if (success) this.approval_fox = true;
          else this.approval_fox = false;
        });
      }
    },
    buybackOnClick: function () {
      this.emitter.emit("loading-event", true);
      buyback(this.cdp, this.foxs).then((result) => {
        this.emitter.emit("loading-event", false);
        if (result) console.log("buyback success!");
        else console.log("buyback failed!");
      });
    },
    changeCDP: function () {
      /*
      getCurrentLTVFromCDP(this.cdp).then((result) => {
        this.ltv = result;
      });
      */
    },
    inputFOXS: function () {
      getCollateralAmount(this.cdp, this.foxs, this.ltv).then((result) => {
        this.weth = result;
      });
    },
    inputLTV: function () {
      this.inputFOXS();
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
          uk-icon="icon: arrow-down; ratio: 1.5;"
        ></span>
      </div>
      <div class="uk-inline form-icon">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon"
          ><img src="/img/foxs-icon.png" style="width: 20px" /><span
            >FOXS</span
          ></a
        >
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedFOXS"
          @input="inputFOXS"
          :disabled="cdp === ''"
        />
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
          <a class="uk-form-icon uk-form-icon-flip input-form-icon"
            ><span>LTV(%)</span></a
          >
          <input
            class="uk-input input-form uk-form-width-medium uk-form-large"
            type="number"
            v-model="formattedLTV"
            @input="inputLTV"
            :disabled="cdp === ''"
          />
        </div>
      </div>
      <hr />
      <div v-if="approval_foxs && approval_fox">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="buybackOnClick"
        >
          Buyback
        </button>
      </div>
      <div v-else-if="connected">
        <button
          class="uk-button uk-button-default uk-button-large form-button"
          @click="approveOnClick"
        >
          <span v-if="!approval_foxs">Approve(FOXS)</span>
          <span v-else-if="!approval_fox">Approve(FOX)</span>
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
