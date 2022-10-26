<template>
  <div class="container" v-if="product.length > 0">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <div class="col-md-4 col-12">
        <img :src="`${product[0].image}`" class="img-fluid" />
      </div>
      <div class="col-md-6 col-12 pt-3 pt-md-0">
        <h4>{{ product[0].name }}</h4>
        <h6 class="font-weight-bold">${{ product[0].price }}</h6>
        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">Quantity</span>
            </div>
            <input type="number" class="form-control" v-model="quantity" />
          </div>

          <div class="input-group col-md-3 col-4 p-0">
            <button
              class="btn"
              type="button"
              id="add-to-cart-button"
              @click="addToCart"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div class="features pt-3">
          <h5><strong>Description</strong></h5>
          <ul>
            {{
              product[0].description
            }}
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      isLoading: false,
      id: this.$route.params.id,
      product: [],
      quantity: {
        type: Number,
        default: 0,
        require: true,
        validator: (value) => {
          return value > 0
        }
      },
    };
  },
  props: ["baseURL", "products", "order"],
  methods: {
    findProduct(id) {
      const temp = this.products.filter((product) => {
        return product.id === id;
      });
      this.product = temp;
    },
    addToCart() {
      this.isLoading = true;
      const newitem = {
        id: parseInt(this.id),
        name: this.product[0].name,
        price: parseFloat(this.product[0].price),
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", newitem);

      if (this.isLoading) {
        swal({
          icon: "info",
          text: "Loading",
          button: false,
        });
        if (this.order !== undefined) {
          axios
            .put(`${this.baseURL}cart/${this.order.id}`, {
              items: this.$store.state.carts,
              total: this.$store.getters.totalCost,
            })
            .then((res) => {
              if (res.status == 200) {
                this.isLoading = false;
                swal({
                  icon: "success",
                  text: "add to cart success",
                });
                window.location.reload();
              }
            });
        } else {
          axios
            .post(`${this.baseURL}cart`, {
              items: this.$store.state.carts,
              total: this.$store.getters.totalCost,
              paid: false,
            })
            .then((res) => {
              if (res.status == 201) {
                this.isLoading = false;
                swal({
                  icon: "success",
                  text: "add to cart success",
                });
                window.location.reload();
              }
            });
        }
      }
    },
  },
  mounted() {
    this.findProduct(this.id);
  },
};
</script>
<style>
.category {
  font-weight: 400;
}

#wishlist-button {
  background-color: #b9b9b9;
}

#add-to-cart-button {
  background-color: #febd69;
}
</style>
