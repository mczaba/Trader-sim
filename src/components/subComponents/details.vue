<template>
  <div class="details" v-if="!loading">
    <transition name="fade">
      <ul class="info" v-if="!error">
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
      <h2 v-else>{{ error }}</h2>
    </transition>
  </div>
  <img src="/load.gif" alt="" width="60px" v-else />
</template>

<script>
export default {
  data() {
    return {
      price: 0,
      dayHigh: 0,
      dayLow: 0,
      absoluteDayChange: 0,
      pctDayChange: 0,
      name: "",
      currency: "",
      error: null
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  props: ["stock"],
  created: function() {
    this.$store.commit("toggleLoading");
    fetch(`${process.env.VUE_APP_API_ADRESS}/API/details/${this.stock}`, {
      mode: "cors"
    })
      .then(response => response.json())
      .then(response => {
        if (!response.data) {
          this.error = "couldn't fetch data from the API";
        } else {
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
          this.$store.commit("toggleLoading");
        }
      })
      .catch(() => {
        this.$store.commit("toggleLoading");
        this.error = "couldn't fetch data from the API";
      });
  }
};
</script>

<style lang="scss" scoped>
.details {
  margin: 0;
}
img {
  margin-top: 85px;
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
