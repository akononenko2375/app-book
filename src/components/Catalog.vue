<template>
  <div class="catalog">

    <div class="search">
      <h4>Find Book</h4>
      <div class="wrapper">
        <div class="form">
          <input
              class="input"
              type="text"
              v-model="keyword"
              @keydown.enter="showBooks"
          >
          <button @click="showBooks" class="btn">Отправить</button>
        </div>
        <div class="basket">
          <router-link :to="{name: 'cart', params: {cartData: cart}}">
            <div class="cart-box">
              <i class="material-icons">shopping_cart</i>
              <p class="cart">Cart: {{ cart.length }}</p>
            </div>

          </router-link>
        </div>
      </div>
    </div>
<!--    <Valid />-->
    <div class="message-box" v-if="message">{{ text }}</div>

    <h4 v-if="books">Catalog</h4>
    <CatalogItem
        v-for="book in books"
        :book="book"
        :key="book.id"
        @addToCart="addToCart"
    />
  </div>
</template>

<script>
import CatalogItem from "@/components/CatalogItem";
// import Valid from '@/components/Valid';
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Catalog",
  components: {CatalogItem},
  data() {
    return {
      keyword: '',
      text: 'Ваш заказ был успешно оформлен!'
    }
  },
  computed: {
    ...mapGetters(['books', 'cart', 'message'])
  },
  methods: {
    ...mapActions(['addToCartProduct', 'getData']),
    addToCart(data) {
      this.addToCartProduct(data)
    },
    showBooks() {
      this.getData(this.keyword);
      this.keyword = ''
    }
  }

}
</script>

<style scoped>

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form {
  flex-basis: 85%;
}

.cart-box {
  position: relative;
}

.cart {
  margin-left: 15px;
  border: 1px solid teal;
  padding: 10px 10px 10px 40px;
  border-radius: 5px;
}

.material-icons {
  color: teal;
  position: absolute;
  top: 10px;
  left: 25px;
}
.message-box {
  border: 1px solid teal;
  padding: 15px;
  text-align: center;
  margin: 20px 0;
  background-color: teal;
  color: white;
  text-transform: uppercase;
  border-radius: 10px;
}
</style>