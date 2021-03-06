// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    city:['今天','明天'],
    market:['北京','南京']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onSearch() {
    Toast('搜索' + this.data.value);
  },

  onClick() {
    Toast('搜索' + this.data.value);
  },
  open:function(){
    wx.navigateTo({
      url: '../details/devicebymall/devicebymall'//实际路径要写全
    })
  },
  bindPickerChange: function (e) {
    let index = e.detail.value
    let city = this.data.city
    this.setData({
      index,
      default: city[index]
    })
  },
  city:function(e){
    let index = e.detail.value
    let market = this.data.market
    this.setData({
      index,
      default: market[index]
    })
  },
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