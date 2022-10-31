<script>
import {
  connectMetamask,
  getAccount,
  approveMax,
  getAllowance,
} from "../assets/js/interface_request.js";

export default {
  data() {
    return {
      connected: false,
      approval_weth: false,
      approval_sin: false,
      approval_foxs: false,
    };
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = true;
      this.checkAllowance();
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
          getAllowance("SIN").then((allowance_sin) => {
            if (allowance_sin != 0) {
              this.approval_sin = true;
              getAllowance("FOXS").then((allowance_foxs) => {
                if (allowance_foxs != 0) {
                  this.approval_foxs = true;
                }
              });
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
      if (!approval_weth) {
        approveMax("WETH").then((success) => {
          if (success) this.approval_weth = true;
          else this.approval_weth = false;
        });
      } else if (!approval_sin) {
        approveMax("SIN").then((success) => {
          if (success) this.approval_sin = true;
          else this.approval_sin = false;
        });
      } else if (!approval_foxs) {
        approveMax("FOXS").then((success) => {
          if (success) this.approval_foxs = true;
          else this.approval_foxs = false;
        });
      }
    },
    mintOnClick: function () {
      console.log("mintOnClick");
      /*
      mint().then((success) => {
        if (success)  this.approval = true;
        else this.approval = false;
      });
      */
    },
  },
};
</script>

<template>
  <div class="uk-width-1-1">
    <hr />
    <div class="uk-inline form-icon">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><img src="../img/bnb-icon.png" style="width: 20px" /><span>BNB</span>
      </a>
      <input
        class="uk-input input-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <div class="wrap">
      <div class="uk-inline">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
          ><span>LTV</span></a
        >
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          type="number"
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
      />
    </div>
    <hr />
    <div v-if="approval_weth && approval_sin && approval_foxs">
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
        <span v-else-if="!approval_sin">Approve(SIN)</span>
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
</template>
