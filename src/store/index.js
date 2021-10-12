import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    books: null,
    cart: [],
    message: false,
  },
  mutations: {
    getData: (state, payload) => {
      state.books = payload
    },
    addToCartProduct: (state, product) => {
      if (state.cart.length) {
        let isProductExists = false;
        state.cart.map(function (item) {
          if (item.id === product.id) {
            isProductExists = true;
            item.quantity++
          }
        })
        if (!isProductExists) {
          state.cart.push(product)
        }
      } else {
        state.cart.push(product)
      }
    },

    delElemFromCart: (state, index) => {
      state.cart.splice(index, 1)
    },
    increment: (state, index) => {
      state.cart[index].quantity++
    },
    decrement: (state, index) => {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--
      }
    },
    orderTrue: (state) => {
      state.cart = [];
      state.books = null
    },
    showMessage: (state) => {
      state.message = true
      setTimeout(() => {
        state.message = false
      }, 5000)
    }
  },
  actions: {
    getData({commit}, id) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}`)
        .then(data => data.json())
        .then(data => commit('getData', data.items))
    },
    addToCartProduct({commit}, product) {
      commit('addToCartProduct', product)
    },
    delElemFromCart({commit}, index) {
      commit('delElemFromCart', index)
    },
    incrementCartItem({commit}, index) {
      commit('increment', index)
    },
    decrementCartItem({commit}, index) {
      commit('decrement', index)
    },
    orderTrue({commit}) {
      commit('orderTrue')
    },
    showMessage({commit}) {
      commit('showMessage')
    }
  },
  getters: {
    books(state) {
      return state.books
    },
    cart(state) {
      return state.cart
    },
    order(state) {
      return state.order
    },
    message(state) {
      return state.message
    },


  }
});

export default store;