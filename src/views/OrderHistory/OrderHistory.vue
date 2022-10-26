<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>Your Orders</h4>
      </div>
    </div>
    <div class="row">
      <div
        v-for="order of orders"
        :key="order.id"
        class="col-md-6 col-xl-4 col-12 pt-3 d-flex"
      >
        <OrdersBox :order="order" />
      </div>
    </div>
  </div>
</template>
<script>
import OrdersBox from "../../components/OrdersBox";
export default {
  components: {OrdersBox},
  props: ["orders"],
};
</script>
