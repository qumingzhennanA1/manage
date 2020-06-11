<template>
    <div id="box">
        <div id="login">
            <h2>管理系统</h2>
            <p> <input type="text" v-model="acc"></p>
            <p> <input type="password" class="pwd" v-model="pwd"></p>
           <el-button @click="login_btn" class="login_btn" type="primary">登录</el-button>
        </div>
    </div>
</template>

<script>
import "../assets/commot.css";
import { API_LOGIN } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      falg: true,
    };
  },

  methods: {
    login_btn() {
      if (this.falg == false) return;
      this.falg=false;
          // this.$router.push("/index/home")
      API_LOGIN(this.acc, this.pwd).then(res => {
        // console.log(res)
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你,登录成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/index/home");
          }, 1000);
          localStorage.setItem("admin",this.acc)
          localStorage.setItem("id",res.data.id)
          localStorage.token = res.data.token;
          localStorage.role = res.data.role;
          // localStorage.setItem("token",res.data.token)
        }else{
             this.$message.error('用户名或密码错误');
        }
      });

        setTimeout(() => {
             this.falg=true;
        }, 3000);

    }
  }
};
</script>

<style scoped>
#box {
  height: 100%;
  background: yellowgreen url("../assets/img/login_bg.jpg");
}

#login {
  width: 300px;
  height: 200px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -150px;
  text-align: center;
  color: #fff;
}
.login_btn {
  width: 160px;
  margin-top: 10px;
  line-height: 0px;
}
.pwd {
  margin-top: 5px;
}
</style>