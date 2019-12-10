// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isHidden:true
  },
  toggleHidden(){
    let flag=!this.data.isHidden;
    this.setData({
      isHidden:flag
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