// pages/my/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['中国', '美国', '巴西', '俄罗斯'],
    character:['1','2'],
    religion:['s','1'],
    cuisine:['1','2'],
    culture:['0','0'],
    language:['y','y'],
    result: ['a', 'b'],
    home:['住家','不住家']
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  character: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      a: e.detail.value
    })
  },
  religion: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      b: e.detail.value
    })
  },
  cuisine: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      c: e.detail.value
    })
  },
  culture: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      d: e.detail.value
    })
  },
  language: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  home: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      home: e.detail.value
    })
  },
  onChange(event) {
    this.setData({
      result: event.detail
    });
  },
  selectall: function (e) {
    wx.navigateBack({
      delta: 1,
      url: '/pages/entry/entry',
    })
  },
  // 多选
  
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