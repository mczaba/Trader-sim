export const loadingMixin = {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading;
    }
  }
};

export const editStock = {
  data() {
    return {
      editedStock: null,
      newName: ""
    };
  },
  methods: {
    editingStock(stock) {
      this.editedStock = stock;
      this.newName = stock.customName || stock.symbol;
    },
    resetEdit() {
      this.editedStock = null;
      this.newName = "";
    },
    keydown(event, stock) {
      if (event.key === "Enter") {
        this.changeName(stock);
      }
    },
    changeName(stock) {
      this.$store.dispatch("changeName", {
        symbol: stock.symbol,
        newName: this.newName
      });
      this.editedStock = null;
    }
  },
  updated: function() {
    this.$nextTick(function() {
      const nameInput = document.querySelector("#nameInput");
      if (nameInput) {
        nameInput.focus();
      }
    });
  }
};

export const activeStock = {
  data() {
    return {
      activeStock: null
    };
  },
  methods: {
    changeActiveStock(stock) {
      if (stock !== this.activeStock) {
        this.activeStock = null;
        setTimeout(() => (this.activeStock = stock), 1);
      }
    }
  }
};
