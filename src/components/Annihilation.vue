<script>
import {
  getAccount,
  getTokenIdsOfOwner,
} from "../assets/js/interface_request.js";
import { ethers } from "ethers";

export default {
  data() {
    return {
      connected: false,

      tokenIds: [],
      couponIds: [],
      cdp: "",
      pdc: "",
    };
  },
  mounted() {
    try {
      this.updateValues();
      this.checkAllowance();
    } catch (e) {}

    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
      if (this.connected) {
        this.updateValues();
        this.checkAllowance();
      }
    });

    if (getAccount() !== "") {
      this.connected = true;
    }
  },
  methods: {
    checkAllowance: function () {
      getAllowance("FOXS").then((allowance_foxs) => {
        if (allowance_foxs != 0) {
          this.approval_foxs = true;
          getAllowance("FOX").then((allowance_fox) => {
            if (allowance_fox != 0) {
              this.approval_fox = true;
            }
          });
        }
      });
    },
    updateValues: function () {
      getTokenIdsOfOwner("FOXFARM").then((tokenIds) => {
        this.tokenIds = tokenIds;
      });
      getTokenIdsOfOwner("Coupon").then((couponIds) => {
        this.couponIds = couponIds;
      });
    },
    changeCDP: function () {},
    changePDC: function () {},
  },
};
</script>

<template>
  <div class="uk-width-1-1">
    <!--div v-if="!connected" class="wallet-outer uk-width-1-1">
      <div class="wallet-inner">
        <span uk-icon="icon: more; ratio: 3"></span>
        <p>Please connect to wallet</p>
      </div>
    </div-->
    <div class="uk-width-1-1">
      <hr />
      <div class="uk-inline form-icon">
        <div
          uk-form-custom="target: > button > span:first-child"
          style="padding-left: 0px; padding-right: 0px"
        >
          <a class="uk-form-icon uk-form-icon-flip input-form-icon">
            <span>CDP#</span>
          </a>
          <select
            v-model="cdp"
            aria-label="Custom controls"
            class="form-button uk-form-width-medium uk-form-large"
            @change="changeCDP"
            :disabled="!connected"
          >
            <option v-for="tokenId in tokenIds" :key="tokenId" :value="tokenId">
              {{ tokenId }}
            </option>
          </select>
          <button
            class="uk-button uk-button-grey form-button uk-form-width-medium uk-form-large uk-text-left"
            type="button"
            tabindex="-1"
            style="max-width: 100%"
          >
            <span></span>
            <span
              uk-icon="icon: chevron-down"
              style="float: right; position: relative; right: 95px; top: 17px"
            ></span>
          </button>
        </div>
      </div>
      <div class="wrap">
        <span class="icon-circle" uk-icon="icon: plus; ratio: 1;"></span>
      </div>

      <div class="uk-inline form-icon">
        <div
          uk-form-custom="target: > button > span:first-child"
          style="padding-left: 0px; padding-right: 0px"
        >
          <a class="uk-form-icon uk-form-icon-flip input-form-icon">
            <span>PDC#</span>
          </a>
          <select
            v-model="pdc"
            aria-label="Custom controls"
            class="form-button uk-form-width-medium uk-form-large"
            @change="changePDC"
            :disabled="!connected"
          >
            <option
              v-for="couponId in couponIds"
              :key="couponId"
              :value="couponId"
            >
              {{ couponId }}
            </option>
          </select>
          <button
            class="uk-button uk-button-grey form-button uk-form-width-medium uk-form-large uk-text-left"
            type="button"
            tabindex="-1"
            style="max-width: 100%"
          >
            <span></span>
            <span
              uk-icon="icon: chevron-down"
              style="float: right; position: relative; right: 95px; top: 17px"
            ></span>
          </button>
        </div>
      </div>
      <div class="wrap">
        <span class="icon-circle" uk-icon="icon: plus; ratio: 1;"></span>
      </div>

      <div class="uk-inline form-icon">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon"
          ><span>CDP#</span></a
        >
        <input
          readonly
          class="uk-input result-form uk-form-width-medium uk-form-large"
          type="number"
          v-model="formattedWETH"
        />
      </div>
      <hr />
      <button class="uk-button uk-button-default uk-button-large form-button">
        Annihilation
      </button>
    </div>
  </div>
</template>
