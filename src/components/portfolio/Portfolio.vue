<template>
  <div class="component">
    <stock-component
      v-for="stock in owned"
      :key="stock.symbol"
      :stock="stock"
    ></stock-component>
  </div>
</template>

<script>
import stockComponent from "./stockFolio.vue";

export default {
  computed: {
    owned() {
      return this.$store.getters.owned;
    }
  },
  components: {
    "stock-component": stockComponent
  }
};
</script>

<style scoped>
.component {
  width: 80%;
  margin: 80px auto 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
