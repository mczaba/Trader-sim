<template>
  <div id="app">
    <navbar></navbar>
    <status-display></status-display>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from "./components/Navbar.vue";
import statusDisplay from "./components/statusDisplay.vue";

export default {
  name: "app",
  components: {
    navbar,
    statusDisplay
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  min-height: 100vh;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
