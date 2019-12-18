// pages/my/working/cycle/cycle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all: false,
    listData: [
      { code: "星期日", text: "星期日" },
      { code: "星期一", text: "星期一" },
      { code: "星期二", text: "星期二" },
      { code: "星期三", text: "星期三" },
      { code: "星期四", text: "星期四" },
      { code: "星期五", text: "星期五" },
      { code: "星期六", text: "星期六" }
    ],
    batchIds: '', 
    batch:''
  },
  checkboxChange: function (e) {
    this.setData({
      batchIds: e.detail.value  //单个选中的值
    })
  },
  selectall: function (e) {
    var that = this;
    var arr = [];   //存放选中id的数组
    console.log(this)
    arr = this.data.batchIds;
    
    wx.setStorageSync('arr', arr);
    wx.navigateBack({
      url: '/pages/my/working/myworking/myworking',
      delta: 1
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