// pages/login/login.js
let { _post,_get} = require('../../utils/http.js')
var commonMixin = require('../../utils/model.js')
var WxValidate = require('../../utils/WxValidate.js')
Page(Object.assign({
  /**
   * 页面的初始数据
   */data:{
     user:'18406567112',
     code:'123456',
     account:'',
     password:'',
     userPhone:'',
     type:1
   },

  next:function(e){
   let account = this.data.login.username
   let password = this.data.login.password
   let type=1
    _post('login', { account, password, type}).then(res => {
      if (res.code == 0) {
        wx.switchTab({
          url: '/pages/index/index'
        })
        
      }
    })
    
      console.log(1)
  },
  verification:function(){
   
    let userPhone = this.data.login.user
    wx.showToast({
      title: '获取验证码成功',
    })
    _post('getCode', {userPhone}).then(res => {
      if (res.code == 200) {
        this.setData({
        })
      }
    })
  },
  service:function(e){
    let phone = this.data.user
    let code = this.data.code
    _get('appletLogin', { phone, code }).then(res => {
      if (res.code == 200) {
        console.log(res)
        var name = res.staff.name;
        var Num = res.staff.shopid;
        var id = res.staff.id
        wx.setStorage({//存储到本地
          key: "testNum",
          data: {Num, name,id}
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
        this.setData({
        })
      }
    })


  },
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
}, commonMixin))