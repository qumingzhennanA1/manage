<template>
    
    <el-form ref="form" :model="form" label-width="80px" class="goods_add_form">
  <el-form-item label="商品名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item label="产品分类">
    <el-select v-model="form.region" placeholder="请产品分类">
      <el-option label="水果" value="水果"></el-option>
      <el-option label="零食" value="零食"></el-option>
    </el-select>
      </el-form-item>
    
  <el-form-item label="商品价格">
  <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" id="pic_input"></el-input-number>
  </el-form-item>


 <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :data="imgdata"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

  <el-form-item label="商品描述">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import { API_GOODS_ADD } from "@/api/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        resource: "",
        desc: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      num: 1,
      imgUrl: "",
       imgdata: { imgUrl: "" },
    };
  },
  mounted() {},
  methods: {
    // 添加商品
    onSubmit() {
      console.log(this.imgUrl)
      API_GOODS_ADD(
        this.form.name,
        this.form.region,
        JSON.stringify(this.num),
        this.imgUrl,
        this.form.desc
      ).then(res => {
        console.log(res);
      });
    },

    handleChange(value) {
      console.log(value);
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imgUrl = res.imgUrl;
      // this.imageUrl = URL.createObjectURL(file.raw);
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

<style>
.el-input__inner {
  width: 180px;
}
.el-textarea__inner {
  width: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* background: #fff; */
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
.goods_add_form {
  background: #fff;
  padding: 30px 0 10px 10px;
}
</style>
