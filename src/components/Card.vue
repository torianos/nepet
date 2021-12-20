<template>
  <article class="wrap-card">
    <div class="head-card">
      <div class="head-card-floor">{{card.floor}} этаж</div>  
      <div class="head-card-rooms">{{card.rooms}} {{card.rooms>4?"комнат":card.rooms>1?"комнаты":"комната"}}</div>  
      <div class="head-card-space">-</div>  
      <div class="head-card-square">{{card.square}} м<sup>2</sup></div>  
    </div>

    <div class="body-card">
      <div class="body-card-number">№{{card.number}}</div>
      <div class="body-card-image"><img :src="getImgUrl" alt="Планировка квартиры"></div>
    </div>

    <div class="footer-card">
      <div class="footer-card-price">{{card.price | splitNumber}}р.</div>
      <div class="footer-card-pricesquare">{{priceSquare| splitNumber}} р. за м<sup>2</sup></div>
      <button class="footer-card-more">Подробнее</button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: Object,

  },
  filters: {
    // Добавление пробелов в ценник
    splitNumber: function (value) {
       return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  computed: {
    // Для того чтобы webpack видел изображения
    getImgUrl() {
      if(!this.card.plan) {return}
     return require('../assets'+this.card.plan)
    },
    priceSquare() {
      return Math.floor(this.card.price/this.card.square)
    },
    }
}
</script>