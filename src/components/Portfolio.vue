<template>
  <div class="component">
    <h1 class="summary container">Your Portfolio</h1>
    <div class="stocks container">
      <h1>Stocks</h1>
      <div class="stockList">
        <stock-component
          v-for="stock in owned"
          :key="stock.symbol"
          :class="{ active: stock === activeStock }"
          @click.native="changeActiveStock(stock)"
          :stock="stock"
        >
        </stock-component>
      </div>
    </div>
    <div class="actions container">
      <h1>Sell Stock</h1>
      <stock-sell
        :stock="activeStock"
        v-if="activeStock"
        @soldOut="soldOut"
      ></stock-sell>
    </div>
    <div class="details container">
      <h1>Stock Details</h1>
      <stock-details
        :stock="activeStock.symbol"
        v-if="activeStock"
      ></stock-details>
    </div>
  </div>
</template>

<script>
import stockDetails from "./subComponents/details.vue";
import stockSell from "./subComponents/stockSell.vue";
import stockComponent from "./subComponents/stockFolio.vue";

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
      if (stock !== this.activeStock) {
        this.activeStock = null;
        setTimeout(() => (this.activeStock = stock), 1);
      }
    },
    soldOut() {
      this.activeStock = null;
    }
  },
  components: {
    stockDetails,
    stockSell,
    stockComponent
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
  margin: 40px auto 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 100px 170px 410px;
  border: 1px solid var(--borders);
  border-radius: 10px;
  overflow: hidden;
}

.container {
  background-color: var(--background-secondary);
  padding: 25px 15px;
}
.stockList {
  height: calc(100% - 76px);
  overflow: auto;
}

.active {
  background-color: var(--background-secondary-active);
  border: none;
  border-radius: 8px;
  & + .stockContainer {
    border-top: 1px solid var(--borders);
  }
}

.summary {
  grid-column: 1/ 3;
  grid-row: 1 / 2;
  border-bottom: 1px solid var(--borders);
  margin: 0;
}

.stocks {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
  border-right: 1px solid var(--borders);
}

.actions {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  border-bottom: 1px solid var(--borders);
}

.details {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
</style>
