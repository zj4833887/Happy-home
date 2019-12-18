// pages/login/login.js
let { _get } = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    show: false,
    staffId:'',
    type:'',
    testnum:'',
    have:{}
    // getComputedName:''
  },
  onChangeShowState: function () {
    this.setData({
      showView: (!this.data.showView)
    })
  },
  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },
  obtain(){
    var value = wx.getStorageSync('testNum')
    let staffId=value.id;
    let type=1;
    _get('findStaffOrderStatus', { staffId,type}).then(res => {
      if (res.code == 200) {
        let have='';
        console.log(res.data)
        this.setData({
          have: res.data
        })
      }
    })
  },
  service() {
    var value = wx.getStorageSync('testNum')
    let staffId = value.id;
    let type = 2;
    _get('findStaffOrderStatus', { staffId, type }).then(res => {
      if (res.code == 200) {
        let have = '';
        console.log(res.data)
        this.setData({
          service: res.data
        })
      }
    })
  },
  completed(){
    var value = wx.getStorageSync('testNum')
    let staffId = value.id;
    let type = 3;
    _get('findStaffOrderStatus', { staffId, type }).then(res => {
      if (res.code == 200) {
        let have = '';
        console.log(res.data)
        this.setData({
          completed: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.obtain();
    this.service();
    this.completed();
    var that = this;
      wx.getStorage({
        key: "testNum",
        success: function (res) {
         that.testnum = res.data
          
        },
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
  onShareAppMessage: function () {}

  // },
  // search: function (e) {
  //   let query = wx.createSelectorQuery()                
  //   let a=query.select(".frame-box").boundingClientRect()
  //   query.exec((res) => {
  //     res[0].style.display.block                                          // #productServe节点的到页面顶部的距离
  //   })
  //   console.log(a);
  // }

})