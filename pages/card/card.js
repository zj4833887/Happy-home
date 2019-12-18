// pages/card/card.js
var timestamp =
  Date.parse(new Date());

timestamp = timestamp / 1000;

//获取当前时间

var n = timestamp *
  1000;

var date = new Date(n);

//年

var Y =
  date.getFullYear();

//月

var M = (date.getMonth()
  + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

//日

var D = date.getDate()
  < 10 ? '0' + date.getDate() :
  date.getDate();

//时

var h =
  date.getHours();

//分

var m =
  date.getMinutes();

//秒

var s =
  date.getSeconds();
console.log(h+':',m+':',s)
var a = h + ':'+ m+':'+ s
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    hide:false,
    time:null
  },
  onChangeShowState: function () {
    this.setData({
      showView: (!this.data.showView)
    })
  },
  onChange:function(){
    this.setData({
      hide: (!this.data.hide)
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time=a;
    this.setData({
      time:time
    })
    console.log(time)
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