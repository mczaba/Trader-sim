<template>
  <div id="app">
    <navbar></navbar>
    <status-display id="statusDisplay"></status-display>
    <router-view id="view"></router-view>
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
  },
  created() {
    this.$store.dispatch("updateRate");
    fetch(`${process.env.VUE_APP_API_ADRESS}`, {
      mode: "cors"
    });
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  min-height: 100vh;
  height: 100%;
  text-align: center;
  --text-color: #fff;
  --text-error: red;
  --text-active: #ef5466;
  --text-headers: #ef5466;
  --headings-color: #fff;
  --background-main: #121216;
  --background-secondary: #23232d;
  --background-secondary-active: #191922;
  --background-tertiary: #2d2d3a;
  --borders: #32323d;
  --button: #ef5466;
  background-color: var(--background-main);
  color: var(--text-color);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

#view {
  margin-top: 30px;
}

button {
  background-color: var(--button);
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: white;
  &::-moz-focus-inner {
    border: 0;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:active {
    opacity: 0.7;
  }
}

h1 {
  font-size: 45px;
  color: var(--text-headers);
}
</style>
