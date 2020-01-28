<template>
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
          v-if="!authUsername"
        >
          Account ▼
        </p>
        <p v-if="authUsername" @click.stop="show" class="button">
          {{ authUsername }}▼
        </p>
        <div
          class="dropdown"
          v-click-outside="hide"
          @click="hide"
          v-if="showDropdown && !authUsername"
        >
          <router-link to="/signup" class="link">Sign Up</router-link>
          <router-link to="/login" class="link">Log In</router-link>
        </div>
        <div
          class="dropdown"
          v-click-outside="hide"
          @click="hide"
          v-if="showDropdown && authUsername"
        >
          <p @click="save">Save</p>
          <p @click="logout">Logout</p>
        </div>
      </div>
      <p id="funds">Funds : {{ funds }}€</p>
    </div>
  </nav>
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
    },
    authUsername() {
      return this.$store.getters.username;
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
    save() {
      this.$store.dispatch("save");
    },
    logout() {
      this.$store.commit("logOut");
      this.$store.commit("reset");
      this.$store.dispatch("setStatus", {
        message: "Successfully logged out",
        status: "success"
      });
      this.$router.push("/");
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
  margin-bottom: 0;
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
  display: flex;
  flex-direction: column;
  .link,
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
