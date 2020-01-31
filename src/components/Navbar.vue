<template>
  <nav>
    <div class="flex-container" id="left-side">
      <router-link to="/" class="link" active-class="active" exact
        >Home</router-link
      >
      <router-link to="/portfolio" class="link" active-class="active"
        >Portfolio</router-link
      >
      <router-link to="/watch-list" class="link" active-class="active"
        >Watch List</router-link
      >
      <router-link to="/search" class="link" active-class="active"
        >Search stock</router-link
      >
    </div>
    <div class="flex-container" id="right-side">
      <p id="funds">Funds : {{ funds }}€</p>
      <p>1€ = {{ rate }}$</p>
      <div class="dropdown-container">
        <p
          class="button"
          :class="{ dropdownActive: showDropdown }"
          @click.stop="show"
          v-if="!authUsername"
        >
          Account ▾
        </p>
        <p
          v-if="authUsername"
          @click.stop="show"
          class="button"
          :class="{ dropdownActive: showDropdown }"
        >
          {{ authUsername }} ▾
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
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false
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
      this.$router.push("/");
    }
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
  border-bottom: 1px solid var(--borders);
  background-color: var(--background-secondary);
  margin-bottom: 0;
}
.flex-container {
  display: flex;
  justify-content: stretch;
  align-items: flex-start;
  width: 25%;
  p {
    line-height: 50px;
    width: 150px;
    flex-grow: 1;
  }
  .button {
    cursor: pointer;
    border-bottom: 1px solid var(--borders);
    flex-grow: 1;
  }
  .dropdownActive {
    background-color: var(--background-secondary);
    border-bottom: 2px solid var(--text-active);
  }

  a {
    line-height: 50px;
  }
}
.link {
  font-weight: bold;
  text-decoration: none;
  flex-grow: 1;
  color: var(--text-color);
  &:visited {
    color: var(--text-color);
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: var(--background-secondary);
  }
}
.active {
  color: var(--text-active) !important;
  border-bottom: 2px solid var(--text-active);
}

.dropdown {
  background-color: var(--background-secondary);
  border-bottom-left-radius: 8px;

  box-shadow: #eee;
  width: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .link,
  p {
    line-height: 2em;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color: var(--background-secondary-active);
    }
  }
}
</style>
