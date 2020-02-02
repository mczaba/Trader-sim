<template>
  <div class="stockContainer">
    <h2>{{ stock.symbol }} ({{ stock.name }})</h2>
    <button :disabled="isInFavorites" @click.stop="addToFav">
      {{ favoriteButtonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["stock"],
  computed: {
    isInFavorites() {
      const index = this.$store.getters.favorites
        .map(stock => stock.symbol)
        .indexOf(this.stock.symbol);
      if (index < 0) {
        return false;
      }
      return true;
    },
    favoriteButtonText() {
      if (this.isInFavorites) {
        return "Watched";
      }
      return "Watch";
    }
  },
  methods: {
    addToFav() {
      this.$store.dispatch("addToFavorites", { symbol: this.stock.symbol });
      this.$store.dispatch(
        "setStatus",
        `${this.stock.symbol} has been added to your watch list`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.stockContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-secondary);
  height: 80px;
  width: calc(100% - 30px);
  margin: auto;
  text-align: left;
  padding: 0 15px 0 15px;
  border-bottom: 1px solid var(--borders);
  cursor: pointer;
  h2 {
    line-height: 80px;
    margin: 0;
  }
  &:last-child {
    border: none;
  }
  &:hover {
    background-color: var(--background-secondary-active);
    border: none;
    border-radius: 8px;
    & + .stockContainer {
      border-top: 1px solid var(--borders);
    }
  }
}
</style>
