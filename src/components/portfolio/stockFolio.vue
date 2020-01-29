<template>
  <div class="container">
    <div class="header">
      <span>{{ name }} ({{ stock.symbol }})</span>
      <small>(price: {{ price }} | quantity: {{ stock.quantity }})</small>
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
    <div class="controls">
      <input type="number" placeholder="Quantity" v-model.number="quantity" />
      <button
        @click="sell"
        :disabled="
          quantity <= 0 ||
            !Number.isInteger(quantity) ||
            quantity > stock.quantity
        "
      >
        Sell
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
  methods: {
    sell() {
      this.$store.dispatch("sell", {
        price: this.price,
        quantity: this.quantity,
        symbol: this.stock.symbol
      });
      this.quantity = 0;
    }
  },
  created: function() {
    fetch(
      `https://api.worldtradingdata.com/api/v1/stock?symbol=${this.stock.symbol}&api_token=${process.env.VUE_APP_APIKEY}`
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
ul {
  list-style: none;
}
.container {
  width: 40%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #007bff3b;
  margin: 0 0 40px 0;
  .header {
    background-color: #007bff3b;
    color: #007bff;
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
  .controls {
    padding: 8px 10px 10px 10px;
    display: flex;
    justify-content: space-between;
    button {
      background-color: #dc3545;
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
        background-color: #dc354552;
        cursor: not-allowed;
      }
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
