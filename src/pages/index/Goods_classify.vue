<template>
   <div class="classify_box">
       <p class="title"><span>商品分类</span>  <el-button type="primary" @click="goods_add_btn">添加分类</el-button></p>
         <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="序号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分类名称"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.cateName }}</el-tag>
          </div>
      </template>
    </el-table-column>


    <el-table-column
      label="是否启用"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium"><el-switch v-model="scope.row.delivery"></el-switch></el-tag>
            <!-- <el-tag size="medium">{{scope.row.name}}</el-tag> -->
          </div>
      </template>
    </el-table-column>

    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>

   <!-- 添加商品模态框 -->
   <div :style="{display:stylebox}" class="edit_box">
     <h3>添加分类</h3>
     <p>商品分类 <input type="text" v-model="cateName"></p>

    <p>是否启用<el-switch v-model="tableData.delivery"></el-switch>
</p>
     <p><button @click="addcate">确定</button><button @click="cancel_goods">取消</button></p>
   </div>
  
   <!-- 编辑分类模态框 -->
   
    <div :style="{display:styleboxs}" class="edit_boxs">
     <h3>修改分类</h3>
     <p>商品分类 <input type="text" v-model="cateName"></p>

    <p>是否启用<el-switch v-model="tableData.delivery"></el-switch>
  </p>
     <p><button @click="editcate">确定</button><button @click="edit_cancel_goods">取消</button></p>
   </div>


   </div>

</template>

<script>
import {
  API_GOODS_CATELIST,
  API_GOODS_ADDCATE,
  API_GOODS_DELCATE,
  API_GOODS_EDITCATE,
  API_GOODS_CATEGORIES
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "水果",
          address: "上海市普陀区金沙江路 1518 弄",
          delivery: false
        },
        {
          id: 2,
          name: "水果",
          address: "上海市普陀区金沙江路 1517 弄",
          delivery: false
        },
        {
          id: 3,
          name: "饮料",
          address: "上海市普陀区金沙江路 1519 弄",
          delivery: false
        },
        {
          id: 4,
          name: "饮料",
          address: "上海市普陀区金沙江路 1516 弄",
          delivery: true
        }
      ],
      stylebox: "none",
      styleboxs: "none",

      currentPage1: 1, //当前页
      total: 20, //总页数
      pageSize: 5, //每页条数
      cateName: "", //添加分类
      editId:""
    };
  },
  methods: {
    //编辑商品
    handleEdit(index, row) {
      this.styleboxs="block";
      this.editId=row.id
      console.log(index, row);
    },
    // 删除商品
    handleDelete(row) {
      console.log(row);

      this.$confirm("确定删除该数据? ? ?, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_GOODS_DELCATE(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getDoodsList();
          }
        });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDoodsList();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.getDoodsList();
      // console.log(`当前页: ${val}`);
    },
    // 添加分类
    goods_add_btn() {
      this.stylebox = "block";
    },
    //获取分类
    getDoodsList() {
      API_GOODS_CATELIST(this.currentPage1, this.pageSize).then(res => {
        // console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 添加分类
    addcate() {
      API_GOODS_ADDCATE(this.cateName, this.tableData.delivery).then(res => {
        if (res.data.code == 0) {
          this.stylebox = "none";
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getDoodsList();
        }
      });
    },
    // 取消
    cancel_goods() {
      this.stylebox = "none";
    },
    // 修改分类
    editcate(){
     API_GOODS_EDITCATE(this.editId,this.cateName,this.tableData.delivery).then( res =>{
      //  console.log(res)
      if(res.data.code==0){
        this.stylebox = "none";
          this.$message({
            message: "修改成功",
            type: "success"
          });
            this.styleboxs="none";
            this.getDoodsList()
      }
         
      
     } )
    },
    // 取消修改
    edit_cancel_goods(){
       this.styleboxs="none";
    }
  },
  created() {
    this.getDoodsList();
    //查询所有商品分类
    API_GOODS_CATEGORIES().then(res=>{
      console.log(res)
    })
  }
};
</script>

<style>
.classify_box {
  background: #fff;
  padding: 20px;
  position: relative;
}
.title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.el-button {
  padding: 6px 10px;
}
.el-tag {
  border-style: none;
  background-color: #fff;
}
.edit_box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -130px 0 0 -200px;
  width: 270px;
  height: 110px;
  border: 1px solid #000;
  text-indent: 1em;
  padding: 10px;
  z-index: 888;
  background: yellowgreen;
}
.edit_box p {
  line-height: 30px;
}
.edit_box p button {
  margin-left: 50px;
}


.edit_boxs {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -130px 0 0 -200px;
  width: 270px;
  height: 140px;
  border: 1px solid #000;
  text-indent: 1em;
  padding: 20px;
  z-index: 888;
  background: #fff;
}
.edit_boxs p {
  line-height: 40px;
}
.edit_boxs p button {
  margin-left: 50px;
}
</style>
