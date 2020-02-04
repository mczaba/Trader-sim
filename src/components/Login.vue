<template>
  <div>
    <form action="" method="POST" @submit.prevent="submit">
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
      <img src="/load.svg" alt="" width="80px" v-else />
    </form>
  </div>
</template>

<script>
import { loadingMixin } from "../assets/mixins";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null
    };
  },
  mixins: [loadingMixin],
  methods: {
    submit() {
      this.toggleLoading();
      fetch(`${process.env.VUE_APP_API_ADRESS}/users/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
        .then(response => response.json())
        .then(response => {
          this.toggleLoading();
          if (response.message) {
            this.error = response.message;
          } else {
            this.$store.commit("logIn", {
              token: response.token,
              username: response.username
            });
            this.$router.push("/");
            this.$store.dispatch("load");
            this.error = null;
          }
        })
        .catch(() => {
          this.toggleLoading();
          this.$store.dispatch(
            "setStatus",
            "Couldn't sign up : can't reach the server"
          );
        });
    }
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

@media screen and (max-width: 975px) {
  form {
    margin-top: 150px;
  }
}
</style>
