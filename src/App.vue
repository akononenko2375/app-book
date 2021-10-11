<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapGetters(['cart'])
  }
}
</script>


<style>
#app{
  max-width: 900px;
  margin: 0 auto;
}
h4{
  text-align: center;
}

</style>
