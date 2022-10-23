<template>
  <div class="uk-width-1-1">
    <div class="uk-width-1-1">
      <div class="logo">F<img src="../img/logo.png" style="height: 28px; margin-bottom: 7px;">X Finance</div>
    </div>
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-center">
        <div class="menu">
          <ul class="uk-navbar-nav">
            <li>
              <RouterLink to="/">
                <div class="uk-button uk-button-text">Mint&Redeem</div>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/buyback">
                <div class="uk-button uk-button-text">Buyback&recollateralize</div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.logo {
  display: inline-block;
  font-family: "Fredoka One", cursive;
  font-size: 2rem;
  color: rgb(72, 73, 58);
  margin-top: 40px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 70px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.uk-navbar-nav > li > a {
  font-family: "Fredoka One", cursive;
  font-size: 1rem;
  min-height: 40px;
}

.uk-button-text {
  color: rgb(189, 189, 185);
}

.router-link-active,
.router-link-active > .uk-button-text {
  color: rgb(72, 73, 58);
}

.menu {
  padding: 10px;
}
</style>
