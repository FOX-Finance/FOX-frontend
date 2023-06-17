<script setup>
import { ref } from "vue";

import Buyback from "../components/Buyback.vue";
import Recollateralize from "../components/Recollateralize.vue";

let buybackKey = ref(0);
let recollateralizeKey = ref(0);

let refreshBuyback = () => {
  buybackKey.value++;
};
let refreshRecollateralize = () => {
  recollateralizeKey.value++;
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
          <li class="uk-active"><a @click="refreshBuyback">Buyback</a></li>
          <li><a @click="refreshRecollateralize">Recollateralize</a></li>
        </ul>
        <ul id="buyback-tab-contents" class="uk-switcher">
          <li>
            <Buyback />
          </li>
          <li>
            <Recollateralize />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>