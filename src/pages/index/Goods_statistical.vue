<template>
    <div>
           <p><span>时间范围</span>
    <el-time-picker
    is-range
    v-model="value1"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>
  <el-button type="primary">查询</el-button>
           </p>
    </div>
</template>



<script>
  export default {
    data() {
      return {
        value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      };
    }
  }
</script>


<style>
.el-range-editor{
    margin: 0 20px;
}
</style>
