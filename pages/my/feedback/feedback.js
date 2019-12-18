// pages/my/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      min: 0,
      max: 200,
      array: [ '中国', '巴西', '日本'],

  }, 
  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    // console.log(value)
    if (len > this.data.max) return;
    this.setData({
      currentWordNumber: len
    });
    if (this.data.currentWordNumber == 200) {
      wx.showModal({
        title: '提示',
        content: '您输入的次数已达上限',
      })
    }
  },
  bindPickerChange: function (e) {
    console.log(e.detail)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  selectall: function (e) {
    wx.redirectTo({
      url: '/pages/my/leave/le/succes/succes',
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