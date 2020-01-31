<template>
  <div class="component">
    <div class="summary container">
      <h1>Search Stock</h1>
      <div class="inputContainer">
        <input
          type="text"
          v-model="searchTerm"
          @keydown="keydown"
          placeholder="search stock"
        />
        <button @click="search">search</button>
      </div>
    </div>
    <div class="stocks container">
      <h1>Result</h1>
      <img src="/load.gif" alt="" v-if="loading" />
      <div v-else>
        <div class="stockList" v-if="!error">
          <div
            class="stockContainer"
            v-for="stock in resultsArray"
            :key="stock.symbol"
            :class="{ active: stock === activeStock }"
            @click="changeActiveStock(stock)"
          >
            <h2>{{ stock.symbol }} ({{ stock.name }})</h2>
            <button
              :disabled="isInFavorites(stock)"
              @click.stop="addToFav(stock)"
            >
              {{ favoriteButtonText(stock) }}
            </button>
          </div>
          <h2 v-if="notFound">No stock found for you research</h2>
        </div>
        <h2 v-else>{{ error }}</h2>
      </div>
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

export default {
  data() {
    return {
      searchTerm: "",
      resultsArray: [],
      notFound: false,
      activeStock: null,
      error: null
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    changeActiveStock(stock) {
      this.activeStock = null;
      setTimeout(() => (this.activeStock = stock), 1);
    },
    search() {
      this.$store.commit("toggleLoading");
      fetch(`${process.env.VUE_APP_API_ADRESS}/API/search/${this.searchTerm}`)
        .then(response => response.json())
        .then(response => {
          this.$store.commit("toggleLoading");
          this.resultsArray.splice(0, this.resultsArray.length);
          if (!response.data) {
            this.error = "couldn't fetch data from the API";
          } else {
            if (response.data.length < 1) {
              this.notFound = true;
            } else {
              this.notFound = false;
              response.data.forEach(item => {
                const itemFilter = {
                  name: item.name,
                  symbol: item.symbol
                };
                this.resultsArray.push(itemFilter);
              });
            }
          }
        })
        .catch(() => {
          this.$store.commit("toggleLoading");
          this.error = "couldn't fetch data from the API";
        });
      // const url = `https://api.worldtradingdata.com/api/v1/stock_search?search_term=${this.searchTerm}&api_token=${process.env.VUE_APP_APIKEY}&currency=EUR,USD`;
      // fetch(url, { mode: "cors" })
      //   .then(response => response.json())
      // .then(response => {
      //   this.$store.commit("toggleLoading");
      //   this.resultsArray.splice(0, this.resultsArray.length);
      //   if (response.data.length < 1) {
      //     this.notFound = true;
      //   } else {
      //     this.notFound = false;
      //     response.data.forEach(item => {
      //       const itemFilter = {
      //         name: item.name,
      //         symbol: item.symbol
      //       };
      //       this.resultsArray.push(itemFilter);
      //     });
      //   }
      // })
      // .catch(() => {
      //   this.$store.commit("toggleLoading");
      //   this.error = "couldn't fetch data from the API";
      // });
    },
    keydown(event) {
      if (event.key === "Enter") {
        this.search();
      }
    },
    isInFavorites(currentStock) {
      const index = this.$store.getters.favorites
        .map(stock => stock.symbol)
        .indexOf(currentStock.symbol);
      if (index < 0) {
        return false;
      }
      return true;
    },
    favoriteButtonText(currentStock) {
      if (this.isInFavorites(currentStock)) {
        return "Watched";
      }
      return "Watch";
    },
    addToFav(currentStock) {
      this.$store.commit("addToFavorites", currentStock.symbol);
      this.$store.dispatch(
        "setStatus",
        `${currentStock.symbol} has been added to your watch list`
      );
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

input {
  color: var(--text-color);
  background-color: var(--background-main);
  border: none;
  flex-grow: 1;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 10px;
}
.component {
  width: 60%;
  margin: 40px auto 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 170px 170px 410px;
  grid-gap: 20px;
}

.container {
  background-color: var(--background-secondary);
  border-radius: 10px;
  padding: 25px 15px;
}

.inputContainer {
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  height: 37px;
  width: 30%;
  margin: auto;
  button {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
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
}

.stocks {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
}

.actions {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.details {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
</style>