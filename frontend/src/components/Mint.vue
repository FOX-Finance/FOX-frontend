<script>
import {
  connectMetamask,
  getAccount,
  approveMax,
  openAndDepositAndBorrow,
  getAllowance,
  getShareAmount,
  getDebtAmount,
  getMintAmount,
  getCurrentLTVFromCDP,
  getBalance,
  getLtvRangeWhenMint,
} from "../assets/js/interface_request.js";
import { DECIMAL, DECIMAL10, PRECISION } from "../assets/js/contract.js";

export default {
  data() {
    return {
      connected: false,
      approval_weth: false,
      approval_foxs: false,

      cdp: "",
      bnb: "",
      ltv: "",
      foxs: "",
      mint: "",
    };
  },
  computed: {
    formattedBNB: {
      get() {
        if (this.bnb === "") return "";
        let result = Number(this.bnb / DECIMAL10);
        return result / PRECISION;
      },
      set(value) {
        this.bnb = BigInt(value * DECIMAL);
      },
    },
    formattedLTV: {
      get() {
        if (this.ltv === "") return "";
        return this.ltv / 100;
      },
      set(value) {
        this.ltv = value * 100;
      },
    },
    formattedFOXS: {
      get() {
        if (this.foxs === "") return "";
        let result = Number(this.foxs / DECIMAL10);
        return result / PRECISION;
      },
      set(value) {
        this.foxs = BigInt(value * DECIMAL);
      },
    },
    formattedMINT: {
      get() {
        if (this.mint === "") return "";
        let result = Number(this.mint / DECIMAL10);
        return result / PRECISION;
      },
      set(value) {
        this.mint = BigInt(value * DECIMAL);
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
      getAllowance("WETH").then((allowance_weth) => {
        if (allowance_weth != 0) {
          this.approval_weth = true;
          getAllowance("FOXS").then((allowance_foxs) => {
            if (allowance_foxs != 0) {
              this.approval_foxs = true;
            }
          });
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
      openAndDepositAndBorrow(this.bnb, this.mint).then((result) => {
        this.emitter.emit("loading-event", false);
        if (result) console.log("mint success!");
        else console.log("mint failed!");
      });
    },
    changeCDP: function () {
      // new => empty 리턴하도로 바꾼다함
      getCurrentLTVFromCDP(this.cdp).then((result) => {
        this.ltv = result;
      });
    },
    inputBNB: function (event) {
      getBalance("WETH").then((currentBNB) => {
        let bWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.bnb > currentBNB;
        // TODO: bWorngRange => notify
        // ..

        getShareAmount(this.cdp, this.bnb, this.ltv).then((result) => {
          this.foxs = result;
          getMintAmount(this.cdp, this.bnb, this.ltv, this.foxs).then((mintResult) => {
            this.mint = mintResult;
          });
        });
      });
    },
    inputFOXS: function () {
      // TODO: bWorngRange => notify
      // ..

      getDebtAmount(this.cdp, this.foxs, this.ltv).then((result) => {
        this.bnb = result;
        getMintAmount(this.cdp, this.bnb, this.ltv, this.foxs).then((mintResult) => {
          this.mint = mintResult;
        });
      });
    },
    inputLTV: function (event) {
      if (event !== undefined && parseInt(event.target.value) < 0) {
        event.target.value = 0;
      }

      getLtvRangeWhenMint(this.cdp, this.bnb).then((ltvRange) => {
        let upperBound = parseInt(ltvRange.upperBound_); // should be <=
        let lowerBound = parseInt(ltvRange.lowerBound_); // should be >
        let bWrongRange =
          (event !== undefined && parseInt(event.target.value) < 0) ||
          this.ltv > upperBound ||
          this.ltv <= lowerBound;
        // TODO: bWorngRange => notify
        // ..

        this.inputBNB();
      });
    },
  },
};
</script>

<template>
  <div class="uk-width-1-1">
    <div v-if="!connected" class="spinner-outer uk-width-1-1">
      <div class="spinner-inner">
        <span uk-icon="icon: more; ratio: 3"></span>
        <p>Connect to wallet first</p>
      </div>
    </div>
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
            :disabled="!connected"
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
        <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
          ><img src="../img/bnb-icon.png" style="width: 20px" /><span>BNB</span>
        </a>
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          type="number"
          min="0"
          v-model="formattedBNB"
          @input="inputBNB($event)"
          :disabled="cdp === ''"
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
            min="0"
            v-model="formattedLTV"
            @input="inputLTV($event)"
            :disabled="cdp === ''"
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
        <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#">
          <img src="../img/foxs-icon.png" style="width: 20px" />
          <span>FOXS</span>
        </a>
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedFOXS"
          @input="inputFOXS"
          :disabled="cdp === ''"
        />
      </div>
      <div class="wrap">
        <span class="icon-circle" uk-icon="icon: arrow-down; ratio: 1.5;"></span>
      </div>
      <div class="uk-inline form-icon">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#">
          <img src="../img/fox-icon.png" style="width: 20px" />
          <span>FOX</span>
        </a>
        <input
          readonly
          class="uk-input result-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedMINT"
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

<style scoped>
.spinner-outer {
  z-index: 2;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 25px;
}

.spinner-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -78px;
}

select {
  text-align-last: left;
  text-align: left;
  -ms-text-align-last: left;
  -moz-text-align-last: left;
}
</style>
