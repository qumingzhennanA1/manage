<template>
  <div class="goods_list_box">
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品 价格"
      prop="price">
    </el-table-column>
    <el-table-column label="商品 图片"
    >
      <template>
     <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+imgUrl" width="50px"/>
</template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="goodsDesc">
    </el-table-column>
       <el-table-column
      label="操作"
      prop="desc">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { API_GOODS_LIST,API_GOODS_DEL } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      currentPage1: 1, //当前页
      total: 10, //总页数
      pageSize: 5, //每页条数
      imgUrl: ""
    };
  },
  methods: {
    handleEdit(row) {
      console.log(row);
      sessionStorage.goodEditId=row.id
      this.$router.push("/index/goods_edit")
    },
    // 删除商品
    handleDelete(row) {
          this.$confirm("确定删除该数据? ? ?, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_GOODS_DEL(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getData();
          }
        });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.getData();
      console.log(`当前页: ${val}`);
    },
    getData() {
      API_GOODS_LIST(this.currentPage1, this.pageSize).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
        // this.imgUrl = res.data.data.imgUrl;
          res.data.data.forEach(v=>{
            console.log( v.imgUrl)
           this.imgUrl = v.imgUrl
          })
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>



<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.goods_list_box {
  background: #fff;
}
</style>
