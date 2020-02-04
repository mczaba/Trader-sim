<template>
  <div class="component">
    <div class="summary container" :class="{ round: !firstSearch }">
      <h1>Search Stock</h1>
      <div class="inputContainer">
        <input
          type="text"
          v-model="searchTerm"
          @keydown="keydown"
          placeholder="Search stock"
        />
        <button @click="search">Search</button>
      </div>
    </div>
    <div class="stocks container" v-if="firstSearch">
      <h1>Results</h1>
      <img src="/load.gif" alt="" v-if="loading" />
      <div v-else>
        <div class="stockList" v-if="!error">
          <stock-component
            v-for="stock in resultsArray"
            :key="stock.symbol"
            :class="{ active: stock === activeStock }"
            @click.native="changeActiveStock($event, stock)"
            :stock="stock"
          ></stock-component>
        </div>
        <h2 v-else>{{ error }}</h2>
      </div>
    </div>
    <div class="actions container" v-if="firstSearch">
      <h1>Buy Stock</h1>
      <stock-buy :stock="activeStock.symbol" v-if="activeStock"></stock-buy>
    </div>
    <div class="details container" v-if="firstSearch">
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
import stockComponent from "./subComponents/stockSearch.vue";
import { loadingMixin, activeStock } from "../assets/mixins";

export default {
  data() {
    return {
      searchTerm: "",
      resultsArray: [],
      firstSearch: false,
      error: null
    };
  },
  mixins: [loadingMixin, activeStock],
  methods: {
    search() {
      this.toggleLoading();
      this.firstSearch = true;
      fetch(`${process.env.VUE_APP_API_ADRESS}/API/search/${this.searchTerm}`, {
        mode: "cors"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.toggleLoading();
          this.resultsArray.splice(0, this.resultsArray.length);
          this.activeStock = null;
          if (!response.data) {
            this.error = response.message;
          } else if (response.data.length < 1) {
            this.error = "No results found for your research";
          } else {
            this.notFound = false;
            response.data.forEach(item => {
              const itemFilter = {
                name: item.name,
                symbol: item.symbol
              };
              this.resultsArray.push(itemFilter);
            });
            this.activeStock = this.resultsArray[0];
          }
        })
        .catch(() => {
          this.toggleLoading();
          this.error = "an error occured trying to reach the API";
        });
    },
    keydown(event) {
      if (event.key === "Enter") {
        this.search();
      }
    }
  },
  components: {
    stockDetails,
    stockBuy,
    stockComponent
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
  font-size: 15px;
  background-color: var(--background-secondary);
  border: none;
  border-bottom: 1px solid var(--borders);
  flex-grow: 1;
  padding-left: 10px;
}
.component {
  width: 60%;
  min-width: 975px;
  margin: 40px auto 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 170px 170px 410px;
  border-radius: 10px;
  overflow: hidden;
}

.container {
  background-color: var(--background-secondary);
  padding: 25px 15px;
}

.inputContainer {
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  height: 37px;
  width: 30%;
  min-width: 335px;
  margin: auto;
  button {
    margin-left: 15px;
  }
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
  border: 1px solid var(--borders);
}
.round {
  border-radius: 10px;
}

.stocks {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
  border-right: 1px solid var(--borders);
  border-left: 1px solid var(--borders);
  border-bottom: 1px solid var(--borders);
}

.actions {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  border-bottom: 1px solid var(--borders);
  border-right: 1px solid var(--borders);
}

.details {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  border-right: 1px solid var(--borders);
  border-bottom: 1px solid var(--borders);
}

@media screen and (max-width: 975px) {
  .component {
    width: 100%;
    min-width: 0;
    grid-template-columns: auto;
    grid-template-rows: 170px 550px 170px 410px;
    margin: 0;
  }

  .stocks {
    grid-column: 1/ 2;
    grid-row: 2/3;
    border: none;
    border-bottom: 1px solid var(--borders);
  }
  .actions {
    grid-column: 1/ 2;
    grid-row: 3/4;
    border: none;
    border-bottom: 1px solid var(--borders);
  }
  .details {
    grid-column: 1/ 2;
    grid-row: 4/5;
    border: none;
  }
  .summary {
    grid-column: 1/ 2;
    grid-row: 1/2;
    border: none;
    border-bottom: 1px solid var(--borders);
  }
}
</style>
