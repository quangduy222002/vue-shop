<template>
  <Navbar />
  <router-view
    v-if="products.length > 0 && orders.length > 0"
    style="min-height: 60vh"
    :baseURL="baseURL"
    :category="category"
    :orders="orders"
    :order="order"
    @getData="getData"
  >
  </router-view>
</template>

<script>
import axios from "axios";
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      baseURL: "https://6358c490c27556d289436c4e.mockapi.io/",
      products: [],
      orders: [],
      order: [],
      users: [],
      categorys:[]
    };
  },
  methods: {
    async getData() {
      await axios
        .get(`${this.baseURL}category`)
        .then((response) => (this.categorys = response.data))
        .catch((err) => console.log("err", err));
      await axios
        .get(`${this.baseURL}cart`)
        .then((response) => {
          this.orders = response.data;
          this.order = this.orders.find((order) => order.paid === false );
          if (this.order !== undefined) {
            this.$store.commit("addToCart2", this.order.items);
          } 
        })
        .catch((err) => console.log("err", err));
      await axios
        .get(`${this.baseURL}user`)
        .then((response) => (this.users = response.data))
        .catch((err) => console.log("err", err));
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
