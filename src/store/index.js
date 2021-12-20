import Vue from 'vue';
import Vuex from 'vuex';
import file from './data.txt'
// ссылка на файл data.txt благодаря raw-loader

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        data: null,
        rooms: [],
        filterdata:null,

        minfloor: 1,
        maxfloor: 99,
        minsquare: 1,
        maxsquare: 999,
        minprice: 1,
        maxprice: 99.9,

        ranges: [{name:"ЭТАЖ", step: 1, min: 1, max: 99, val: "FLOOR"},
        {name:"ПЛОЩАДЬ, м<sup>2</sup>", step: 1, min: 1, max: 999, val: "SQUARE"},
        {name:"СТОИМОСТЬ, млн. р.", step: 0.1, min: 1, max: 99.9, val: "PRICE"},],
      },
      getters: {
        FILTERDATA:state => {
            return state.filterdata;
          },
        DATA: state => {
          return state.data;
        },
        ROOMS: state => {
            return state.rooms;
          },
        RANGES:state => {
            return state.ranges;
          },
        
      },
    
      mutations: {
        SET_DATA: (state, data) => {
          state.data = data;
        },
        SET_FILTERDATA: (state, data) => {
            state.filterdata = data;
          },
        SET_ROOMS: (state, data) => {
            state.rooms = data;
        },
        SET_MINFLOOR: (state, data) => {
            state.minfloor = data;
        },
        SET_MAXFLOOR: (state, data) => {
            state.maxfloor = data;
        },
        SET_MINSQUARE: (state, data) => {
            state.minsquare = data;
        },
        SET_MAXSQUARE: (state, data) => {
            state.maxsquare = data;
        },
        SET_MINPRICE: (state, data) => {
            state.minprice = data;
        },
        SET_MAXPRICE: (state, data) => {
            state.maxprice = data;
        },
        SET_FILTER: (state) => {
            if (!state.rooms || state.rooms.length == 0) {
            state.filterdata = state.data;}
            else {
            state.filterdata = state.data.filter((obj) => {
            let result = false;
            for (let room of state.rooms) {
             result = result || obj.size.indexOf(room) > -1;
            }
            return result;
            });}
            state.filterdata = state.filterdata.filter((obj) => {
                let price = obj.price/1000000
                return obj.floor >= state.minfloor &&   obj.floor <= state.maxfloor &&
                 obj.square >= state.minsquare &&  obj.square <= state.maxsquare && 
                 price >= state.minprice &&  price<= state.maxprice
            })
        },
        RESET_FILTER: (state) => {
            state.filterdata = state.data
        },
      },
    
      actions: {
        GET_DATA: async (context) => {
            let data = JSON.parse(file);
            context.commit('SET_DATA', data);
            context.commit('SET_FILTERDATA', data);
            // Из-за того что вебпак соберет всё в один файл - он не найдет путь к  data.txt
            // предполагаю, что это можно было бы решить через require(), так же, как я сделал с изображениями
            // при запросе к локальному файлу он мне всегда выдавал статус 200

            // data=new XMLHttpRequest();
            // data.onreadystatechange=function()
            // {
            // if (data.readyState==4 && data.status==200 || data.status == 0) {

            // }
            // data.open("GET","data.txt",true);
            // data.send();

        },
        SAVE_ROOMS: async (context, rooms) => {
            context.commit('SET_ROOMS', rooms);
          },
        SAVE_MINFLOOR: (context, data) => {
            context.commit('SET_MINFLOOR', data);
        },
        SAVE_MAXFLOOR: (context, data) => {
            context.commit('SET_MAXFLOOR', data);
        },
        SAVE_MINSQUARE: (context, data) => {
            context.commit('SET_MINSQUARE', data);
        },
        SAVE_MAXSQUARE: (context, data) => {
            context.commit('SET_MAXSQUARE', data);
        },
        SAVE_MINPRICE: (context, data) => {
            context.commit('SET_MINPRICE', data);
        },
        SAVE_MAXPRICE: (context, data) => {
            context.commit('SET_MAXPRICE', data);
        },

        SAVE_FILTER: (context) => {
            context.commit('SET_FILTER');
        },
        SAVE_RESET_FILTER: (context) => {
            context.commit('RESET_FILTER');
        },
      },
});