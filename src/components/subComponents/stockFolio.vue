<template>
  <div class="stockContainer">
    <h2>
      <span v-if="!editing">{{ stock.customName || stock.symbol }}</span>
      <input
        type="text"
        v-model="newName"
        v-else
        @keydown="keydown"
        id="nameInput"
      />
      x
      {{ stock.quantity }}
    </h2>
    <button @click="editingStock" v-if="!editing">
      Edit Name
    </button>
    <button @click="changeName" v-click-outside="resetEdit" v-else>
      Save Name
    </button>
  </div>
</template>

<script>
import { editStock } from "../../assets/mixins";

export default {
  mixins: [editStock],
  props: ["stock"]
};
</script>

<style lang="scss" scoped>
.stockContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-secondary);
  height: 80px;
  width: calc(100% - 30px);
  margin: auto;
  text-align: left;
  padding: 0 15px 0 15px;
  border-bottom: 1px solid var(--borders);
  cursor: pointer;
  h2 {
    line-height: 80px;
    margin: 0;
  }
  &:last-child {
    border: none;
  }
  &:hover {
    background-color: var(--background-secondary-active);
    border: none;
    border-radius: 8px;
    & + .stockContainer {
      border-top: 1px solid var(--borders);
    }
  }
}

input {
  background-color: inherit;
  color: inherit;
  border: none;
  border-bottom: 2px solid var(--borders);
  width: 150px;
  height: 40px;
  line-height: 40px;
  font-size: 25px;
}
</style>
