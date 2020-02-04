<template>
  <div class="component">
    <h1 class="summary container">Your Watch List</h1>
    <div class="stocks container">
      <h1>Stocks</h1>
      <div class="stockList" v-if="favorites.length > 0">
        <stock-component
          v-for="stock in favorites"
          :key="stock.symbol"
          :class="{ active: stock === activeStock }"
          @click.native="changeActiveStock($event, stock)"
          :stock="stock"
        >
        </stock-component>
      </div>
      <h2 v-else>There are no stocks in your watch list</h2>
    </div>
    <div class="actions container">
      <h1>Buy Stock</h1>
      <stock-buy :stock="activeStock.symbol" v-if="activeStock"></stock-buy>
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
import stockBuy from "./subComponents/stockBuy.vue";
import stockComponent from "./subComponents/stockWatch.vue";
import { activeStock } from "../assets/mixins";

export default {
  mixins: [activeStock],
  computed: {
    favorites() {
      return this.$store.getters.favorites;
    }
  },
  components: {
    stockDetails,
    stockBuy,
    stockComponent
  },
  mounted() {
    this.activeStock = this.favorites[0];
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
  min-width: 975px;
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

@media screen and (max-width: 975px) {
  .component {
    width: 100%;
    min-width: 0;
    grid-template-columns: auto;
    grid-template-rows: 170px 410px 600px;
    margin: 0;
  }

  .stocks {
    grid-column: 1/ 2;
    grid-row: 3/4;
    border: none;
  }
  .actions {
    grid-column: 1/ 2;
    grid-row: 1/2;
    border: none;
    border-bottom: 1px solid var(--borders);
  }
  .details {
    grid-column: 1/ 2;
    grid-row: 2/3;
    border: none;
    border-bottom: 1px solid var(--borders);
  }
  .summary {
    display: none;
  }
}
</style>
