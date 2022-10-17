<template>
  <div class="uk-width-1-1 inline-block">
    <div class="uk-card uk-card-default">
      <div class="uk-padding">
        <div>
          <span class="token-icon" uk-icon="heart"></span>
          <span class="token-name">Carl</span>
          <br />
          <div class="uk-card-badge uk-label uk-label-wide uk-background-mint">
            4 Remain
          </div>
          <span class="borrow-price">$24.2439<br /></span>
          <hr />
          <span class="borrow-text">Description<br /></span>
          <span
            >I am an open mind blockchain & web engineer who is preparing for new
            challenges. <br />I spent most of my career at a blockchain company,<br />and
            now I'm mastering the trending blockchain technologies. <br />I like to work
            with great people, inspire others, and be inspired.</span
          >
          <hr />
          <span class="borrow-text">Funding Rate</span>
          <span class="uk-align-right borrow-text">25%</span>
          <div class="gray-bar margin-top-10">
            <div class="primary-bar" style="height: 20px; width: 25%"></div>
          </div>
        </div>
        <div class="uk-child-width-expand@s uk-text-center" uk-grid>
          <div>
            <div class="uk-card uk-card-default uk-card-body uk-work-card">
              <div class="uk-card-badge uk-label uk-background-mint">2 Remain</div>
              <br />
              ERC20
              <br />
              spend 100 Carl
            </div>
          </div>
          <div>
            <div class="uk-card uk-card-default uk-card-body uk-work-card">
              <div class="uk-card-badge uk-label uk-background-danger">1 Remain</div>
              <br />
              ERC721
              <br />
              spend 100 Carl
            </div>
          </div>
          <div>
            <div class="uk-card uk-card-default uk-card-body uk-work-card">
              <div class="uk-card-badge uk-label uk-background-danger">1 Remain</div>
              <br />
              ERC1155
              <br />
              spend 110 Carl
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gray-bar {
  background-color: gainsboro;
}
.primary-bar {
  background-color: #1e87f0;
}
.uk-card {
  margin-top: 20px;
}
.uk-card-default {
  border-radius: 25px;
  opacity: 0.7;
}
.section {
  padding-top: 0px;
}
.uk-label-wide {
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
}
.uk-work-card {
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -ms-transition: all 0.4s;
  -o-transition: all 0.4s;
  margin-bottom: 0;
}

.uk-work-card:hover {
  transform: scale(1.08, 1.08);
  opacity: 1;
}
</style>
