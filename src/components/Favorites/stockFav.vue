<template>
  <div class="container">
    <div class="header flex-container">
      <div>
        <span>{{ name }} ({{ stock }}) </span>
        <small>(price: {{ price }}{{ currency }})</small>
      </div>
      <button @click="removeFromFav">
        Remove from favorites
      </button>
    </div>
    <ul class="info">
      <li v-if="dayHigh !== 'N/A'">Day High: {{ dayHigh }}{{ currency }}</li>
      <li v-if="dayLow !== 'N/A'">Day Low: {{ dayLow }}{{ currency }}</li>
      <li class="green" :class="{ red: absoluteDayChange < 0 }">
        {{ absoluteDayChange }}{{ currency }}
      </li>
      <li class="green" :class="{ red: absoluteDayChange < 0 }">
        {{ pctDayChange }}%
      </li>
    </ul>
    <div class="controls flex-container">
      <input type="number" placeholder="Quantity" v-model.number="quantity" />
      <p class="green" :class="{ red: tooExpensive }">
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
      quantity: 0,
      price: 0,
      dayHigh: 0,
      dayLow: 0,
      absoluteDayChange: 0,
      pctDayChange: 0,
      name: "",
      currency: ""
    };
  },
  props: ["stock"],
  computed: {
    totalPrice() {
      if (this.currency === "USD") {
        return (
          Math.round(
            (this.quantity * this.price * 100) / this.$store.getters.rate
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
    }
  },
  methods: {
    buy() {
      this.$store.commit("buy", {
        price: this.price,
        quantity: this.quantity
      });
      this.$store.commit("addStock", {
        symbol: this.stock,
        quantity: this.quantity
      });
      this.quantity = 0;
    },
    removeFromFav() {
      this.$store.commit("removeFromFav", this.stock);
    }
  },
  created: function() {
    fetch(
      `https://api.worldtradingdata.com/api/v1/stock?symbol=${this.stock}&api_token=${process.env.VUE_APP_APIKEY}`
    )
      .then(response => response.json())
      .then(response => {
        this.price = response.data[0].price;
        this.dayHigh = response.data[0].day_high;
        this.dayLow = response.data[0].day_low;
        this.name = response.data[0].name;
        this.absoluteDayChange =
          response.data[0].day_change > 0
            ? `+${response.data[0].day_change}`
            : response.data[0].day_change;
        this.pctDayChange =
          response.data[0].change_pct > 0
            ? `+${response.data[0].change_pct}`
            : response.data[0].change_pct;
        this.currency = response.data[0].currency;
      });
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  height: 20px;
  line-height: 20px;
}
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

ul {
  list-style: none;
}
.container {
  width: 40%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #28a7453b;
  margin: 0 0 40px 0;
  .header {
    background-color: #28a7453b;
    color: #28a745;
    padding: 10px;
    text-align: left;
    span {
      font-weight: bold;
      margin-right: 0.5em;
    }
  }
  .info {
    text-align: left;
    padding: 8px 10px 0px 10px;
  }
  .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .controls {
    padding: 8px 10px 10px 10px;

    input {
      height: 30px;
      width: 120px;
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
