<script>
import { connectMetamask, getAccount } from "../assets/js/interface_request.js";
export default {
  data() {
    return {
      connected: false,
      btnText: "Connect to wallet",
      btnTooltip: "Connect to wallet",
    };
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
      if (this.connected) {
        let account = getAccount();
        this.btnText = account;
        this.btnTooltip = account;
      }
    });
  },
  methods: {
    connectOnClick: function () {
      if (getAccount() !== "") return;

      let result;
      connectMetamask().then((success) => {
        if (success) {
          console.log("metamask successfully connected!");
          this.emitter.emit("metamask-connect-event", true);
        } else {
          console.log("metamask connection failed!");
          this.btnTest = "metamask required!";
          this.btnTooltip = "metamask required!";
          this.emitter.emit("metamask-connect-event", false);
        }
      });
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
  </div>
</template>

<style scoped>
.wallet-button {
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 25px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}
</style>
