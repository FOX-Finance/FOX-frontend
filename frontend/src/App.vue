<script>
import { connectContract } from "./assets/js/interface_request.js";
import { RouterLink, RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
import Wallet from "./components/Wallet.vue";

export default {
  data() {
    return {
      connected: false,
      loading: false,
    };
  },
  components: {
    Menu,
    Wallet,
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
    });

    this.emitter.on("loading-event", (msg) => {
      this.loading = msg;
    });

    connectContract();
  },
};
</script>

<template>
  <div>
    <div v-if="loading" class="spinner-outer">
      <div class="spinner-inner">
        <div uk-spinner="ratio: 3"></div>
      </div>
    </div>
    <div class="background"></div>
    <div class="uk-text-center uk-width-1-1 uk-height-1-1 wrap-top">
      <Menu />
      <div class="wallet-container uk-width-1-1" style="text-align: center">
        <div class="uk-width-2xlarge" style="display: inline-block">
          <Wallet />
        </div>
      </div>
      <div class="container uk-width-1-1" style="text-align: center">
        <div class="uk-width-2xlarge" style="display: inline-block">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* background */
.background {
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url(./img/img-noise-361x370.png);
  background-repeat: repeat;
}

.spinner-outer {
  z-index: 2;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
}

.spinner-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}

.container {
  padding: 10px;
}

.wallet-container {
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
