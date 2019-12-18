// pages/my/working/myworking/myworking.js
const app = getApp()
const date = new Date();
const hours = [];
const minutes = [];
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['全职', '兼职'],
    showView: true,
    time: '',
    multiArray: [hours, minutes],
    multiIndex: [ 10, 17],
    choose_year: '',
     animationData: {}, //内容动画
    animationMask: {}, //蒙板动画,
    arr: '',
    zhi:'',
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime()
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  onChangeShowState: function () {
    this.setData({
      showView: (!this.data.showView)
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const hour = this.data.multiArray[0][index[0]];
    const minute = this.data.multiArray[1][index[1]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: hour + ':' + minute
    })
    console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var zhi = '';
    zhi=e.detail.value
    wx.setStorageSync('zhi', zhi);
    this.setData({
      index: e.detail.value
    })
  },
  selectall: function (e) {
    var that = this;
    var arr = [];   //存放选中id的数组
    var array=[];
    array = e.detail.value;
    arr = this.options.arr;
    wx.redirectTo({
      url: '/pages/my/working/working?arr=' + arr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = wx.getStorageSync('arr');//wx.getStorageSync(key)，获取本地缓存
    this.setData({
      arr: arr
    }) ;
    console.log(arr)
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
    var arr = wx.getStorageSync('arr');
    this.setData({
      arr: this.options.arr
    })
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