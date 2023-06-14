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
    <div
      :class="{
        default_background: $route.name !== 'coupon',
        coupon_background: $route.name === 'coupon',
      }"
    ></div>
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
  background-image: url(/img/img-noise-361x370.png);
  background-repeat: repeat;
}

.default_background {
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background: rgb(255, 221, 227);
  background: linear-gradient(
    90deg,
    rgba(255, 221, 227, 1) 0%,
    rgba(247, 232, 182, 1) 35%,
    rgba(241, 255, 191, 1) 68%,
    rgba(255, 221, 154, 1) 100%
  );
}

.coupon_background {
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background: rgb(217, 214, 255);
  background: linear-gradient(
    90deg,
    rgba(217, 214, 255, 1) 0%,
    rgba(156, 228, 237, 1) 35%,
    rgba(179, 243, 255, 1) 68%,
    rgba(65, 228, 214, 1) 100%
  );
}

.lined_background {
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 100vh;

  background-color: #f9f9f9;
  opacity: 0.5;
  background-size: 34px 34px;
  background-image: repeating-linear-gradient(
    0deg,
    #ececec,
    #ececec 1.7000000000000002px,
    #f9f9f9 1.7000000000000002px,
    #f9f9f9
  );
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
