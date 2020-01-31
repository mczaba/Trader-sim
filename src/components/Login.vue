<template>
  <div>
    <form
      action="http://localhost:50/users/login"
      method="POST"
      @submit.prevent="submit"
    >
      <h1>Login</h1>
      <p v-if="error" class="error">{{ error }}</p>
      <transition name="slide">
        <p class="label" v-if="username">username</p>
      </transition>
      <input
        type="text"
        name="username"
        v-model="username"
        class="forminput"
        placeholder="username"
      />
      <br /><br />
      <transition name="slide">
        <p class="label" v-if="password">password</p>
      </transition>
      <input
        type="password"
        name="password"
        placeholder="password"
        v-model="password"
        class="forminput"
      />
      <br /><br />
      <input type="submit" value="Log In" class="button" v-if="!loading" />
      <img src="/load.gif" alt="" width="80px" v-else />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    error() {
      return this.$store.getters.logError;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("logIn", {
        username: this.username,
        password: this.password
      });
    }
  },
  destroyed() {
    this.$store.commit("setLogError", null);
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 400px;
  margin: auto;
}
.forminput {
  border: none;
  border-bottom: 1px solid #888;
  color: #888;
  background-color: var(--background-main);
  padding-bottom: 5px;
  font-size: 16px;
  width: 100%;
  &:focus {
    border-bottom: 2px solid var(--text-color);
    color: var(--text-color);
  }
}
.error {
  color: var(--text-error);
  margin-bottom: 25px;
}

.label {
  position: absolute;
  font-size: 12px;
  margin: 0;
  transform: translateY(-15px);
  color: #777;
}

.button {
  background-color: var(--button);
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: white;
  &::-moz-focus-inner {
    border: 0;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s ease;
}
.slide-enter {
  transform: translateY(2px);
  font-size: 16px;
}
.slide-leave-to {
  transform: translateY(2px);
  font-size: 16px;
}
</style>
