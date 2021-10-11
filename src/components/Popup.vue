<template>
  <div class="popup">
    <div class="box">
      <img :src="book.volumeInfo.imageLinks.thumbnail" alt="img">
      <p><strong>Название книги:</strong> {{ book.title }} </p>
      <p><strong>Описание книги:</strong> {{ book.volumeInfo.description.substr(0, 200) + '...'}} </p>
      <p><strong>Цена:</strong> {{ book.saleInfo.listPrice.amount }} грн</p>
      <input v-model.trim="name" id="name" type="text">
      <label for="name">Name:</label>
      <input v-model.trim="email" id="email" type="text">
      <label for="email">Email</label>
      <div class="btn-box">
        <button
            @click="rightBtnAction(), closePopup()"
            class="btn">
          {{ rightBtnTitle }}
        </button>
        <button @click="closePopup" class="btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import {required, maxLength, email} from 'vuelidate/lib/validators';

export default {
  name: "Popup",
  props: ['book', 'rightBtnTitle'],
  data() {
    return {
      phone: '',
      email: '',
      name: ''
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
    },
    rightBtnAction(){
      this.$emit('rightBtnAction')
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(10),
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      maxLength: maxLength(13),
    }
  }
}
</script>

<style scoped>

.box {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%);
  z-index: 100;
  width: 600px;
  box-shadow: 0 0 17px #4f4e4e;
  padding: 15px;
  background: #fff;
  text-align: center;
}

.btn-box {
  display: flex;
  justify-content: space-between;

}
</style>