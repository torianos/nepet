import Vue from 'vue';
import Vuex from 'vuex';
import file from './data.txt'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        data: null,
      },
      getters: {
        DATA: state => {
          return state.data;
        },
      },
    
      mutations: {
        SET_DATA: (state, data) => {
          state.data = data;
        },
      },
    
      actions: {
        GET_DATA: async (context) => {
            // console.log(file)
            let data = JSON.parse(file);
            // let data = 0
            context.commit('SET_DATA', data);


// такая конструкция работать не будет для vue

            // data=new XMLHttpRequest();
            // data.onreadystatechange=function()
            // {
            // if (data.readyState==4 && data.status==200 || data.status == 0)
            //     console.log(data)
            //     console.log(file)
            // }
            // data.open("GET","data.txt",true);
            // data.send();

        },
      },
});
// export default store