<template>
  <h1 v-if="LoggedInName">
    Congratulations {{ LoggedInName }} your account is now created
  </h1>
  <div v-else>
    <h1>sign up</h1>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
    </p>
    <h2 v-if="servError">{{ servError }}</h2>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <form action="" method="POST" @submit.prevent="checkForm">
      <label for="username">username: </label>
      <input type="text" name="username" v-model="username" />
      <br />
      <br />
      <label for="email">Email: </label>
      <input type="email" name="email" v-model="email" />
      <br />
      <br />
      <label for="password">Password: </label>
      <input type="password" name="password" v-model="password" />
      <br />
      <br />
      <label for="passwordConf">Confirm Password: </label>
      <input type="password" name="passwordConf" v-model="passwordConf" />
      <br />
      <br />
      <input type="submit" value="submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConf: "",
      errors: []
    };
  },
  computed: {
    LoggedInName() {
      return this.$store.getters.username;
    },
    servError() {
      return this.$store.getters.signError;
    }
  },
  methods: {
    checkForm() {
      let send = true;
      this.errors.splice(0, this.errors.length);
      if (this.username.length < 4) {
        this.errors.push("username is too short");
        send = false;
      }
      if (!this.validateMail(this.email)) {
        this.errors.push("Email field is not a valid email");
        send = false;
      }
      if (this.password.length < 6) {
        this.errors.push("password needs to be at least 6 characters long");
        send = false;
      }
      if (!this.validatePassword(this.password)) {
        this.errors.push(
          "password needs to contain letters and numbers and not whitespace"
        );
        send = false;
      }
      if (this.password !== this.passwordConf) {
        this.errors.push("passwords don't match");
        send = false;
      }
      if (send) {
        this.$store.dispatch("signUp", {
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConf: this.password
        });
      }
    },
    validateMail(email) {
      const reg = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
      return reg.test(email);
    },
    validatePassword(password) {
      return (
        /\d/.test(password) && /[a-zA-Z]/.test(password) && !/\s/.test(password)
      );
    }
  },
  destroyed() {
    this.$store.commit("setSignError", null);
  }
};
</script>
