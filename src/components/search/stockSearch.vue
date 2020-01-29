<template>
  <div class="container">
    <div class="header flex-container">
      <div>
        <span>{{ stock.name }} ({{ stock.symbol }})</span>
        <small>(price: {{ stock.price }}{{ stock.currency }})</small>
      </div>
      <button @click="addToFav" :disabled="isInFavorites">
        {{ favoriteButtonText }}
      </button>
    </div>
    <div class="controls flex-container">
      <input type="number" placeholder="Quantity" v-model.number="quantity" />
      <p class="total" :class="{ red: tooExpensive }">
        Total : {{ totalPrice }}€
      </p>
      <button
        @click="buy"
        :disabled="quantity <= 0 || !Number.isInteger(quantity) || tooExpensive"
      >
        Buy
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0
    };
  },
  props: ["stock"],
  computed: {
    totalPrice() {
      if (this.stock.currency === "USD") {
        return (
          Math.round(
            (this.quantity * this.stock.price * 100) / this.$store.getters.rate
          ) / 100
        );
      }
      return this.quantity * this.stock.price;
    },
    tooExpensive() {
      if (this.totalPrice > this.$store.getters.getFunds) {
        return true;
      }
      return false;
    },
    isInFavorites() {
      return this.$store.getters.favorites.includes(this.stock.symbol);
    },
    favoriteButtonText() {
      if (this.isInFavorites) {
        return "Already in favorites";
      }
      return "Add to favorites";
    }
  },
  methods: {
    buy() {
      this.$store.dispatch("buy", {
        price: this.stock.price,
        quantity: this.quantity,
        symbol: this.stock.symbol
      });
      this.quantity = 0;
    },
    addToFav() {
      this.$store.commit("addToFavorites", { symbol: this.stock.symbol });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: white;
  &::-moz-focus-inner {
    border: 0;
  }
  &:disabled {
    background-color: #28a74552;
    cursor: not-allowed;
  }
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  width: 40%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #28a7453b;
  margin: 0 0 40px 0;
  text-align: left;

  .header {
    background-color: #28a7453b;
    color: #28a745;
    padding: 10px;
    span {
      font-weight: bold;
      margin-right: 0.5em;
    }
  }
  .controls {
    padding: 8px 10px 10px 10px;
    input {
      height: 30px;
      width: 120px;
    }
    p {
      margin: 0;
      height: 20px;
      line-height: 20px;
    }
  }
}
.total {
  padding-left: 15px;
  margin: 0;
  color: #28a745;
}
.red {
  color: #dc3545;
}
</style>
