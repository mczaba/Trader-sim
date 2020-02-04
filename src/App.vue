<template>
  <div id="app">
    <navbar v-if="!mobileView"></navbar>
    <mobile-navbar v-else id="navbar"></mobile-navbar>
    <status-display id="statusDisplay"></status-display>
    <router-view id="view"></router-view>
  </div>
</template>

<script>
import navbar from "./components/Navbar.vue";
import mobileNavbar from "./components/NavbarMobile.vue";
import statusDisplay from "./components/statusDisplay.vue";

export default {
  name: "app",
  components: {
    navbar,
    mobileNavbar,
    statusDisplay
  },
  data() {
    return { windowWidth: window.innerWidth };
  },
  computed: {
    mobileView() {
      return this.windowWidth < 975;
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  created() {
    this.$store.dispatch("updateRate");
    if (this.$store.getters.token) {
      fetch(`${process.env.VUE_APP_API_ADRESS}/users/refresh`, {
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.$store.getters.token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => {
          this.$store.commit("logIn", {
            token: response.token,
            username: response.username
          });
          this.$store.dispatch("load");
        })
        .catch(() => {
          this.$store.dispatch(
            "setStatus",
            "Couldn't log in : can't reach the server"
          );
        });
    } else {
      fetch(`${process.env.VUE_APP_API_ADRESS}`, {
        mode: "cors"
      });
    }
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
  --text-headers: #fff;
  --background-main: #121216;
  --background-secondary: #23232d;
  --background-secondary-active: #191922;
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
  font-size: 35px;
  color: var(--text-headers);
}

input {
  outline: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

@media screen and (max-width: 975px) {
  #navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }

  #statusDisplay {
    position: fixed;
    top: 82px;
    z-index: 2;
  }

  #view {
    margin-top: 90px;
  }
}
</style>
