<template>
  <div class="component">
    <div class="searchBar">
      <input type="text" v-model="searchTerm" @keydown="keydown" />
      <button @click="search">Search</button>
    </div>
    <div class="flex-container">
      <stock
        v-for="stock in resultsArray"
        :key="stock.symbol"
        :stock="stock"
      ></stock>
      <h1 v-if="notFound">Couldn't find any stock for you research</h1>
    </div>
  </div>
</template>

<script>
import stock from "./stockSearch.vue";

export default {
  data() {
    return {
      searchTerm: "",
      resultsArray: [],
      notFound: false
    };
  },
  methods: {
    search() {
      const url = `https://api.worldtradingdata.com/api/v1/stock_search?search_term=${this.searchTerm}&api_token=${process.env.VUE_APP_APIKEY}&currency=EUR,USD`;
      fetch(url, { mode: "cors" })
        .then(response => response.json())
        .then(response => {
          this.resultsArray.splice(0, this.resultsArray.length);
          if (response.data.length < 1) {
            this.notFound = true;
          } else {
            this.notFound = false;
            response.data.forEach(item => {
              const itemFilter = {
                name: item.name,
                symbol: item.symbol,
                price: item.price,
                currency: item.currency
              };
              this.resultsArray.push(itemFilter);
            });
          }
        });
    },
    keydown(event) {
      if (event.key === "Enter") {
        this.search();
      }
    }
  },
  components: {
    stock
  }
};
</script>

<style lang="scss" scoped>
.component {
  width: 80%;
  margin: 80px auto 0 auto;
  .searchBar {
    height: 35px;
    input {
      height: 100%;
      width: 300px;
      margin-right: 15px;
    }
    button {
      height: 100%;
      background-color: #28a745;
      color: white;
      border: none;
      font-weight: bold;
      border-radius: 5px;
    }
  }
  .flex-container {
    margin: 40px auto 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
