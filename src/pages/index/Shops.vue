<template>
        <div class="shops">
            <div class="shops_top">
                <h3>店铺管理</h3>
                  <el-button type="primary" @click="onSubmit()">立即创建</el-button>
            </div>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="店铺名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="店铺公告">
    <el-input type="textarea" v-model="form.bulletin"></el-input>
  </el-form-item>


  <el-form-item label="店铺头像">
   <el-upload
  class="avatar-uploader"
  :action="SHOP_UPLOAD_IMG"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="form.avatar" :src="SEVER_SHOP_IMG + form.avatar"  class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>


  <el-form-item label="店铺图片">
    <el-upload
  :action="SHOP_UPLOAD_IMG"
  list-type="picture-card"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-success="successImg">
  <i class="el-icon-plus"></i>
</el-upload>

  </el-form-item>


  <el-form-item label="配送费">
         <input type="text" v-model="form.deliveryPrice" class="el-input__inner">
  </el-form-item>


  <el-form-item label="配送时间">
         <input type="text" v-model="form.deliveryTime" class="el-input__inner">
  </el-form-item>

   <el-form-item label="配送描述">
         <input type="text" v-model="form.description" class="el-input__inner">
  </el-form-item>

     <el-form-item label="配送评分">
         <input type="text" v-model="form.score" class="el-input__inner">
  </el-form-item>

     <el-form-item label="配送销量">
         <input type="text" v-model="form.sellCount" class="el-input__inner">
  </el-form-item>


  <el-form-item label="活动">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="(item,index) in supports" :key="index" :label="item"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  

    <el-form-item label="营业时间">
        <el-time-picker
    is-range
    v-model="form.date"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>

  </el-form-item>
</el-form>
        </div>
</template>

<script>
import {API_SHOP_INFO,API_SHOP_EDIT,SHOP_UPLOAD_IMG,SEVER_SHOP_IMG} from "@/api/apis"
export default {
  data() {
    return {
        imgUrl: "http://127.0.0.1:5000/upload/shop/",
      form: {},
      supports:["在线支付满28减5","VC无限橙果汁全场八折","单人精彩套餐","特价饮品8折抢购","单人特色套餐"],
      checkList:[],
      pics:[],//图片上传成功
      fileList:[],//上传图片数组
      imageUrl: "",
      dialogImageUrl: "",
      SHOP_UPLOAD_IMG:SHOP_UPLOAD_IMG,
      SEVER_SHOP_IMG:SEVER_SHOP_IMG,
    };
  },
  methods: {
         getInfor(){
          API_SHOP_INFO().then( res=>{
          this.fileList=res.data.data.pics.map(img=>{
           return{
             url:this.SEVER_SHOP_IMG + img
        }
      })
   this.form = res.data.data
   } )
  },
    onSubmit() {
       let newObj = {...this.form};
       newObj.date=JSON.stringify(this.form.date)
       newObj.supports=JSON.stringify(this.checkList)
       newObj.pics=JSON.stringify(this.pics.concat(this.form.pics))
      
        API_SHOP_EDIT( newObj ).then(res=>{
       if(res.data.code==0){
          this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getInfor()
       }
     })
    },
    handleAvatarSuccess(file) {
      this.form.avatar=file.imgUrl
    },
    //上传成功
    successImg(file){
       this.pics.push(file.imgUrl)
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
    },
    handleRemove(file, fileList) {
      console.log(this.fileList)
      // this.fileList.forEach(v=>{
      //   this.fileList.slice(1,0,v.url.includes (file.url))
      // })
      // this.fileList.splice(1,0,file.url)
      // let index = file.url.lastIndexOf("/")
      // let extname = file.url.substr(index+1)
      // console.log(extname)
      // this.fileList.splice(1,0,extname)
      this.fileList=fileList;
      console.log(file);
      console.log(fileList);
      console.log(this.fileList)
      
      // this.getInfor()
      
    },
    
  },
  created(){
      this.getInfor()
     }
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #fff;
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
.el-input__inner {
  width: 300px;
}
.el-textarea__inner {
  width: 40%;
}
.shops_top{
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px;
}
.shops_top button{
    line-height: 0;
}
.shops{
    background: #fff;
    padding-bottom: 20px;
}
</style>
