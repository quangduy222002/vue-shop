<template>
  <div id="home">
    <div id="background-div" class="page-holder bg-cover">
      <div class="container py-5">
        <header class="text-left text-white py-5">
          <router-link :to="{ name: 'Product'}"
            ><h3 class="mb-4 rounded" id="heading">
              Start shopping
            </h3></router-link
          >
        </header>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style>
.page-holder {
  min-height: 100vh;
}
.bg-cover {
  background-size: cover !important;
}
#background-div {
  background: url("../assets/home.png");
}
#heading {
  font-weight: 400;
}
</style>
