<template>
  <div class="details">
    <transition name="fade">
      <ul class="info" v-if="display">
        <li>Name: {{ name }}</li>
        <li>Symbol: {{ stock }}</li>
        <li>Current price: {{ price }}{{ currency }}</li>
        <li v-if="dayHigh !== 'N/A'">Day High: {{ dayHigh }}{{ currency }}</li>
        <li v-if="dayLow !== 'N/A'">Day Low: {{ dayLow }}{{ currency }}</li>
        <li>
          Last 24 hours :
          <span class="green" :class="{ red: absoluteDayChange < 0 }"
            >{{ absoluteDayChange }}{{ currency }}</span
          >
        </li>
        <li>
          Last 24 hours :
          <span class="green" :class="{ red: absoluteDayChange < 0 }"
            >{{ pctDayChange }}%</span
          >
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: false,
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
        this.display = true;
      });
  }
};
</script>

<style lang="scss" scoped>
.details {
  margin: 0;
  h1 {
    margin: 0;
    font-size: 45px;
    color: var(--text-active);
  }
}

ul {
  text-align: left;
  list-style: none;
  padding: 0;
  margin-top: 30px;
  li {
    margin: 8px 0;
    font-size: 24px;
  }
}

.green {
  color: #28a745;
}
.red {
  color: var(--text-error);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
