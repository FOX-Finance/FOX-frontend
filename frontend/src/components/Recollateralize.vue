<template>
  <div class="uk-width-1-1">
    <hr />
    <div class="uk-inline">
      <a
        class="uk-form-icon uk-form-icon-flip input-form-icon"
        href="#"
        uk-icon="icon: ethereum; ratio: 0.2;"
        ><span>ETH</span></a
      >
      <input
        class="uk-input result-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <hr class="custom-divider-vertical" />
    <div class="description">
      EXCHANGE RATES<br />
      USDC logo USDC: $1.000<br />
      FXS logo FXS: $6.015<br />
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
    <div class="uk-inline">
      <a
        class="uk-form-icon uk-form-icon-flip input-form-icon"
        href="#"
        uk-icon="icon: ethereum; ratio: 0.2;"
        ><span>ETH</span></a
      >
      <input
        class="uk-input input-form uk-form-width-medium uk-form-large"
        type="number"
      />
    </div>
    <hr />
  </div>
</template>

<style scoped>
.description {
  font-size: 0.9rem;
}

.input-form,
.input-form:hover,
.input-form:active,
.input-form:focus {
  background-color: #f2f2f2;
  border-radius: 25px;
  padding: 20px;
}

.result-form,
.result-form:hover,
.result-form:active,
.result-form:focus {
  background-color: #ffe6bd;
  border-radius: 25px;
  padding: 20px;
}

.input-form-icon {
  background: rgba(255, 255, 255, 0.5);
}

.icon-circle {
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  border-radius: 500px;
  background: transparent;
  color: #000;
  vertical-align: middle;
  /* 1 */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease-in-out;
  transition-property: color, background-color;
  opacity: 0.5;
}

.wrap {
  padding: 10px;
}
</style>
