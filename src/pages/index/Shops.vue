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
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>


  <el-form-item label="店铺头像">
   <el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:5000/shop/upload/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imgUrl" :src="'http://127.0.0.1:5000/upload/shop/'+imgUrl"  class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>


  <el-form-item label="店铺图片">
    <el-upload
  action="http://127.0.0.1:5000/shop/upload/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :on-success="successImg">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" v-if="dialogImageUrl" :src="'http://127.0.0.1:5000/upload/shop/'+dialogImageUrl" alt="">
</el-dialog>
   <!-- <el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:5000/shop/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="dialogImageUrl" :src="'http://127.0.0.1:5000/upload/shop/'+dialogImageUrl"  class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> -->
  </el-form-item>


  <el-form-item label="配送费">
         <input type="text" v-model="form.pic" class="el-input__inner">
  </el-form-item>


  <el-form-item label="配送时间">
         <input type="text" v-model="form.date" class="el-input__inner">
  </el-form-item>

   <el-form-item label="配送描述">
         <input type="text" v-model="form.describe" class="el-input__inner">
  </el-form-item>

     <el-form-item label="配送评分">
         <input type="text" v-model="form.score" class="el-input__inner">
  </el-form-item>

     <el-form-item label="配送销量">
         <input type="text" v-model="form.sales" class="el-input__inner">
  </el-form-item>


  <el-form-item label="活动">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
      <el-checkbox label="VC无限橙果汁全场八折" name="type"></el-checkbox>
      <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
      <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
      <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  

    <el-form-item label="营业时间">
        <el-time-picker
    is-range
    v-model="value1"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>
  <!-- <el-time-picker
    v-model="value1"
    :picker-options="{
      selectableRange: '8:30:00 - 20:30:00'
    }"
    placeholder="任意时间点">
  </el-time-picker>
  <el-time-picker
    arrow-control
    v-model="value2"
    :picker-options="{
      selectableRange: '8:30:00 - 20:30:00'
    }"
    placeholder="任意时间点">
  </el-time-picker> -->
  </el-form-item>
</el-form>
        </div>
</template>

<script>
import {API_SHOP_INFO,API_SHOP_EDIT} from "@/api/apis"
export default {
  data() {
    return {
      form: {
        name: "",
        pic: "",
        date: "",
        describe: "",
        score: "",
        sales: "",
        type: [],
        desc: ""
      },
      imgUrl:"",
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      value1:"",
      // value2: "",
      id:"",
    };
  },
  methods: {
    onSubmit() {
      
     API_SHOP_EDIT(
       this.id,
        this.form.name,//店铺名称
         this.form.desc,//店铺公告
        //  this.form.imgUrl,//
         this.form.pic,
         this.form.date,
         this.form.describe,
         this.form.score,
         this.form.sales,
         this.form.type,
         this.value1,
        //  this.form.dialogImageUrl,
     ).then(res=>{
       console.log(res)
      //  console.log(this.value1)
      console.log(       
        this.id,
        this.form.name,//店铺名称
         this.form.desc,//店铺公告
        //  this.form.imgUrl,//
         this.form.pic,
         this.form.date,
         this.form.describe,
         this.form.score,
         this.form.sales,
         this.form.type,
         this.value1,)
     })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传成功
    successImg(file){
       console.log(file)
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
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file)
    },
    
  },
  created(){
   API_SHOP_INFO().then( res=>{
     console.log(res)
     this.form.name = res.data.data.name;
     this.form.desc=res.data.data.bulletin;
     this.imgUrl=res.data.data.avatar;
    //  this.imageUrl=res.data.data.avatar
    //  this.dialogImageUrl=res.data.data.pics
    res.data.data.pics.forEach(v=>{
     this.dialogImageUrl=v
     });
     this.form.pic=res.data.data.deliveryPrice;
     this.form.describe=res.data.data.description;
     this.form.date=res.data.data.deliveryTime;
     this.form.score=res.data.data.score;
     this.form.sales=res.data.data.sellCount;
     this.form.type=res.data.data.supports;
     this.value1 = res.data.data.date
     this.id=res.data.data.id
   } )
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
