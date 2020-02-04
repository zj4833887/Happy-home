let { _post, _get } = require('../../utils/http.js')
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    phone:''
    
  },
  phone:function(e){
    console.log(e.detail)
  },
  send: function () {
    console.log(1)
  },
  next:function(){
    let phone='';
    console.log(phone)
    // _post('login', { account, password, type }).then(res => {
    //   if (res.code == 0) {
    //     wx.switchTab({
    //       url: '/pages/index/index'
    // that.globalData.token = res.data.data.token;
    //     })

    //   }
    // })
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
})