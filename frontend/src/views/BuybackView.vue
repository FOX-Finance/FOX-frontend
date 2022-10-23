<script setup>
import Buyback from "../components/Buyback.vue";
import Recollateralize from "../components/Recollateralize.vue";
</script>

<template>
  <div class="width-1-1-medium">
    <div class="uk-card uk-card-default">
      <div>
        <ul class="uk-flex-center" uk-tab data-uk-tab="{connect:'#my-id'}">
          <li class="uk-active"><a href="#">Buyback</a></li>
          <li><a href="#">Recollateralize</a></li>
        </ul>
        <ul id="my-id" class="uk-switcher uk-margin">
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

<style scoped>
.uk-card {
  padding: 30px;
}
.uk-card-default {
  border-radius: 25px;
  opacity: 0.7;
  box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
}
</style>
