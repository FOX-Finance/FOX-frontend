<template>
  <div>
    <!-- Nav Bar (Interactive) -->
    <nav
      id="nav-bar-sm"
      class="uk-navbar-container uk-navbar-transparent padding-right"
      uk-navbar
    >
      <div class="uk-navbar-right">
        <a
          class="uk-navbar-toggle"
          uk-navbar-toggle-icon
          href="#offcanvas-slide"
          uk-toggle
          style="padding-top:15px;"
        ></a>
      </div>
      <div class="uk-navbar-center">
        <div id="nav-title-sm" class="uk-navbar-center">
          <div class="uk-width-1-1">
            <div class="logo">
              F<img src="../img/logo.png" style="height: 28px; margin-bottom: 7px" />X
              Finance
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Offcanvas Menu -->
    <div id="offcanvas-slide" uk-offcanvas>
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <ul class="uk-nav uk-nav-default uk-padding-small offcanvas-menu">
          <li uk-toggle="#offcanvas-slide">
            <RouterLink to="/">
              <div class="uk-button uk-button-text">Mint&Redeem</div>
            </RouterLink>
          </li>
          <li uk-toggle="#offcanvas-slide">
            <RouterLink to="/buyback">
              <div class="uk-button uk-button-text uk-text-left">Buyback<br/>&recollateralize</div>
            </RouterLink>
          </li>
          <li uk-toggle="#offcanvas-slide">
            <RouterLink to="/coupon">
              <div class="uk-button uk-button-text">Coupon</div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div id="nav-menu" class="uk-width-1-1">
      <div class="uk-width-1-1">
        <div class="logo">
          F<img src="../img/logo.png" style="height: 28px; margin-bottom: 7px" />X Finance
        </div>
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
              <li>
                <RouterLink to="/coupon">
                  <div class="uk-button uk-button-text">Coupon</div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: inline-block;
  font-family: "Fredoka One", cursive;
  font-size: 2rem;
  color: rgb(72, 73, 58);
  margin-top: 15px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 70px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 14px 25px rgba(0, 0, 0, 0);
  /* animation: color-change 5s infinite; */
}

@keyframes color-change {
  0% {
    color: #fd1892;
  }
  25% {
    color: #2c90fc;
  }
  50% {
    color: #b8fd33;
  }
  75% {
    color: #fec837;
  }
  100% {
    color: #fd1892;
  }
}

.uk-offcanvas-bar {
  width: 70vw;
}

.uk-offcanvas-bar {
  background-color: rgb(72, 73, 58);
}

.offcanvas-menu {
  font-family: "Fredoka One", cursive;
}

.uk-navbar-nav > li > a {
  font-family: "Fredoka One", cursive;
  font-size: 1rem;
  min-height: 40px;
}

.uk-button-text {
  color: rgb(189, 189, 185);
}

#offcanvas-slide .router-link-active,
#offcanvas-slide .router-link-active .uk-button-text {
  color: white;
}

#nav-menu .router-link-active,
#nav-menu .router-link-active .uk-button-text {
  color: rgb(72, 73, 58);
}

.menu {
  padding-bottom: 10px;
}
</style>
