<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Card msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import Counter from '@/counterMixin'

export default {
  name: 'App',
  mixins: [Counter],
  components: {
    Card
  },
  data()  { 
    return {

    }
  },
  mounted() {
  this.$store.dispatch('GET_DATA');
  },
  methods: {

  },
  computed: {
    dataList() {
    return this.$store.getters.DATA;
  },
  },
  watch: {
  }
}
</script>