<template>
  <div class="uk-width-1-1">
    <hr />
    <div class="uk-inline form-icon">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><img src="../img/foxs-icon.png" style="width: 20px" /><span>FOXS</span></a
      >
      <input
        class="uk-input input-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <div class="description">
      <span style="font-weight: bold">EXCHANGE RATES</span>USDC: $1.000
    </div>
    <hr class="custom-divider-vertical" />
    <div class="description">
      <span style="font-weight: bold">EXCHANGE RATES</span><br />
      USDC: $1.000<br />
      FXS: $6.015<br />
      FRAX 0.3000% <br />
      SWAP FEE (0.00000 USDC)
    </div>
    <div class="wrap">
      <span
        class="icon-circle"
        uk-icon="icon: arrow-down; ratio: 2;"
        style="margin-left: -1px"
      ></span>
    </div>
    <div class="uk-inline form-icon">
      <a class="uk-form-icon uk-form-icon-flip input-form-icon" href="#"
        ><img src="../img/sin-icon.png" style="width: 20px" /><span>NIS</span></a
      >
      <input
        readonly
        class="uk-input result-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <hr />
    <button class="uk-button uk-button-default uk-button-large form-button">
      Connect Wallet
    </button>
  </div>
</template>
