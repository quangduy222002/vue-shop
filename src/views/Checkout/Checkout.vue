<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">
          Checkout
        </h3>
      </div>
    </div>

    <div
      v-for="item in items"
      :key="item.id"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
              {{ item.name }}
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">
            $ {{ item.price }} per unit
          </p>
          <p class="mb-0" style="float:left">
            Quantity:{{ item.quantity }}
          </p>
        </div>
        <p class="mb-0" style="float:right">
          Total:
          <span class="font-weight-bold">
            $ {{ item.price * item.quantity }}
          </span>
        </p>
        <br />
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>

    <div class="total-cost pt-2 text-right">
      <h5>Total : ${{ totalCost }}</h5>
      <button type="button" class="btn btn-secondary confirm" @click="goToCart">
        Cancel
      </button>
      <span>&nbsp;</span>
      <button type="button" class="btn btn-primary confirm" @click="payment">
        Payment
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
  props: ["baseURL", "order"],
  data() {
    return {
      items: this.$store.state.carts,
      totalCost: this.$store.getters.totalCost,
    };
  },
  name: "Checkout",
  methods: {
    payment() {
      axios
        .put(`${this.baseURL}cart/${this.order.id}`, {
          paid: true
        })
        .then((res) => {
          if (res.status == 200) {
            swal({
          icon: "success",
          text: "payment success"
        })
          window.location.reload();
      }
    })
    this.$store.state.cards = [];
  },
    goToCart(){
      this.$router.push({ name: 'Cart'})
    },
  },
};
</script>
<style scoped>
h4,
h5 {
  color: #484848;
  font-size: 700;
}
</style>
