<template>
  <div class="component">
    <stock-component
      v-for="stock in favorites"
      :key="stock"
      :stock="stock"
    ></stock-component>
  </div>
</template>

<script>
import stockComponent from "./stockFav.vue";

export default {
  computed: {
    favorites() {
      return this.$store.getters.favorites;
    }
  },
  components: {
    "stock-component": stockComponent
  }
};
</script>

<style lang="scss" scoped>
.component {
  width: 80%;
  margin: 80px auto 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
