<template>
    <div class="backstage">
    <!-- 左边菜单 -->
<el-container>
  <el-aside width="200px">
    <el-row class="tac">

  <el-col :span="12">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
      >

         
         <div v-for="item in newtreelist" :key="item.index">
           <!-- 如果有二级菜单          -->
       <el-submenu v-if="item.children" :index="item.index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
        <i :class="child.icon"></i>
        <span slot="title">{{child.title}}</span>
      </el-menu-item>
      </el-submenu>
          
           <!-- 一级菜单 -->
        <el-menu-item v-else :index="item.index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>


         </div>




    </el-menu>
  </el-col>
</el-row>
  
   <!-- 右边盒子 -->
  </el-aside>
  <el-container>
      <!-- 右边盒子--面包屑导航 -->
    <el-header>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
</el-breadcrumb>
<span @click="acc_btn">欢迎你,{{username}} <img :src="headImg"/> </span>
    </el-header>

    <!-- 右边主体内容 -->
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import { API_ACCOUNT_TOKEN_CHECK, API_ACCOUNT_INFOR } from "@/api/apis";
export default {
  data() {
    return {
      treelist: [
        {
          index: "/index/home",
          icon: "el-icon-setting",
          title: "首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/order",
          icon: "el-icon-setting",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "/index/goods",
          icon: "el-icon-location",
          title: "商品管理",
          role: ["super"],
          children: [
            { index: "/index/goods_list", icon: "", title: "商品列表" },
            { index: "/index/goods_add", icon: "", title: "商品添加" },
            { index: "/index/goods_classify", icon: "", title: "商品分类" }
          ]
        },
        {
          index: "/index/shops",
          icon: "el-icon-setting",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        {
          index: "/index/acc",
          icon: "el-icon-setting",
          title: "账号管理",
          role: ["super"],
          children: [
            { index: "/index/acc_list", icon: "", title: "账号列表" },
            { index: "/index/acc_add", icon: "", title: "添加账号" },
            { index: "/index/acc_alter", icon: "", title: "修改密码" }
          ]
        },
        {
          index: "/index/statistical",
          icon: "el-icon-location",
          title: "销售统计",
          role: ["super"],
          children: [
            { index: "/index/goods_statistical", icon: "", title: "商品统计" },
            { index: "/index/order_statistical", icon: "", title: "订单统计" }
          ]
        }
      ],
      username: "",
      breadlist: ["首页"],
      headImg: ""
    };
  },

  computed: {
    newtreelist() {
      return this.treelist.filter(item =>
        item.role.includes(localStorage.role)
      );
    }
  },

  created() {
    API_ACCOUNT_TOKEN_CHECK(localStorage.token).then(res => {
      //  console.log(res)
      if (res.data.code == 0) {
        this.username = localStorage.getItem("admin");
      } else {
        this.$router.push("/");
      }
    });
    window._indexthis = this;
    API_ACCOUNT_INFOR(localStorage.id).then(res => {
      this.headImg = res.data.accountInfo.imgUrl;
    });
  },
  watch: {
    $route: {
      handler: val => {
        window._indexthis.changeBread(val.path);
      },
      deep: true
    }
  },
  // mounted() {
  //   this.username = localStorage.getItem("admin");
  // },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //账号信息
    acc_btn() {
      this.$router.push("/index/acc_infor");
    },
    changeBread(hash) {
      let arr = [];
      switch (hash) {
        case "/index/home":
          arr = ["首页"];
          break;
        case "/index/shops":
          arr = ["店铺管理"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
                  case "/index/order_detail":
          arr = ["订单管理","订单详情"];
          break;
        case "/index/goods_list":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/goods_add":
          arr = ["商品管理", "添加商品"];
          break;
        case "/index/goods_edit":
          arr = ["商品管理", "编辑商品"];
          break;
        case "/index/goods_classify":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/acc_list":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/acc_add":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/acc_change":
          arr = ["账号管理", "修改账号"];
          break;
        case "/index/acc_alter":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/acc_infor":
          arr = ["账号管理", "账号信息"];
          break;
        case "/index/goods_statistical":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/order_statistical":
          arr = ["销售统计", "订单统计"];
          break;
      }
      this.breadlist = arr;
    }
  }
};
</script>

<style scoped>
.el-main {
  background: #ccc;
}
.el-menu-item {
  padding-left: 0px;
}
.el-row {
  width: 200px;
}
.el-col-12 {
  width: 100%;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: rgb(84, 92, 100);
}
.backstage {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  background: #fff;
}
.el-header img {
  width: 40px;
  border-radius: 50%;
}
.el-header span {
  display: flex;
  align-items: center;
}
.el-menu {
  border-right: none;
}
</style>