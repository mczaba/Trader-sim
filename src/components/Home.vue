<template>
  <div class="component">
    <div v-if="username">
      <h1>Welcome back {{ username }}</h1>
      <hr />
      <h2>Your current funds : {{ funds }}€</h2>
    </div>
    <div v-else>
      <h1>Welcome to the stock trader simulator</h1>
      <p>
        Here you can search for stocks using real time stock market value, buy
        and sell them and add them to a watch list. Try to make as much money as
        you can !
      </p>
      <p>
        You can use the app freely without an account, but to save your data you
        will need to sign up
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.fundsFormat;
    },
    username() {
      return this.$store.getters.username;
    }
  }
};
</script>

<style scoped>
.component {
  width: 80%;
  margin: 30px auto 0 auto;
  border-radius: 10px;
  padding: 20px;
  background-color: var(--background-secondary);
}

hr {
  color: #eee;
}
</style>
