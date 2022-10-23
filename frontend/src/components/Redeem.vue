<template>
  <div class="uk-width-1-1">
    <hr />
    <div class="uk-inline">
      <a
        class="uk-form-icon uk-form-icon-flip input-form-icon"
        href="#"
        uk-icon="icon: heart; ratio: 0.9;"
        ><span>FOX</span></a
      >
      <input
        class="uk-input input-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <div class="wrap">
      <span class="icon-circle" uk-icon="icon: arrow-down; ratio: 1.5;"></span>
    </div>
    <div class="uk-inline">
      <a
        class="uk-form-icon uk-form-icon-flip input-form-icon"
        href="#"
        uk-icon="icon: ethereum; ratio: 0.2;"
        ><span>BNB</span></a
      >
      <input readonly
        class="uk-input result-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <div class="wrap">
      <div class="uk-inline">
        <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
          ><span style="padding-right: 2px">LTV</span></a
        >
        <input
          class="uk-input input-form uk-form-width-medium uk-form-large"
          type="number"
        />
      </div>
    </div>
    <div class="description">
      <span style="font-weight: bold">EXCHANGE RATES</span>USDC: $1.000
    </div>
    <div class="wrap">
      <span class="icon-circle" uk-icon="plus"></span>
    </div>
    <div class="uk-inline">
      <a
        class="uk-form-icon uk-form-icon-flip input-form-icon"
        href="#"
        uk-icon="icon: happy; ratio: 0.9;"
        ><span>FOXS</span></a
      >
      <input readonly
        class="uk-input result-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <hr />
    <button class="uk-button uk-button-default uk-button-large form-button">Connect Wallet</button>
  </div>
</template>