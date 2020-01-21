<template>
  <h1 v-if="userCreated">{{ message }}</h1>
  <div v-else>
    <h1>sign up</h1>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
    </p>
    <h2 v-if="message.length > 0">{{ message }}</h2>
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
      errors: [],
      userCreated: false,
      message: ""
    };
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
        console.log("form validated");
        fetch("http://localhost:5000/users/signup", {
          mode: "cors",
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            passwordConf: this.passwordConf
          })
        })
          .then(response => {
            if (response.status === 200) {
              this.userCreated = true;
            }
            return response.json();
          })
          .then(response => {
            this.message = response.message;
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
  }
};
</script>
