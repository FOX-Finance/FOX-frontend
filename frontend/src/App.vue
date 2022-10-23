<script setup>
import { RouterLink, RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
import Wallet from "./components/Wallet.vue";
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
  padding: 30px;
  padding-top: 0px;
}

.wallet-container {
  padding-bottom: 10px;
}
</style>
