<template>
    <div class="acc_list">
    
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    
            <el-table-column type="selection" width="55">
    
            </el-table-column>
    
            <el-table-column label="账号" width="120">
    
                <template slot-scope="scope">{{ scope.row.account }}
</template>
    </el-table-column>
    <el-table-column
      prop="userGroup"
      label="用户组"
      width="120">
    </el-table-column>
    <el-table-column
      prop="ctime"
      label="创建时间"
      show-overflow-tooltip>
    </el-table-column>
         <el-table-column
      prop="imgUrl"
      label="账号头像"
      width="120">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
   <el-button
          size="mini"
          type="danger"
          slot="reference"
          @click="delBtn(scope.row)" >删除</el-button>
          
      </template>
    </el-table-column>
  </el-table>

   <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>

  <div style="margin-top: 20px">
    <el-button type="danger" @click="delAllBtn">批量删除</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
     </div>
</template>

<script>
import {
  API_ACCOUNT_LIST,
  API_ACCOUNT_DEL,
  API_ACCOUNT_DEL_ALL
} from "@/api/apis.js";
// import {  } from "@/api/apis.js";
export default {
  data() {
    return {
      tableData: [
        {
          account: "王小虎",
          group: "管理员",
          ctime: "2016-05-03"
        },

        {
          account: "王小虎",
          group: "管理员",
          ctime: "2016-05-03"
        },

        {
          account: "王小虎",
          group: "超级管理员",
          ctime: "2016-05-03"
        },

        {
          account: "王小虎",
          group: "超级管理员",
          ctime: "2016-05-03"
        },

        {
          account: "王小虎",
          group: "超级管理员",
          ctime: "2016-05-03"
        },

        {
          account: "王小虎",
          group: "管理员",
          ctime: "2016-05-03"
        },

        {
          account: "王小虎",
          group: "普通管理员",
          ctime: "2016-05-03"
        }
      ],
      total: 0, //总页数
      page: 1, //当前页数
      pageSize: 10, //每页现实条数

      multipleSelection: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //批量删除
    delAllBtn() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //  console.log( this.$refs.multipleTable )
        //  console.log( this.$refs.multipleTable.selection )
        let accArr = [];
        this.$refs.multipleTable.selection.forEach(v => {
          // console.log(v)
          accArr.push(v.id);
        });
        if (accArr.length == 0) return;
        API_ACCOUNT_DEL_ALL(JSON.stringify(accArr)).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "批量删除成功",
              type: "success"
            });
            this.getData();
          }
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(row) {
      console.log(row);
      sessionStorage.setItem("changid", row.id);
      this.$router.push("/index/acc_change");
    },
    //删除账号
    delBtn(row) {
      this.$confirm("确定删除该数据? ? ?, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_ACCOUNT_DEL(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getData();
          }
        });
      });

      // alert(111111)
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
      console.log(`当前页: ${val}`);
    },
    getData() {
      API_ACCOUNT_LIST(this.page, this.pageSize).then(res => {
        //  console.log(res)
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  }
};
</script>


<style scoped>
.acc_list {
  background: #fff;
}
.el-button--danger {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
