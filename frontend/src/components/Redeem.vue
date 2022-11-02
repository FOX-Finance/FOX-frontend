<script>
import {
  connectMetamask,
  getAccount,
  approveMax,
  getAllowance,
  getCurrentLTVFromCDP,
  getRedeemAmount,
} from "../assets/js/interface_request.js";
import { DECIMAL, DECIMAL14, PRECISION } from "../assets/js/contract.js";

export default {
  data() {
    return {
      connected: false,
      approval_fox: false,

      fox: BigInt(0),
      weth: BigInt(0),
      ltv: 0,
      foxs: BigInt(0),
    };
  },
  computed: {
    formattedFOX: {
      get() {
        let result = Number(this.fox / DECIMAL14);
        return (result / PRECISION).toString();
      },
      set(value) {
        this.fox = BigInt(value * DECIMAL);
      },
    },
    formattedWETH: {
      get() {
        let result = Number(this.weth / DECIMAL14);
        return (result / PRECISION).toString();
      },
      set(value) {
        this.weth = BigInt(value * DECIMAL);
      },
    },
    formattedLTV: {
      get() {
        return (this.ltv / 100).toString();
      },
      set(value) {
        this.ltv = value * 100;
      },
    },
    formattedFOXS: {
      get() {
        let result = Number(this.foxs / DECIMAL14);
        return (result / PRECISION).toString();
      },
      set(value) {
        this.foxs = BigInt(value * DECIMAL);
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
    inputCDP: function () {
      getCurrentLTVFromCDP(this.cdp).then((result) => {
        this.ltv = result;
      });
    },
    inputFOX: function () {
      getRedeemAmount(this.fox, this.ltv).then((result) => {
        console.log("RESULT!", result[0])
        this.weth = BigInt(result[0]);
        this.foxs = BigInt(result[1]);
      });
    },
  },
};
</script>

<template>
  <div class="uk-width-1-1">
    <hr />
    <div class="uk-inline">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><span>CDP#</span></a
      >
      <input
        class="uk-input input-form uk-form-width-medium uk-form-large"
        type="number"
        v-model="cdp"
        @input="inputCDP"
      />
    </div>
    <div class="wrap">
      <span
        class="icon-circle"
        uk-icon="icon: arrow-down; ratio: 2;"
        style="margin-left: -1px"
      ></span>
    </div>
    <div class="uk-inline form-icon">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><img src="../img/fox-icon.png" style="width: 20px" /><span>FOX</span>
      </a>
      <input
        class="uk-input input-form uk-form-width-medium uk-form-large"
        type="number"
        v-model="formattedFOX"
        @input="inputFOX"
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
