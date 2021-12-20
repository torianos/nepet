<template>
  <div id="app">
    <main class="main-body">
    <div class="card-grid">
      <div v-for="card in dataList" :key="card.id+card.building_id"><Card :card="card"/></div>
    </div>  
    </main>
  </div>
</template>

<script>
import Card from './components/Card.vue'
// import Counter from '@/counterMixin'

export default {
  name: 'App',
  // mixins: [Counter],
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
<style lang="scss">
  @import "./styles/style.scss";
</style>