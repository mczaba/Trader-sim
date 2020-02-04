<template>
  <div class="dropdown-container" v-click-outside="hide">
    <p class="button" :class="{ dropdownActive: showDropdown }" @click="show">
      Navigation ▾
    </p>
    <div class="dropdown" @click="hide" v-if="showDropdown">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showDropdown: false
    };
  },
  computed: {
    ...mapGetters(["username"])
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
  line-height: 50px;
}
.dropdown-container {
  width: 150px;
}
.dropdownActive {
  background-color: var(--background-secondary);
  border-bottom: 2px solid var(--text-active);
}

.button {
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 52px;
  left: 0;
  background-color: var(--background-secondary);
  border-bottom-right-radius: 8px;
  width: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--borders);
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
}
</style>
