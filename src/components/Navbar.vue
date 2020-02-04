<template>
  <nav>
    <div class="flex-container" id="left-side">
      <router-link to="/" class="link" active-class="active" exact
        >Home</router-link
      >
      <router-link to="/portfolio" class="link" active-class="active"
        >Portfolio</router-link
      >
      <router-link to="/watch-list" class="link" active-class="active"
        >Watch List</router-link
      >
      <router-link to="/search" class="link" active-class="active"
        >Search Stock</router-link
      >
    </div>
    <div class="flex-container" id="right-side">
      <p id="funds">Funds : {{ fundsFormat }}€</p>
      <p>1€ = {{ rate }}$</p>
      <account-menu></account-menu>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import accountMenu from "./subComponents/AccountMenu.vue";

export default {
  data() {
    return {
      showDropdown: false
    };
  },
  components: {
    accountMenu
  },
  computed: {
    ...mapGetters(["fundsFormat", "rate", "username"])
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
nav {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  border-bottom: 1px solid var(--borders);
  background-color: var(--background-secondary);
  margin-bottom: 0;
}
.flex-container {
  display: flex;
  justify-content: stretch;
  align-items: flex-start;
  width: 480px;
  p {
    line-height: 50px;
    width: 150px;
    flex-grow: 1;
  }
  .button {
    cursor: pointer;
    flex-grow: 1;
  }

  a {
    line-height: 50px;
  }
}
.link {
  font-weight: bold;
  text-decoration: none;
  flex-grow: 1;
  color: var(--text-color);
  &:visited {
    color: var(--text-color);
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: var(--background-secondary);
  }
}
.active {
  color: var(--text-active) !important;
  border-bottom: 2px solid var(--text-active);
}
</style>
