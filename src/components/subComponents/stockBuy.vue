<template>
  <div id="stockbuy" v-if="!loading">
    <div id="input">
      <button @click="remove">-</button>
      <input type="number" v-model="buyQuantity" @keydown="keydown" />
      <button @click="add">+</button>
    </div>
    <span :class="{ red: tooExpensive }">{{ totalPrice }}€</span>
    <button :disabled="totalPrice > funds" @click="buy">
      buy
    </button>
  </div>
  <img src="/load.gif" alt="" width="40px" v-else />
</template>

<script>
export default {
  data() {
    return {
      buyQuantity: 0,
      price: 0,
      currency: null
    };
  },
  props: ["stock"],
  computed: {
    totalPrice() {
      if (this.currency === "USD") {
        return (
          Math.round(
            (this.buyQuantity * this.price * 100) / this.$store.getters.rate
          ) / 100
        );
      }
      return this.buyQuantity * this.price;
    },
    funds() {
      return this.$store.getters.getFunds;
    },
    tooExpensive() {
      if (this.totalPrice > this.funds) {
        return true;
      }
      return false;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    buy() {
      this.$store.dispatch("buy", {
        symbol: this.stock,
        price: this.price,
        quantity: this.buyQuantity
      });
      this.buyQuantity = 0;
    },
    keydown(event) {
      if (event.key === "Enter") {
        this.buy();
      }
    },
    add() {
      if (!(this.totalPrice + this.price > this.funds)) {
        this.buyQuantity += 1;
      }
    },
    remove() {
      if (!(this.buyQuantity <= 0)) {
        this.buyQuantity -= 1;
      }
    }
  },
  created: function() {
    this.$store.commit("toggleLoading");
    fetch(
      `https://api.worldtradingdata.com/api/v1/stock?symbol=${this.stock}&api_token=${process.env.VUE_APP_APIKEY}`
    )
      .then(response => response.json())
      .then(response => {
        this.price = Number(response.data[0].price);
        this.currency = response.data[0].currency;
        this.$store.commit("toggleLoading");
      });
  }
};
</script>

<style lang="scss" scoped>
#stockbuy {
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

.red {
  color: red;
}
</style>
