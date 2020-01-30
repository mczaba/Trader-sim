<template>
  <div class="component">
    <div id="summary" class="container">
      <h1>Your Portfolio</h1>
    </div>
    <div id="stocks" class="container">
      <h1>Your stocks</h1>
      <div id="stockList">
        <div
          class="stockContainer"
          v-for="stock in owned"
          :key="stock.symbol"
          :class="{ active: stock === activeStock }"
          @click="changeActiveStock(stock)"
        >
          <h2>{{ stock.symbol }} x {{ stock.quantity }}</h2>
        </div>
      </div>
    </div>
    <div id="actions" class="container">
      <h1>Sell Stock</h1>
      <stock-sell :stock="activeStock" v-if="activeStock"></stock-sell>
    </div>
    <div id="details" class="container">
      <h1>Stock Details</h1>
      <stock-details
        :stock="activeStock.symbol"
        v-if="activeStock"
      ></stock-details>
    </div>
  </div>
</template>

<script>
import stockDetails from "./details.vue";
import stockSell from "./stockSell.vue";

export default {
  data() {
    return {
      activeStock: null
    };
  },
  computed: {
    owned() {
      return this.$store.getters.owned;
    }
  },
  methods: {
    changeActiveStock(stock) {
      this.activeStock = null;
      setTimeout(() => (this.activeStock = stock), 1);
    }
  },
  components: {
    stockDetails,
    stockSell
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
  margin-bottom: 40px;
  font-size: 45px;
  color: var(--text-headers);
}
.component {
  width: 60%;
  margin: 80px auto 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 100px 200px 400px;
  grid-gap: 20px;
}

.container {
  background-color: var(--background-secondary);
  border-radius: 10px;
  padding: 25px 15px;
}
#stockList {
  height: calc(100% - 76px);
  overflow: auto;
}
.stockContainer {
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

#summary {
  grid-column: 1/ 3;
  grid-row: 1 / 2;
}

#stocks {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
}

#actions {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

#details {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
</style>
