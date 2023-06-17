<script setup>
import { ref } from "vue";

import Coupon from "../components/Coupon.vue";
import Annihilation from "../components/Annihilation.vue";

let couponKey = ref(0);
let annihilationKey = ref(0);

let refreshCoupon = () => {
  couponKey.value++;
};
let refreshAnnihilation = () => {
  annihilationKey.value++;
};
</script>

<template>
  <div class="width-1-1-medium">
    <div class="uk-card uk-card-default">
      <div>
        <ul
          class="uk-flex-center"
          uk-tab
          data-uk-tab="{connect:'#buyback-tab-contents'}"
        >
          <li class="uk-active"><a @click="refreshCoupon">Coupon</a></li>
          <li><a @click="refreshAnnihilation">Annihilation</a></li>
        </ul>
        <ul id="buyback-tab-contents" class="uk-switcher">
          <li>
            <Coupon :key="couponKey" />
          </li>
          <li>
            <Annihilation :key="annihilationKey" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
