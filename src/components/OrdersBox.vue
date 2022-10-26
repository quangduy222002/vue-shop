<template>
  <div class="card h-100 w-100">
    <div class="card-title"><b>ITEM YOU BUY</b></div>
    <div v-for="item in items" :key="item.id">
      <li>{{ item.name }} x {{ item.quantity }} : ${{ item.price }}</li>
    </div>
    <div class="card-body">
      <h5 class="card-title">Date: {{ order.createdAt.slice(0, 10) }}</h5>
      <p class="card-text"><b>Total:</b> ${{ order.total }}</p>
      <p class="card-text">
        <b id="status">Status:</b>
        <a v-if="order.paid">PAID</a
        ><a v-else
          >PAY BY CASH
          <a href="#status" @click="confirmPaid(order.id)">Confirm Paid</a></a
        >
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "OrdersBox",
  props: ["order"],
  data() {
    return {
      items: this.order.items,
      baseURL: "https://63452b03dcae733e8feb11d2.mockapi.io/api/",
    };
  },
  methods: {
    confirmPaid(id) {
      axios
        .put(`${this.baseURL}cart/${id}`, {
          paid: true,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$router.go(0);
          }
        });
    },
  },
};
</script>
<style scoped>
.card-img-top {
  object-fit: cover;
}
a {
  text-decoration: none;
}
.card-title {
  color: #484848;
}
</style>
