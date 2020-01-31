<template>
  <div id="stockSell" v-if="!loading">
    <div v-if="!error">
      <div id="input">
        <button @click="remove">-</button>
        <input type="number" v-model="sellQuantity" @keydown="keydown" />
        <button @click="add">+</button>
      </div>
      <span>{{ totalPrice }}€</span>
      <button :disabled="sellQuantity > stock.quantity" @click="sell">
        Sell
      </button>
    </div>
    <h2 v-else>{{ error }}</h2>
  </div>
  <img src="/load.gif" alt="" width="40px" v-else />
</template>

<script>
export default {
  data() {
    return {
      sellQuantity: 0,
      price: 0,
      currency: null,
      error: null
    };
  },
  props: ["stock"],
  computed: {
    totalPrice() {
      if (this.currency === "USD") {
        return (
          Math.round(
            (this.sellQuantity * this.price * 100) / this.$store.getters.rate
          ) / 100
        );
      }
      return this.sellQuantity * this.price;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    sell() {
      if (this.sellQuantity === this.stock.quantity) {
        this.$emit("soldOut");
      }
      this.$store.dispatch("sell", {
        symbol: this.stock.symbol,
        price: this.price,
        quantity: this.sellQuantity
      });
    },
    keydown(event) {
      if (event.key === "Enter") {
        this.sell();
      }
    },
    add() {
      if (!(this.sellQuantity >= this.stock.quantity)) {
        this.sellQuantity += 1;
      }
    },
    remove() {
      if (!(this.sellQuantity <= 0)) {
        this.sellQuantity -= 1;
      }
    }
  },
  created: function() {
    this.$store.commit("toggleLoading");
    fetch(
      `https://api.worldtradingdata.com/api/v1/stock?symbol=${this.stock.symbol}&api_token=${process.env.VUE_APP_APIKEY}`
    )
      .then(response => response.json())
      .then(response => {
        this.price = response.data[0].price;
        this.currency = response.data[0].currency;
        this.$store.commit("toggleLoading");
      })
      .catch(() => {
        this.$store.commit("toggleLoading");
        this.error = "couldn't fetch price from the API";
      });
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
  color: var(--text-error);
}
#stockSell {
  display: flex;
  justify-content: space-between;
  height: 40px;

  span {
    line-height: 40px;
  }
}

#input {
  width: 60px;
  display: flex;
  input {
    width: 20px;
    background-color: var(--background-secondary-active);
    color: var(--text-color);
    border: none;
    padding: 10px;
    text-align: center;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    border-top: 1px solid var(--borders);
    border-bottom: 1px solid var(--borders);
  }
  button {
    background-color: var(--background-secondary-active);
    width: 60px;
    border: 1px solid var(--borders);
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:active {
      background-color: var(--background-secondary);
    }
  }
}

.green {
  color: #28a745;
}
.red {
  color: #dc3545;
}
</style>
