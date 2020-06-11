<template>
<div class="acc_infor">
        <h1>管理员信息</h1>
       <p>管理员ID <span>{{id}}</span> </p>
       <p>账号: <span>{{account}}</span> </p>
       <p>用户组: <span>{{userGroup}}</span> </p>
       <p>创建时间: <span>{{ctime}}</span> </p>
 <el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:5000/users/avatar_upload"
  :show-file-list="false"
  :data="data"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

    </div>
</template>


<script>
import {API_ACCOUNT_INFOR} from "@/api/apis"
export default {
  data() {
    return {
      imageUrl: "",
      data:{id:localStorage.id},
      id:"",
     account:"",
     userGroup:"",
     ctime:""
    };
  },
  created(){
     API_ACCOUNT_INFOR(localStorage.id).then(res=>{
       console.log(res)
       this.id=res.data.accountInfo.id;
       this.account=res.data.accountInfo.account;
       this.userGroup=res.data.accountInfo.userGroup;
       this.ctime=res.data.accountInfo.ctime;
       this.imageUrl=res.data.accountInfo.imgUrl
   
     })
  },
  methods: {
    handleAvatarSuccess() {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    window.location.reload()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
 


<style scoped>
.acc_infor {
  height: 100%;
  background: #fff;
  text-indent: 2em;
}
.acc_infor h1 {
  line-height: 60px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
