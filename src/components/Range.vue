<template>
 <div class="main-range">
   <div> <h4 v-html="range.name"></h4></div>
   <div class="range-values">
     <input type="number" class="range-input" v-model.number="barMinValue" @input="InputValues()">
     <span class="span-space">-</span>
     <input type="number" class="range-input" v-model.number="barMaxValue" @input="InputValues">
   </div>
   <MultiRangeSlider
    :min="range.min"
    :max="range.max"
    :step="range.step"
    :ruler="false"
    :label="false"
    :preventWheel="false"
    :minValue="barMinValue"
    :maxValue="barMaxValue"
    @input="UpdateValues"
    ref="Rangeslide"
  />
 </div>
</template>

<script>
import MultiRangeSlider from "multi-range-slider-vue";
export default {
  name: 'Range',
  components: {
    MultiRangeSlider
},
  props: {
    range: Object,
  },
data() {
    return {
      barMinValue: this.range.min,
      barMaxValue: this.range.max
    };
  },
  mounted() {
    this.$root.$on('remove', () => {
      this.barMinValue = this.range.min;
      this.barMaxValue = this.range.max;
    })
  },
methods: {
    UpdateValues(e) {
      this.barMinValue = e.minValue;
      this.barMaxValue = e.maxValue;
      this.storeValue();
    },
     InputValues() {
      this.$refs.Rangeslide.valueMax = this.barMaxValue
      this.$refs.Rangeslide.valueMin = this.barMinValue
      this.storeValue();
    },
    storeValue() {
      this.$store.dispatch('SAVE_MIN'+this.range.val, this.barMinValue);
      this.$store.dispatch('SAVE_MAX'+this.range.val, this.barMaxValue);
    }
  },
  computed: {
  }
}

</script>
