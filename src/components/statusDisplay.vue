<template>
  <div :class="{ active: message }">
    <transition name="fade">
      <h2 v-if="message">
        {{ message }}
      </h2>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters.message;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 35px;
  text-align: center;
  background-color: var(--background-main);
}
.active {
  background-color: var(--button);
}
h2 {
  color: white;
  margin: 0;
  line-height: 35px;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
