<template>
  <div>
    <nav>
      <div class="flex-container" id="left-side">
        <router-link to="/" class="link" active-class="active" exact
          >Home</router-link
        >
        <router-link to="/portfolio" class="link" active-class="active"
          >Portfolio</router-link
        >
        <router-link to="/favorites" class="link" active-class="active"
          >Favorites</router-link
        >
        <router-link to="/search" class="link" active-class="active"
          >Search stock</router-link
        >
      </div>
      <div class="flex-container" id="right-side">
        <p>1€ = {{ rate }}$</p>
        <div class="dropdown-container">
          <p
            class="button"
            @click.stop="show"
            :style="{ backgroundColor: color }"
          >
            Save & load ▼
          </p>
          <div class="dropdown" v-click-outside="hide" v-if="showDropdown">
            <p @click="save">Save data</p>
            <p @click="load">Load data</p>
          </div>
        </div>
        <p id="funds">Funds : {{ funds }}€</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      color: "#f9f6f6"
    };
  },
  computed: {
    funds() {
      return this.$store.getters.fundsFormat;
    },
    rate() {
      return this.$store.getters.rate;
    }
  },
  methods: {
    hide() {
      this.showDropdown = false;
      this.color = "#f9f6f6";
    },
    show() {
      this.showDropdown = true;
      this.color = "#eee";
    },
    endDay() {
      this.$store.commit("changePrices");
    },
    save() {
      fetch("/api", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.$store.state)
      });
    },
    load() {
      fetch("/api")
        .then(response => response.json())
        .then(response => {
          this.$store.commit("setFunds", response.funds.funds);
          this.$store.commit("setStock", {
            BMW: response.owned.BMW,
            Google: response.owned.Google,
            Twitter: response.owned.Twitter,
            Apple: response.owned.Apple
          });
          this.$store.commit("setPrices", {
            BMW: response.prices.BMWPrice,
            Google: response.prices.GooglePrice,
            Twitter: response.prices.TwitterPrice,
            Apple: response.prices.ApplePrice
          });
        });
    }
  },
  created() {
    this.$store.dispatch("updateRate");
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
nav {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  border-bottom: 1px solid #acacac;
  background-color: #f9f6f6;
}
.flex-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 25%;
  p {
    line-height: 50px;
    width: 150px;
  }
  .button {
    cursor: pointer;
  }

  a {
    line-height: 50px;
  }

  #funds {
    font-weight: bold;
  }
}
.link {
  // border: 1px solid #acacac;
  font-weight: bold;
  color: black;
  opacity: 0.6;
  text-decoration: none;
  &:visited {
    text-decoration: none;
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
}
.active {
  opacity: 1;
}

.dropdown {
  border: 1px solid #eee;
  border-radius: 2px;
  box-shadow: #eee;
  width: 150px;
  overflow: hidden;
  p {
    line-height: 2em;
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
