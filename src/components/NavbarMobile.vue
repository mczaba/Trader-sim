<template>
  <div>
    <nav>
      <nav-menu></nav-menu>
      <account-menu></account-menu>
    </nav>
    <div class="infos">
      <p id="funds">Funds : {{ fundsFormat }}€</p>
      <p>1€ = {{ rate }}$</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import accountMenu from "./subComponents/AccountMenu.vue";
import navMenu from "./subComponents/NavMenu.vue";

export default {
  components: {
    accountMenu,
    navMenu
  },
  computed: {
    ...mapGetters(["fundsFormat", "rate", "username"])
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0 15px;
}

nav {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  border-bottom: 1px solid var(--borders);
  background-color: var(--background-secondary);
  margin-bottom: 0;
  p {
    line-height: 50px;
  }
}

.infos {
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--borders);
  background-color: var(--background-secondary);
  margin-bottom: 0;
}
</style>
