<template>
  <div class="cart-item">
    <img :src="cartItemData.volumeInfo.imageLinks.thumbnail" alt="">
    <div class="info">
      <p>Название: {{ cartItemData.volumeInfo.title }}</p>
<!--      <p>Описание: {{ cartItemData.volumeInfo.description.substr(0, 200) + '...'}}</p>-->
      <p>Цена: {{ cartItemData.saleInfo.listPrice.amount }} грн</p>
    </div>
    <div class="quantity">
      <p>Qty:</p>
      <span class="quantity__tools">
        <span class="quantity__btn" @click="decrementItem">-</span>
        {{ cartItemData.quantity }}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
    </div>
    <button @click="delFromCart" class="btn">Delete</button>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: ['cartItemData'],
  methods: {
    delFromCart() {
      this.$emit('delFromCart')
    },
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
  },
  mounted() {
    this.$set(this.cartItemData, 'quantity', 1)
  }
}
</script>

<style scoped>
.cart-item {
  padding: 15px;
  display: flex;
  flex-basis: auto;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  box-shadow: 0 0 17px #4f4e4e;
  margin-bottom: 15px;
}
.quantity__btn {
  cursor: pointer;
  border: 1px solid teal;
  padding: 5px;

  border-radius: 10px;
}
</style>