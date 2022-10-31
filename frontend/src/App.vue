<script>
import { RouterLink, RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
import Wallet from "./components/Wallet.vue";

export default {
  data() {
    return {
      connected: false,
    };
  },
  components: {
    Menu,
    Wallet,
  },
  mounted() {
    this.emitter.on("metamask-connect-event",
      msg => { this.connected = true;}
    );
  }
};

</script>

<template>
  <div>
    <div class="background"></div>
    <div class="uk-text-center uk-width-1-1 uk-height-1-1">
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

.container {
  padding: 10px;
}

.wallet-container {
  padding:10px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
