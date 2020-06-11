<template>
    <div class="home">
        <el-row>
  <el-col :span="6"><div class="grid-content bg-purple">
        <div><img :src="img1" alt=""></div>
        <div>
            <p>总订单</p>
            <p>{{totalOrder}}</p>
        </div>
      </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light">
              <div><img :src="img2" alt=""></div>
        <div>
            <p>总销售额</p>
            <p>{{totalAmount}}</p>
        </div></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
              <div><img :src="img3" alt=""></div>
        <div>
            <p>今日订单</p>
            <p>todayOrder</p>
        </div></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light">
              <div><img :src="img4" alt=""></div>
        <div>
            <p>今日销售额</p>
            <p>{{totayAmount}}</p>
        </div></div></el-col>
</el-row>
 
        <div id="mychart"></div>
    </div>
</template>
<script>
import img1 from "../../assets/img/02.jpg";
import img2 from "../../assets/img/03.jpg";
import img3 from "../../assets/img/04.jpg";
import img4 from "../../assets/img/05.jpg";
import echarts from "echarts";
import { API_ORDER_TOTAL } from "@/api/apis";
export default {
  data() {
    return {
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      todayOrder:0,
      totalAmount:0,
      totalOrder:0,
      totayAmount:0
    };
  },
  mounted() {
    let mychart = echarts.init(document.getElementById("mychart"));
    // mychart.showLoding()
    API_ORDER_TOTAL().then(res => {
        // console.log(res)
      // todayOrder: 189
      // totalAmount: 202466
      // totalOrder: 5486
      // totayAmount: 2189
      let {
        amountData,
        orderData,
        todayOrder,
        totalAmount,
        totalOrder,
        totayAmount,
        xData
      } = res.data;
      this.todayOrder=todayOrder;
      this.totalAmount=totalAmount;
      this.totalOrder=totalOrder;
      this.totayAmount=totayAmount;
      let option = {
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["金额数据", "订单数据"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data:amountData
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data:orderData
          },
        ]
      };
      mychart.setOption(option)
    });
  }
};
</script>


<style>
.grid-content {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 5px 10px;
  text-align: center;
}
.grid-content > div:first-child {
  margin-right: 10px;
}
p {
  line-height: 31px;
  color: #ccc;
}
img {
  width: 50px;
}
.el-col {
  padding: 10px 20px;
}
#mychart {
    margin-top: 20px;
  width: 100%;
  height: 400px;
}
.home{
    background: #fff;
}
</style>
