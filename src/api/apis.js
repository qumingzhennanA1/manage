import axios from "axios"

export const SEVER_IP = "http://127.0.0.1:5000"

//商店图片上传接口
export const SHOP_UPLOAD_IMG = SEVER_IP + '/shop/upload'
//店铺图片地址
export const SEVER_SHOP_IMG = SEVER_IP+'/upload/shop/'

axios.defaults.baseURL=SEVER_IP



// 登录 
//account 用户名
//password  密码
export const API_LOGIN = (account, password) => axios.post("/users/checkLogin", { account, password })


//添加账号
//account 用户名
//password  密码
//userGroup  用户组
export const API_ACCOUNT_ADD = (account, password, userGroup) => axios.post("/users/add", { account, password, userGroup })

// 获取账号列表
//currentPage  当前页码
//pageSize     每页条数
export const API_ACCOUNT_LIST = (currentPage, pageSize) => axios.get("/users/list", { params: { currentPage, pageSize } })


//删除账号
export const API_ACCOUNT_DEL = (id) => axios.get("/users/del", { params: { id } })


// 批量删除
export const API_ACCOUNT_DEL_ALL = (ids) => axios.get("/users/batchdel", { params: { ids } })

// 修改密码
export const API_ACCOUNT_CHANGE = (id, account, userGroup) => axios.post("/users/edit", { id, account, userGroup })


// 检查旧密码是否正确
// oldPwd 旧密码
export const API_ACCOUNT_OLDPWD = (oldPwd, id) => axios.get("/users/checkoldpwd", { params: { oldPwd, id } })

// 修改密码
export const API_ACCOUNT_NEWPWD = (newPwd, id) => axios.post("/users/editpwd", { newPwd, id })


// 验证token是否过期

export const API_ACCOUNT_TOKEN_CHECK = (token) => axios.get("/users/checktoken", { params: { token } })


// 获取账号（个人中心）信息
export const API_ACCOUNT_INFOR = (id) => axios.get("/users/accountinfo", { params: { id } })


// 上传图片
export const API_ACCOUNT_IMG = (id) => axios.post("/users/avatar_upload", { id })
// 添加分类
// cateName  分类名称
// state  是否启用
export const API_GOODS_ADDCATE = (cateName, state) => axios.post("/goods/addcate", { cateName, state })


// 获取分类
// currentPage  当前页
// pageSize 每页条数

export const API_GOODS_CATELIST = (currentPage, pageSize) => axios.get("/goods/catelist", { params: { currentPage, pageSize } })

// 删除分类
export const API_GOODS_DELCATE = (id) => axios.get("/goods/delcate", { params: { id } })


// 修改分类
export const API_GOODS_EDITCATE = (id, cateName, state) => axios.post("/goods/editcate", { id, cateName, state })

// 查询所有商品分类

export const API_GOODS_CATEGORIES = () => axios.get("/goods/categories", { params: {} })


// 商品图片
export const API_GOODS_IMG = () => axios.post("/goods/goods_img_upload", {})

// 添加商品
// name  商品名称
// category  商品分类
// price  商品价格
// imgUrl 商品图片地址
// goodsDesc 商品描述
export const API_GOODS_ADD = (name, category, price, imgUrl, goodsDesc) => axios.post("/goods/add", { name, category, price, imgUrl, goodsDesc })

// 删除商品
export const API_GOODS_DEL = (id) => axios.get("/goods/del", { params: { id } })

// 19.获取商品列表
export const API_GOODS_LIST = (currentPage, pageSize) => axios.get("/goods/list", { params: { currentPage, pageSize } })

// 21.修改商品
export const API_GOODS_EDIT = (name, category, price, imgUrl, goodsDesc, id) => axios.post("/goods/edit", { name, category, price, imgUrl, goodsDesc, id })


// 22.获取订单列表
export const API_ORDER_LIST = (currentPage, pageSize) => axios.get("/order/list", { params: { currentPage, pageSize } })

// 23.查询
// currentPage	当前页码
// pageSize	每页条数
// orderNo		订单号
// consignee	收货人
// phone	    手机号
// orderState		是订单状态
// date		时间范围，字符串格类型如: ["2019-10-05 00:00:00", "2019-10-10 00:00:00"]
export const API_ORDER_SEARCH = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get("/order/search", { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// 获取订单详情
export const API_ORDER_DETAIL = (id) => axios.get("/order/detail", { params: { id } })


// 25.修改订单
// id	是要修改账号的id
// orderNo	是订单号
// orderTime	是下单时间
// phone	是电话
// consignee	是收货人
// deliverAddress	是送货地址
// deliveryTime	是送达时间
// remarks	是备注
// orderAmount	是订单金额
// orderState 是订单状态
export const API_ORDER_EDIT = (id, orderNo, orderTime, phone, consignee, deliverAddress,deliveryTime,remarks,orderAmount,orderState) => axios.post("/order/edit", { id, orderNo, orderTime, phone, consignee, deliverAddress,deliveryTime,remarks,orderAmount,orderState})

// 26.获取店铺详情
export const API_SHOP_INFO = () => axios.get("/shop/info", { })

// 29.首页报表接口
export const API_ORDER_TOTAL = () => axios.get("/order/totaldata", {})

// 28.店铺内容修改
// id		店铺id
// name	店铺名称
// bulletin 店铺公告
// avatar	店铺头像
// deliveryPrice	起送价格
// deliveryTime	送达时间
// description		店铺描述
// score	店铺好评率
// sellCount	店铺销量
// supports	活动支持
// date 营业时间
// pics
export const API_SHOP_EDIT = (params) => axios.post("/shop/edit",  params)
// 30.订单报表接口
export const API_ORDER_ORDERTOTAL = (date) => axios.get("/order/ordertotal", { params: { date } })
