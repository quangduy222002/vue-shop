<template>
    <div class="card h-100 w-100">
        <div class="embed-responsive embed-responsive-16by9">
            <img
                class="card-img-top embed-responsive-item"
                :src="`${product.image}`"
                alt="Card image cap"
            />
        </div>
        <div class="card-body">
            <!-- <router-link"></router-link> -->
            <router-link :to="{name: 'ShowDetails', params: {id : product.id}}">
                <h5 class="card-title">{{ product.name }}</h5>
            </router-link>
            <p class="card-text">
               ${{ product.price}}
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name: "ProductBox",
        props: ["product"]
    }
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
