<script>
import {
  connectMetamask,
  addTokenToMetamask,
  getAccount,
  getBalance,
} from "../assets/js/interface_request.js";
import { ethers } from "ethers";
export default {
  data() {
    return {
      connected: false,
      btnText: "Connect to wallet",
      btnTooltip: "Connect to wallet",

      weth: ethers.BigNumber.from(0),
      foxs: ethers.BigNumber.from(0),
      fox: ethers.BigNumber.from(0),

      intervalid: "",
    };
  },
  computed: {
    formattedWETH: {
      get() {
        return ethers.utils.formatEther(this.weth);
      },
      set(value) {
        this.weth = ethers.utils.parseUnits(value, "ether");
      },
    },
    formattedFOXS: {
      get() {
        return ethers.utils.formatEther(this.foxs);
      },
      set(value) {
        this.foxs = ethers.utils.parseUnits(value, "ether");
      },
    },
    formattedFOX: {
      get() {
        return ethers.utils.formatEther(this.fox);
      },
      set(value) {
        this.fox = ethers.utils.parseUnits(value, "ether");
      },
    },
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
      if (this.connected) {
        let account = getAccount();
        this.btnText = account;
        this.btnTooltip = account;
      }
      this.updateBalance();
    });
  },
  methods: {
    connectOnClick: function () {
      if (getAccount() !== "") return;
      connectMetamask().then((success) => {
        if (success) {
          console.log("metamask successfully connected!");
          this.emitter.emit("metamask-connect-event", true);

          // update balance
          this.intervalid = setInterval(
            function () {
              this.updateBalance();
            }.bind(this),
            3000
          );
        } else {
          console.log("metamask connection failed!");
          this.btnTest = "metamask required!";
          this.btnTooltip = "metamask required!";
          this.emitter.emit("metamask-connect-event", false);
        }
      });
    },
    updateBalance: function () {
      if (getAccount() === "" || !this.connected) return;
      getBalance("WETH").then((result) => {
        this.weth = result;
      });
      getBalance("FOXS").then((result) => {
        this.foxs = result;
      });
      getBalance("FOX").then((result) => {
        this.fox = result;
      });
      console.log("UpdateBalance!");
    },
    addToken: function (tokenName) {
      addTokenToMetamask(tokenName);
    },
  },
};
</script>

<template>
  <div class="width-1-1-medium">
    <button class="width-1-1-medium uk-button wallet-button" @click="connectOnClick">
      <span style="display: block; overflow: hidden; text-overflow: ellipsis">{{
        btnText
      }}</span>
    </button>
    <div class="uk-text-center wrap-top" uk-grid>
      <button class="uk-width-1-3 uk-button balance-button" @click="addToken('WETH')">
        <span style="display: block; overflow: hidden; text-overflow: ellipsis">
          <img src="../img/bnb-icon.png" style="width: 20px" /> {{ formattedWETH }}</span
        >
      </button>
      <button class="uk-width-1-3 uk-button balance-button" @click="addToken('FOXS')">
        <span class="balance-text">
          <img src="../img/foxs-icon.png" style="width: 20px" />
          {{ formattedFOXS }}</span
        >
      </button>
      <button class="uk-width-1-3 uk-button balance-button" @click="addToken('FOX')">
        <span style="display: block; overflow: hidden; text-overflow: ellipsis">
          <img src="../img/fox-icon.png" style="width: 20px" /> {{ formattedFOX }}</span
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.uk-grid {
  margin-left: 0px;
}

.balance-button,
.wallet-button {
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 25px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.balance-button {
  max-height: 40px;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
}

.balance-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
