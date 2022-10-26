import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";
import router from "./router";

const store = createStore({
  state() {
    return {
      carts: [],
      order: [],
      user:[],
    };
  },
  getters:{
    totalCost: state => {
        let total = 0;
        state.carts.forEach((cart) => (total += (cart.price * cart.quantity)));
        return total;
    },
    countCart: state => {return state.carts.length}
  },
  mutations: {
    addToCart(state, item) {
      let found = state.carts.find((cart) => cart.id == item.id);
      if (found) {
        found.quantity += item.quantity;
      } else {
        state.carts.push(item);
      }
    },
    addToCart2(state,item) {
      state.carts.push(...item);
    },
    deleteItem(state,item) {
      let index = state.carts.indexOf(item);
      state.carts.splice(index, 1);
    },
  },
});
createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
