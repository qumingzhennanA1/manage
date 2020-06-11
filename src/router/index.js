import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../pages/Login.vue'
import {API_ACCOUNT_TOKEN_CHECK} from "@/api/apis"
Vue.use(VueRouter)


 const router = new VueRouter({
  routes : [
    {path: '/',name: 'login',component: login},
    {path: '/login',name: 'login',component: () => import('../pages/Login.vue')},
    {path: '/index',name: 'index',component: () => import('../pages/index.vue'),children:[
      {path: '/index/home',name: 'home',component: () => import('../pages/index/Home.vue'),meta:[""]},
      {path: '/index/shops',name: 'shops',component: () => import('../pages/index/Shops.vue'),meta:[""]},
      {path: '/index/order',name: 'order',component: () => import('../pages/index/Order.vue'),meta:[""]},
      {path: '/index/order_detail',name: 'orde_detailr',component: () => import('../pages/index/Order_detail.vue'),meta:[""]},
      // {path: '/index/goods',name: 'goods',component: () => import('../pages/index/Goods.vue'),meta:[""]},
      {path: '/index/goods_list',name: 'goods_list',component: () => import('../pages/index/Goods_list.vue'),meta:["",""]},
      {path: '/index/goods_add',name: 'goods_add',component: () => import('../pages/index/Goods_add.vue'),meta:["",""]},
      {path: '/index/goods_edit',name: 'goods_edit',component: () => import('../pages/index/Goods_edit.vue'),meta:["",""]},
      {path: '/index/goods_classify',name: 'goods_classify',component: () => import('../pages/index/Goods_classify.vue'),meta:["",""]},
      {path: '/index/acc_list',name: 'acc_list',component: () => import('../pages/index/Acc_list.vue'),meta:["",""]},
      {path: '/index/acc_add',name: 'acc_add',component: () => import('../pages/index/Acc_add.vue'),meta:["",""]},
      {path: '/index/acc_change',name: 'acc_change',component: () => import('../pages/index/Acc_change.vue'),meta:["账号管理","修改账号"]},
      {path: '/index/acc_alter',name: 'acc_alter',component: () => import('../pages/index/Acc_alter.vue'),meta:["账号管理","修改密码"]},
      {path: '/index/acc_infor',name: 'acc_infor',component: () => import('../pages/index/Acc_Infor.vue'),meta:["账号管理","上传图片"]},
      {path: '/index/goods_statistical',name: 'goods_statistical',component: () => import('../pages/index/Goods_statistical.vue'),meta:["销售统计","商品统计"]},
      {path: '/index/order_statistical',name: 'order_statistical',component: () => import('../pages/index/Order_statistical.vue'),meta:["销售统计","订单统计"]},
    ]}
  ]
})



router.beforeEach((to,from,next) =>{
    from

    if( to.path != "/" ){
      API_ACCOUNT_TOKEN_CHECK(localStorage.token).then( res=>{
        if(res.data.code==0){
          next()
        }else{
          next("/")
        }
      } )
    }else{
      next()
    }
} )



export default  router;