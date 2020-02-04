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

export const activeStock = {
  data() {
    return {
      activeStock: null
    };
  },
  methods: {
    changeActiveStock(event, stock) {
      if (
        !(event.target.tagName === "BUTTON" || event.target.tagName === "INPUT")
      ) {
        if (stock !== this.activeStock) {
          this.activeStock = null;
          setTimeout(() => (this.activeStock = stock), 1);
        }
      }
    }
  }
};

export const editStock = {
  data() {
    return {
      editing: false,
      newName: ""
    };
  },
  methods: {
    editingStock() {
      this.editing = true;
      this.newName = this.stock.customName || this.stock.symbol;
    },
    resetEdit(event) {
      const nameInput = document.querySelector("#nameInput");
      if (event.target !== nameInput) {
        this.editing = false;
        this.newName = "";
      }
    },
    keydown(event) {
      if (event.key === "Enter") {
        this.changeName();
      }
    },
    changeName() {
      this.$store.dispatch("changeName", {
        symbol: this.stock.symbol,
        newName: this.newName
      });
      this.editing = false;
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
