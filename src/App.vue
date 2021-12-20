<template>
  <div id="app">
    <div class="main-body">
      <header><h1>Lorem ipsum dolor sit</h1></header>

      <section class="options">
        <ChangeRooms/>
        <Range v-for="range in ranges" :key="range.id" :range="range"/>
        <div class="options-buttons"> 
          <button class="startfilter" @click="startfilter">Применить</button>
          <button class="resetfilter" @click="resetfilter">Сбросить фильтр</button>
        </div>
      </section>

      <main class="card-grid">
        <div v-for="card in dataList" :key="card.id+card.building_id">
          <Card :card="card"/>
        </div>
      </main>  
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import ChangeRooms from './components/ChangeRooms.vue'
import Range from './components/Range.vue'

export default {
  name: 'App',
  components: {
    Card, ChangeRooms, Range
  },
  data()  { 
    return {
    }
  },
  mounted() {
  this.$store.dispatch('GET_DATA');
  },
  methods: {
    startfilter() {
      this.$store.dispatch('SAVE_FILTER');
    },
      resetfilter() {
      this.$root.$emit('remove');
      this.$store.dispatch('SAVE_RESET_FILTER');
    }
  },
  computed: {
    dataList() {
    return this.$store.getters.FILTERDATA;
  },
  ranges() {
    return this.$store.getters.RANGES;
  }
  },
  watch: {
  }
}
</script>
<style lang="scss">
  @import "./styles/style.scss";
</style>