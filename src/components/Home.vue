<template>
  <div class="component">
    <h1>Trade of View your portfolio</h1>
    <p>You may save & load your data</p>
    <p>click on "End Day" to begin a new Day !</p>
    <hr />
    <h2>Your funds : {{ funds }}€</h2>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.fundsFormat;
    }
  }
};
</script>

<style scoped>
.component {
  width: 80%;
  margin: 30px auto 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
}

hr {
  color: #eee;
}
</style>
