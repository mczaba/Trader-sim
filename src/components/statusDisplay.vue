<template>
  <div>
    <transition name="fade">
      <h2
        v-if="message"
        :class="{
          red: status === 'error',
          green: status === 'success',
          blue: status === 'pending'
        }"
      >
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
    },
    status() {
      return this.$store.getters.status;
    }
  }
};
</script>

<style lang="scss" scoped>
.red {
  background-color: #dc3545;
}
.green {
  background-color: #28a745;
}
.blue {
  background-color: rgb(56, 67, 168);
}
div {
  width: 100%;
  height: 35px;
  margin-bottom: 100px;
}
h2 {
  color: white;
  margin: 0;
  line-height: 35px;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
