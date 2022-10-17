<template>
  <div class="uk-width-1-1">
    <div class="uk-width-1-1">
      <div class="logo">FOX Finance</div>
    </div>
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-center">
        <div class="menu">
          <ul class="uk-navbar-nav">
            <li class="uk-active"><a href="#">Mint&Redeem</a></li>
            <li><a href="#">Buyback&Recollateralize</a></li>
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
}

.uk-navbar-nav > li > a {
  font-family: "Fredoka One", cursive;
  font-size: 1rem;
  min-height: 40px;
}

.menu {
    padding: 10px;
}
</style>
