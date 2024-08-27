import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    TableDataList:[],
    TableDataList12:[{
          "icon": "@/assets/icons_imgs/百度.png",
          "platform": "'测试'",
          "account": "1111",
          "password": "password1",
          "remark": "备注1",
          "showPassword": false,
          "url": "http://baidue.com",
          "linkText": "百度"
        },
        {
          "icon": "@/assets/icons_imgs/百度.png",
          "platform": "'测试'",
          "account": "1111",
          "password": "password1",
          "remark": "备注1",
          "showPassword": false,
          "url": "http://baidue.com",
          "linkText": "百度"
        }]
  },
  mutations:{
    // 更新数据
    setDataList (state, newTableDataList) {
      state.TableDataList = newTableDataList;
    },
  },
  actions:{
    getDataList (context) {
      const getUrl = '/tableData';
      request.get(getUrl)
      .then(response => {
        // this.TableDataList = response.data;
        // this.getDataList(response.data)
        const newTableDataList=response.data
        // 获取数据
      context.commit('setDataList', newTableDataList);
        // 解析 response.data 并将其转换为数组
        // console.log('数据获取成功:', this.TableDataList);
      })
      .catch(error => {
        console.error('数据获取失败:', error);
      });
      
    }
  },
  getters:{
  }
})
export default store