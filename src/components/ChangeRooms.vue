<template>
 <div class="select-rooms">
   <div> <h4>КОМНАТЫ</h4></div>
   <div class="select-rooms-checkbox">
    <label v-for="room in roomsList" :key="room.id"><input type="checkbox" :value="room" v-model="changeRooms">
      <span>{{room}}</span>
    </label>
   </div>
 </div>
</template>

<script>
export default {
  name: 'ChangeRooms',
  data()  { 
  return {
    changeRooms: [],
  }
  },
  watch: {
    dataList() {
      this.changeRooms = this.roomsList
    },
    changeRooms() {
       this.$store.dispatch('SAVE_ROOMS', this.changeRooms);
    }
  },
  computed: {
    // Вся информация
    dataList() {
      return this.$store.getters.DATA;
    },
    // Чекбоксы комнат
    roomsList() {
      if(!this.dataList) return
      let list = []
      this.dataList.forEach((el)=> {
        if(list.indexOf(el.size) === -1) {list.push(el.size)}
      })
      return list.sort()
    },
  }
}

</script>
