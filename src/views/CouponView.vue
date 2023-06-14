<script setup>
import Coupon from "../components/Coupon.vue";
import Annihilation from "../components/Annihilation.vue";
</script>

<template>
  <div class="width-1-1-medium">
    <div class="uk-card uk-card-default">
      <div>
        <ul class="uk-flex-center" uk-tab data-uk-tab="{connect:'#buyback-tab-contents'}">
          <li class="uk-active"><a>Coupon</a></li>
          <li><a>Annihilation</a></li>
        </ul>
        <ul id="buyback-tab-contents" class="uk-switcher">
          <li>
            <Coupon />
          </li>
          <li>
            <Annihilation />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
