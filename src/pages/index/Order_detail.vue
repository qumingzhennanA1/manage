<template>
<div class="order_detail">
        <h1>订单详情</h1>
       <p>订单ID <span>{{id}}</span> </p>
       <p>订单号: <span>{{orderNo}}</span> </p>
       <p>下单时间: <span>{{orderTime}}</span> </p>
       <p>联系电话: <span>{{phone}}</span> </p>
       <p>收货人: <span>{{consignee}}</span> </p>
       <p>送货地址: <span>{{deliverAddress}}</span> </p>
       <p>送达时间: <span>{{deliveryTime}}</span> </p>
       <p>备注: <span>{{remarks}}</span> </p>
       <p>订单金额: <span>{{orderAmount}}</span> </p>
       <p>订单状态: <span>{{orderState}}</span> </p>
    </div>
</template>


<script>
import {API_ORDER_DETAIL} from "@/api/apis"
export default {
  data() {
    return {
      id:"",
     orderNo:"",
     orderTime:"",
     phone:"",
     consignee:"",
     deliverAddress:"",
     deliveryTime:"",
     remarks:"",
     orderAmount:"",
     orderState:"",
    };
  },
  created(){
     API_ORDER_DETAIL( sessionStorage.order_detail_id).then(res=>{
       console.log(res)
       this.id=res.data.data.id;
       this.orderNo=res.data.data.orderNo;
       this.orderTime=res.data.data.orderTime;
       this.phone=res.data.data.phone;
       this.consignee=res.data.data.consignee;
       this.deliverAddress=res.data.data.deliverAddress;
       this.deliveryTime=res.data.data.deliveryTime;
       this.remarks=res.data.data.remarks;
       this.orderAmount=res.data.data.orderAmount;
       this.orderState=res.data.data.orderState;
   
     })
  },
  methods: {
  }
};
</script>
 


<style scoped>
.order_detail {
  height: 100%;
  background: #fff;
  text-indent: 2em;
}
.order_detail h1 {
  line-height: 60px;
}
.order_detail p{
  text-indent: 2.5em
}
</style>
