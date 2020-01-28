<template>
  <div>
    <h1>Login</h1>
    <h2 v-if="error">{{ error }}</h2>
    <form
      action="http://localhost:50/users/login"
      method="POST"
      @submit.prevent="submit"
    >
      <label for="username">Username:</label>
      <input type="text" name="username" v-model="username" />
      <br /><br />
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" />
      <br /><br />
      <input type="submit" value="Log In" />
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
    }
  },
  methods: {
    submit() {
      this.$store.commit("setStatus", {
        message: "Logging in...",
        status: "pending"
      });
      this.$store.dispatch("logIn", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
