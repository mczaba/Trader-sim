<template>
  <div class="component">
    <h1 class="summary container">Your Portfolio</h1>
    <div class="stocks container">
      <h1>Stocks</h1>
      <div class="stockList">
        <div
          class="stockContainer"
          v-for="stock in owned"
          :key="stock.symbol"
          :class="{ active: stock === activeStock }"
          @click="changeActiveStock(stock)"
        >
          <h2>
            <span v-if="stock !== editedStock">{{
              stock.customName || stock.symbol
            }}</span>
            <input
              type="text"
              v-model="newName"
              v-else
              @keydown="keydown($event, stock)"
              id="nameInput"
            />
            x
            {{ stock.quantity }}
          </h2>
          <button
            @click.stop="editingStock(stock)"
            v-if="stock !== editedStock"
          >
            Edit Name
          </button>
          <button
            @click.stop="changeName(stock)"
            v-else
            v-click-outside="resetEdit"
          >
            Save Name
          </button>
        </div>
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
import { editStock } from "../assets/mixins";

export default {
  data() {
    return {
      activeStock: null
    };
  },
  mixins: [editStock],
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
    stockSell
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
  margin-bottom: 30px;
}

input {
  background-color: inherit;
  color: inherit;
  border: none;
  border-bottom: 2px solid var(--borders);
  width: 150px;
  height: 40px;
  line-height: 40px;
  font-size: 25px;
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
