<template>
<div class="order_form">
   <div class="demo-input-size">
<el-form ref="form" :model="form" label-width="80px">
<div class="form_top">
    <el-form-item label="订单号">
    <el-input v-model="form.orderNo" placeholder="订单号"></el-input>
  </el-form-item>
    <el-form-item label="收货人">
    <el-input v-model="form.consignee" placeholder="收货人"></el-input>
  </el-form-item>
    <el-form-item label="手机号">
    <el-input v-model="form.phone" placeholder="手机号"></el-input>
  </el-form-item>
  <el-form-item label="订单状态">
    <el-select v-model="form.orderState" placeholder="订单状态">
      <el-option label="已受理" value="已受理"></el-option>
      <el-option label="已完成" value="已完成"></el-option>
      <el-option label="派送中" value="派送中"></el-option>
    </el-select>
  </el-form-item>
</div>
  <el-form-item label="选择时间">
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button type="primary" @click="onSubmit">查询</el-button>
     <!-- <el-form-item>
  </el-form-item> -->
  </el-form-item>
</el-form>
</div>
<el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="orderNo"
      label="订单号"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="orderTime"
      label="下单时间"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="phone"
      label="手机号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="consignee"
      label="收货人"
      width="120">
    </el-table-column>
        <el-table-column
      prop="deliverAddress"
      label="配送地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="deliveryTime"
      label="送达时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注"
      width="120">
    </el-table-column>
   <el-table-column
      prop="orderAmount"
      label="订单金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="orderState"
      label="订单状态"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="page" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>


   <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
    <p><i>订单号：</i><input type="text" v-model="editForm.orderNo"></p>
    <p><i>下单时间:</i>
    <el-time-select
  v-model="editForm.orderTime"
  :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30',
  }"
  placeholder="选择时间">
        </el-time-select>
    </p>
    <p><i>电话:</i><input type="text" v-model="editForm.phone"></p>
    <p><i>收货人:</i><input type="text" v-model="editForm.consignee"></p>
    <p><i>送货地址:</i><input type="text" v-model="editForm.deliverAddress"></p>
    <p><i>送达时间:</i>
    <el-time-select
  v-model="editForm.deliveryTime"
  :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30'
  }"
  placeholder="选择时间">
</el-time-select></p>
    <p><i>备注:</i><input type="text" v-model="editForm.remarks"></p>
    <p><i>订单金额:</i><input type="text" v-model="editForm.orderAmount"></p>
    <p><i>订单状态:</i>   
       <el-select v-model="editForm.orderState" placeholder="订单状态">
      <el-option label="已受理" value="已受理"></el-option>
      <el-option label="已完成" value="已完成"></el-option>
      <el-option label="派送中" value="派送中"></el-option>
          </el-select>
      </p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="edit_btn">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>


<script>
import { API_ORDER_LIST, API_ORDER_SEARCH ,API_ORDER_EDIT} from "@/api/apis";
export default {
  data() {
    return {
      form: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: ""
      },
      editForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderTime: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: ""
      },
      page: 1,
      deliveryTime: "",
      tableData: [
        {
          ordernumber: "123456",
          ordertime: "19:00",
          orderphone: "123466789",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          servicetime: "20:00",
          remarks: "微辣",
          orderamount: 108,
          orderstatus: "已受理"
        },
        {
          ordernumber: "123456",
          ordertime: "19:00",
          orderphone: "123466789",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          servicetime: "20:00",
          remarks: "微辣",
          orderamount: 108,
          orderstatus: "已受理"
        },
        {
          ordernumber: "123456",
          ordertime: "19:00",
          orderphone: "123466789",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          servicetime: "20:00",
          remarks: "微辣",
          orderamount: 108,
          orderstatus: "已受理"
        },
        {
          ordernumber: "123456",
          ordertime: "19:00",
          orderphone: "123466789",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          servicetime: "20:00",
          remarks: "微辣",
          orderamount: 108,
          orderstatus: "已受理"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      pageSize: 5,
      total: 10,
      centerDialogVisible: false,
      id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 查询
    onSubmit() {
      API_ORDER_SEARCH(
        this.page,
        this.pageSize,
        this.form.orderNo,
        this.form.consignee,
        this.form.phone,
        this.form.orderState,
        this.data
      ).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    // 编辑
    editClick(row) {
      this.centerDialogVisible = true;
      this.id = row.id;
      console.log(row.id)
    },
    // 确定编辑
    edit_btn() {
      API_ORDER_EDIT(
        this.id,
        this.editForm.orderNo,
        this.editForm.orderTime,
        this.editForm.phone,
        this.editForm.consignee,
        this.editForm.deliverAddress,
        this.editForm.deliveryTime,
        this.editForm.remarks,
        this.editForm.orderAmount,
        this.editForm.orderState,
      ).then(res=>{
        if(res.data.code==0){
           this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getData()
        }
      })
    },
    // 获取订单详情
    handleClick(row) {
      this.$router.push("/index/order_detail");
      sessionStorage.order_detail_id = row.id;
      // console.log(row);
    },

    sizeChange(val) {
      this.pageSize = val;

      this.getData();
      // console.log(`每页 ${val} 条`);
    },
    //分页：跳转页码时触发
    pageChange(val) {
      this.page = val;
      this.getData();
      // console.log(`当前页: ${val}`);
    },
    getData() {
      API_ORDER_LIST(this.page, this.pageSize).then(res => {
        // console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  }
};
</script>
<style>
.form_top {
  display: flex;
}
.form_top input {
  width:180px;
}
.el-col-11 {
  width: 30%;
}
.el-button {
  margin-left: 20px;
}
.el-table .cell {
  padding-right: 0;
}
.el-popper[x-placement^="bottom"] {
  margin-left: 130px;
}
.el-dialog i {
  display: inline-block;
  width: 75px;
}
.el-input__icon {
  width: 0;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 160px;
}
.el-icon-time:before{
  display: none;
}
.el-input{
  width: 160px;
}
.el-dialog--center p{
  margin: 10px 0;
}
</style>
