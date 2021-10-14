<template>
  <div class="popup">
    <div class="box">
      <div class="box-content">
        <img :src="book.volumeInfo.imageLinks.thumbnail" alt="img">
       <div class="box-info">
         <p><strong>Название книги:</strong> {{ book.volumeInfo.title }} </p>
         <p><strong>Описание книги:</strong> {{ book.volumeInfo.description.substr(0, 200) + '...' }} </p>

       </div>
      </div>

      <div class="box-price">
        <p><strong>Цена:</strong> {{ book.saleInfo.listPrice.amount }} грн</p>
      </div>

      <form class="card-form" @submit.prevent="submitHandler">
        <div class="card">
          <div class="input-field">
            <input id="nameInput" type="text" v-model.trim="nameInput">
            <label for="nameInput">Имя</label>
            <small class="error" v-if="$v.nameInput.$dirty && !$v.nameInput.required">Поле Имя не должно быть
              пустым</small>
            <small class="error" v-else-if="$v.nameInput.$dirty && !$v.nameInput.maxLength">Количество символов в имени
              не должно привышать 10 </small>
          </div>

          <div class="input-field">
            <input id="email" type="text" v-model.trim="email">
            <label for="email">Email</label>
            <small class="error" v-if="$v.email.$dirty && !$v.email.required">Поле Email не должно быть пустым</small>
            <small class="error" v-else-if="$v.email.$dirty && !$v.email.email">Введите корретный Email</small>
          </div>

          <div class="input-field">
            <input id="phone" type="text" v-model.trim="phone">
            <label for="phone">Phone</label>
            <small class="error" v-if="$v.phone.$dirty && !$v.phone.required">Поле Phone не должно быть пустым</small>
            <small class="error" v-if="$v.phone.$dirty && !$v.phone.alpha">Введите номер в формате +380(67)777-7-777</small>
          </div>

          <div class="btn-box">

            <button @click="closePopup" class="btn">Close</button>
            <button
                @click='test'
                class="btn"
                type="submit"
            >
              {{ rightBtnTitle }}
            </button>
          </div>
        </div>
      </form>


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
      nameInput: '',
    }
  },
  validations: {
    nameInput: {
      required,
      maxLength: maxLength(10)
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      alpha: val => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i.test(val),
      maxLength: maxLength(13),

    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },

    rightBtnAction() {
      this.$emit('rightBtnAction')
    },
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (!this.$v.$invalid) {
        this.rightBtnAction()
        this.closePopup()
      }
    },

    test(){
      if (!this.$v.$invalid) {
        this.rightBtnAction()
        this.closePopup()
      }
    }

  }
}
</script>

<style scoped>

.box {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
  z-index: 100;
  width: 600px;
  max-width: 700px;
  min-height: 600px;
  box-shadow: 0 0 17px #4f4e4e;
  padding: 15px;
  background: #fff;
}

.btn-box {
  display: flex;
  justify-content: space-between;

}

.error {
  color: red;
}
.card {
  height: 285px;
  border: none;
  padding: 10px;
}
.box-content {
  display: flex;
}

.box-info {
  margin-left: 10px;
}

.box-price {
  font-size: 20px;
  text-align: center;
}

</style>