<template>
  <div class="component">
    <div class="stocks container">
      <h1>Your Watch List</h1>
      <div class="stockList">
        <div
          class="stockContainer"
          v-for="stock in favorites"
          :key="stock"
          :class="{ active: stock === activeStock }"
          @click="changeActiveStock(stock)"
        >
          <h2>{{ stock }}</h2>
          <button @click.stop="removeFromFav(stock)">Unwatch</button>
        </div>
      </div>
    </div>
    <div class="actions container">
      <h1>Buy Stock</h1>
      <stock-buy :stock="activeStock" v-if="activeStock"></stock-buy>
    </div>
    <div class="details container">
      <h1>Stock Details</h1>
      <stock-details :stock="activeStock" v-if="activeStock"></stock-details>
    </div>
  </div>
</template>

<script>
import stockDetails from "./subComponents/details.vue";
import stockBuy from "./subComponents/stockBuy.vue";

export default {
  data() {
    return {
      activeStock: null
    };
  },
  computed: {
    favorites() {
      return this.$store.getters.favorites;
    }
  },
  methods: {
    changeActiveStock(stock) {
      this.activeStock = null;
      setTimeout(() => (this.activeStock = stock), 1);
    },
    removeFromFav(stock) {
      this.$store.commit("removeFromFav", stock);
    }
  },
  components: {
    stockDetails,
    stockBuy
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
  margin-bottom: 30px;
}
.component {
  width: 60%;
  margin: 120px auto 0 auto !important;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 170px 410px;
  grid-gap: 20px;
}

.container {
  background-color: var(--background-secondary);
  border-radius: 10px;
  padding: 25px 15px;
}
.stockList {
  height: calc(100% - 76px);
  overflow: auto;
}
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

.active {
  background-color: var(--background-secondary-active);
  border: none;
  border-radius: 8px;
  & + .stockContainer {
    border-top: 1px solid var(--borders);
  }
}

.stocks {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.actions {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.details {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
</style>
