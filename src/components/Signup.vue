<template>
  <h1 v-if="LoggedInName" style="text-align: center">
    Congratulations {{ LoggedInName }} your account is now created
  </h1>
  <div v-else>
    <validation-observer v-slot="{ handleSubmit }">
      <form
        action=""
        method="POST"
        @submit.prevent="handleSubmit(checkForm)"
        novalidate
      >
        <h1>Sign Up</h1>
        <p v-if="servError" class="serverError">{{ servError }}</p>
        <transition name="slide">
          <p class="label" v-if="username">username</p>
        </transition>
        <validation-provider rules="min:4|required" v-slot="{ errors }">
          <input
            type="text"
            name="username"
            v-model="username"
            class="forminput"
            placeholder="username"
          />
          <br />
          <small v-for="error in errors" :key="error" class="error">{{
            error
          }}</small>
        </validation-provider>
        <br />
        <br />
        <transition name="slide">
          <p class="label" v-if="email">email</p>
        </transition>
        <validation-provider rules="email|required" v-slot="{ errors }">
          <input
            type="email"
            name="email"
            v-model="email"
            class="forminput"
            placeholder="email"
          />
          <br />
          <small v-for="error in errors" :key="error" class="error">{{
            error
          }}</small>
        </validation-provider>
        <br />
        <br />
        <transition name="slide">
          <p class="label" v-if="password">password</p>
        </transition>
        <validation-observer>
          <validation-provider
            name="password"
            rules="min:6|password|required"
            v-slot="{ errors }"
          >
            <input
              type="password"
              name="password"
              v-model="password"
              class="forminput"
              placeholder="password"
            />
            <br />
            <small v-for="error in errors" :key="error" class="error">{{
              error
            }}</small>
          </validation-provider>
          <br />
          <br />
          <transition name="slide">
            <p class="label" v-if="passwordConf">confirm password</p>
          </transition>
          <validation-provider
            name="passwordconf"
            rules="required|passwordconf:@password"
            v-slot="{ errors }"
          >
            <input
              type="password"
              name="passwordConf"
              v-model="passwordConf"
              class="forminput"
              placeholder="confirm password"
            />
            <br />
            <small v-for="error in errors" :key="error" class="error">{{
              error
            }}</small>
          </validation-provider>
        </validation-observer>
        <br />

        <input type="submit" value="Sign Up" class="button" v-if="!loading" />
        <img src="/load.gif" alt="" width="80px" v-else />
      </form>
    </validation-observer>
  </div>
</template>

<script>
import {
  ValidationProvider,
  extend,
  ValidationObserver,
  setInteractionMode
} from "vee-validate";
import { required } from "vee-validate/dist/rules";

setInteractionMode("eager");

extend("min", {
  validate(value, args) {
    if (value.length >= args.length) {
      return true;
    }
    return `Must be at least ${args.length} characters long`;
  },
  params: ["length"]
});

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", value => {
  const reg = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  if (reg.test(value)) {
    return true;
  }
  return "must be a valid email";
});

extend("password", value => {
  if (/\d/.test(value) && /[a-zA-Z]/.test(value) && !/\s/.test(value)) {
    return true;
  }
  return "Must contain letters and numbers";
});

extend("passwordconf", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Must match password"
});

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConf: ""
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    LoggedInName() {
      return this.$store.getters.username;
    },
    servError() {
      return this.$store.getters.signError;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    checkForm() {
      this.$store.dispatch("signUp", {
        username: this.username,
        email: this.email,
        password: this.password,
        passwordConf: this.password
      });
    }
  },
  destroyed() {
    this.$store.commit("setSignError", null);
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 400px;
  margin: auto;
}
h1 {
  margin-bottom: 30px;
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
  float: left;
}

.serverError {
  margin-bottom: 25px;
  margin-top: 5px;
  color: var(--text-error);
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
