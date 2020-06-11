<template>
    <div class="acc_add">
        <h3>添加账号</h3>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="账号">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>

       <el-form-item label="密码">
    <el-input v-model="formLabelAlign.pwd"></el-input>
  </el-form-item>

  <el-form-item label="用户组" prop="group">
    <el-select v-model="formLabelAlign.group" placeholder="请选择用户组">
      <el-option label="超级管理员" value="超级管理员"></el-option>
      <el-option label="普通管理员" value="普通管理员"></el-option>
    </el-select>
  </el-form-item>

</el-form>
          <el-button type="primary" @click="acc_btn">添加</el-button><el-button @click="reset">重置</el-button>
    </div>
</template>




<script>
import { API_ACCOUNT_ADD } from "@/api/apis.js";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        group: "",
        pwd: ""
      }
    };
  },
  methods: {
    acc_btn() {
      console.log(        this.formLabelAlign.name,
        this.formLabelAlign.pwd,
        this.formLabelAlign.group)
      API_ACCOUNT_ADD(
        this.formLabelAlign.name,
        this.formLabelAlign.pwd,
        this.formLabelAlign.group
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你！！！添加成功",
            type: "success"
          });
          this.formLabelAlign.name = "";
          this.formLabelAlign.pwd = "";
          this.formLabelAlign.group = "";
        } else {
          this.$message.error("添加失败");
          this.formLabelAlign.name = "";
          this.formLabelAlign.pwd = "";
          this.formLabelAlign.group = "";
        }
      });
    },
    reset(){
          this.formLabelAlign.name = "";
          this.formLabelAlign.pwd = "";
          this.formLabelAlign.group = "";
    }
  }
};
</script>



<style>
.acc_add {
  background: #fff;
  padding-bottom: 20px;
}
h3 {
  text-indent: 2em;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
}
.el-input__inner {
  width: 200px;
}
.el-button {
  line-height: 0;
  margin-left: 80px;
}
.el-form {
  margin-top: 10px;
}
</style>
