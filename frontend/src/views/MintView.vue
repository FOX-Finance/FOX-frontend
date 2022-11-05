<script setup>
import Mint from "../components/Mint.vue";
import Redeem from "../components/Redeem.vue";
</script>

<template>
  <div class="width-1-1-medium">
    <div class="uk-card uk-card-default">
      <div>
        <ul class="uk-flex-center" uk-tab data-uk-tab="{connect:'#mint-tab-contents'}">
          <li class="uk-active"><a href="#">Mint</a></li>
          <li><a href="#">Redeem</a></li>
        </ul>
        <ul id="mint-tab-contents" class="uk-switcher">
          <li>
            <Mint />
          </li>
          <li>
            <Redeem />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>