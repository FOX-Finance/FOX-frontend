<script setup>
import Coupon from "../components/Coupon.vue";
</script>

<template>
  <div class="width-1-1-medium">
    <div class="uk-card uk-card-default">
      <div>
        <ul class="uk-flex-center" uk-tab data-uk-tab="{connect:'#buyback-tab-contents'}">
          <li class="uk-active"><a href="#">Coupon</a></li>
        </ul>
        <ul id="buyback-tab-contents" class="uk-switcher">
          <li>
            <Coupon />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>