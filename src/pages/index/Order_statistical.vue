<template>
    <div>
      <p><span>时间范围</span>
      <el-date-picker
      v-model="value2"
      :default-value="['2020:00:00', '2020:06:30']"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  <el-button type="primary" @click="dateSearch">查询</el-button>
           </p>
           <div id="myChar"></div>
    </div>
</template>



<script>
import { API_ORDER_ORDERTOTAL } from "@/api/apis";
import echarts from "echarts";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: [new Date(2000, 10, 10, 10, 10), new Date(2020, 10, 11, 10, 10)],
      timeArr:[],
      amountArr:[]
    };
  },
  mounted() {
         let myChar = echarts.init(document.getElementById("myChar"));
        API_ORDER_ORDERTOTAL(JSON.stringify(this.value2)).then(res=>{
           res.data.data.forEach(v => {
              this.timeArr.push( JSON.stringify(v.orderTime) )
              this.amountArr.push(v.ordermount)
           });
        let option = {
        xAxis: {
          type: "category",
          data:  this.timeArr
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data:this.amountArr,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      };
         myChar.setOption(option)
     })
  },
  methods: {
    dateSearch() {


    }
  }
};
</script>


<style>
.el-range-editor {
  margin: 0 20px;
}
#myChar {
  width: 600px;
  height: 400px;
}
</style>
