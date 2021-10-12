<template>
  <div class="cart">
    <router-link :to="{name: 'home'}">
      <button class="link-to-catalog btn">Back to Catalog</button>
    </router-link>
    <h4>Cart</h4>
    <div v-if="!cartData.length">
      <p>В корзине нет товаров</p>
      <hr>
    </div>
    <CartItem
        v-for="(item, index) in cartData"
        :key="item.id"
        :cartItemData="item"
        @delFromCart="delFromCart(index)"
        @increment="increment(index)"
        @decrement="decrement(index)"
    />
    <router-link :to="{name: 'home'}">
      <div v-if="cartData.length" class="cart__total">
        <div class="box-price">
          <p class="total__name">TOTAL PRICE: {{ cartTotalCost | toFix | formattedPrice }}</p>
        </div>
        <div class="box-btn">
          <button @click="doOrder()" class="pay btn" >Заказать</button>
        </div>
      </div>


    </router-link>

  </div>
</template>

<script>
import CartItem from "@/components/CartItem";
import {mapActions} from "vuex";
import formattedPrice from "@/filters/priceFormat";
import toFix from "@/filters/toFix";

export default {
  name: "Cart",
  components: {CartItem},
  props: {
    cartData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    formattedPrice,
    toFix
  },
  methods: {
    ...mapActions(['delElemFromCart', 'incrementCartItem', 'decrementCartItem', 'orderTrue', 'showMessage']),
    delFromCart(index) {
      this.delElemFromCart(index);
    },
    increment(index) {
      this.incrementCartItem(index)
    },
    decrement(index) {
      this.decrementCartItem(index)
    },
    doOrder() {
      this.orderTrue()
      this.showMessage()

    }
  },
  computed: {
    cartTotalCost() {
      let result = []

      if (this.cartData.length) {
        for (let item of this.cartData) {
          result.push(item.saleInfo.listPrice.amount * item.quantity)
        }

        result = result.reduce(function (sum, el) {
          return sum + el;
        })
        return result;
      } else {
        return 0
      }
    }
  },
}
</script>

<style scoped>
.cart {
  margin-bottom: 100px;
}

.link-to-catalog {
  position: absolute;
  top: 20px;
  right: 50px;
  text-align: center;
}

h4 {
  margin-bottom: 60px;
}

.cart__total {
  /*position: fixed;*/
  /*bottom: 0;*/
  /*right: 0;*/
  /*left: 0;*/
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: teal;
  color: #ffffff;
  font-size: 20px;
}

.total__name {
  margin-right: 16px;
}

</style>