<template>
  <div class="dropdown-container" v-click-outside="hide">
    <p
      class="button"
      :class="{ dropdownActive: showDropdown }"
      @click="show"
      v-if="!username"
    >
      Account ▾
    </p>
    <p
      v-if="username"
      @click="show"
      class="button"
      :class="{ dropdownActive: showDropdown }"
    >
      {{ username }} ▾
    </p>
    <div class="dropdown" @click="hide" v-if="showDropdown && !username">
      <router-link to="/signup" class="link">Sign Up</router-link>
      <router-link to="/login" class="link">Log In</router-link>
    </div>
    <div class="dropdown" @click="hide" v-if="showDropdown && username">
      <p @click="save">Save</p>
      <p @click="logout">Logout</p>
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
  right: 0;
  background-color: var(--background-secondary);
  border-bottom-left-radius: 8px;
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
</style>
