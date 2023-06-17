<script setup>
import { ref } from "vue";

import Mint from "../components/Mint.vue";
import Redeem from "../components/Redeem.vue";

let mintKey = ref(0);
let redeemKey = ref(0);

let refreshMint = () => {
  mintKey.value++;
};
let refreshRedeem = () => {
  redeemKey.value++;
};
</script>

<template>
  <div class="width-1-1-medium">
    <div class="uk-card uk-card-default">
      <div>
        <ul
          class="uk-flex-center"
          uk-tab
          data-uk-tab="{connect:'#mint-tab-contents'}"
        >
          <li class="uk-active"><a @click="refreshMint">Mint</a></li>
          <li><a @click="refreshRedeem">Redeem</a></li>
        </ul>
        <ul id="mint-tab-contents" class="uk-switcher">
          <li>
            <Mint :key="mintKey" />
          </li>
          <li>
            <Redeem :key="redeemKey" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>