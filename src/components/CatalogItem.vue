<template>
  <div class="ctalog-item">

    <Popup
        v-if="infoPopupStatus"
        @closePopup="closeInfoPopup"
        :book="book"
        rightBtnTitle="add To Cart"
        @rightBtnAction="addToCart"
    />

  <div class="col s12 m7">
    <div class="card horizontal">
      <div class="card-image">
        <img :src="book.volumeInfo.imageLinks.thumbnail" alt="img">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p><strong>Название книги:</strong> {{ book.volumeInfo.title }} </p>
          <p>
            <span v-if="!book.authors">No authors to display</span>
            <span v-else>
              By
              <span v-for="(author, index) in book.authors" :key="index">
                <em>
              {{
                    index + 1 !== book.authors.length && index + 1 !== book.authors.length - 1 ? author + ', ' : index + 1 == book.authors.length && index + 1 !== 1 ? ' and ' + author : author
                  }}
            </em>
              </span>
            </span>
          </p>
          <p><strong>Год выпуска:</strong> {{ book.volumeInfo.publishedDate }}</p>
        </div>
        <div class="card-action">
          <button v-if="book.saleInfo.saleability === 'FOR_SALE'" @click="infoPopup" class="btn">Купить книгу</button>
          <p v-else>Нет в наличии</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Popup from "@/components/Popup";

export default {
  name: "CatalogItem",
  props: ['book'],
  components: {Popup},
  data() {
    return {
      infoPopupStatus: false,
    }
  },
  methods: {
    infoPopup(){
      this.infoPopupStatus = true
    },
    closeInfoPopup() {
      this.infoPopupStatus = false
    },
    addToCart(){
      this.$emit('addToCart', this.book)
    }
  },

}
</script>

<style scoped>

</style>