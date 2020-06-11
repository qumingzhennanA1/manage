<template>
    <div class="acc_alter">
        <h3>修改密码</h3>
            <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="oldpwd">
    <el-input v-model.number="ruleForm.oldpwd" @blur="oldpwd_input"></el-input>
  </el-form-item>
  <el-form-item label="确定新密码" prop="pass">
    <el-input type="password" v-model="ruleForm.newpwd" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
import { API_ACCOUNT_OLDPWD ,API_ACCOUNT_NEWPWD} from "@/api/apis";
export default {
  data() {

    return {
      ruleForm: {
        pass: "",
        // checkPass: "",
        newpwd: ""
      },

      id:""
    };
  },
  methods: {
    //修改密码
    submitForm() {
      //验证旧密码是否错误
        this.id = sessionStorage.getItem("id")
        // console.log(this.id)
        API_ACCOUNT_OLDPWD(this.ruleForm.oldpwd,this.id).then( res =>{
          // console.log(res)
          if(res.data.code==1){
            this.$message.error('旧密码输入错误');
          }else{
            //新密码
            // console.log(this.ruleForm.newpwd)
            // console.log(this.id)
             API_ACCOUNT_NEWPWD(this.ruleForm.newpwd,this.id).then( res =>{
             if(res.data.code==0){
                this.$message({
                message: "恭喜你,修改密码成功",
               type: "success"
               });
                this.$router.push("/index/acc_list")
             }
         })
          }
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //旧密码
    oldpwd_input(){

    }
  }
};
</script>

<style>
.acc_alter{
    background: #fff;
    padding-bottom: 20px;
}
    h3{
        line-height: 50px;
        text-indent: 2em;
        border-bottom: 1px solid #ccc;
    }

    .el-input__inner{
        width: 200px;
        margin-top: 10px;
    }
</style>
