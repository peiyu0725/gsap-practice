<template>
  <div id="app">
    <v-icon class="bars-icon" @click.stop="drawer = !drawer">mdi-menu</v-icon>
    <v-navigation-drawer v-model="drawer" app temporary>
      <!-- Issue: 用 Vue Router 跳轉的話 ObServer 會有問題，所以先用 href -->
      <v-list>
        <v-list-item link href="/">
          <v-list-item-content>
            <v-list-item-title>ScrollTrigger Demo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/obServer"> 
          <v-list-item-content>
            <v-list-item-title>ObServer Demo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
<style lang="sass">
html
  overflow-y: auto
  height: 100vh
#app
  font-family: "Cormorant Garamond", serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
body
  margin: 0
  padding: 0
  width: 100vw
  .v-navigation-drawer
    background-color: #0000007d !important
    padding: 53px 0
    .v-list-item
      color: #fff !important
      &__title
        font-size: 1.2rem !important
        font-weight: 600 !important
  .bars-icon
    z-index: 5
    position: fixed !important
    top: 10px
    left: 16px
    cursor: pointer
    color: #fff !important
    font-size: 36px !important
</style>
