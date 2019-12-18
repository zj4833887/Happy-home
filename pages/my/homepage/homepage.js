// pages/my/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled: true,  //表示页面加载完成时disabled为启用状态
    text: "编辑"  //表示按钮初始文字为编辑
  },
  changeInfo(e) {   //点击事件发生时
  console.log(1)
    //一定要写成this.data.isDisabled，不然判断出不来
    if (!this.data.isDisabled) {   //当disabled=false时
      this.setData({
        isDisabled: true,  //修改isDisabled的值为true（即启用状态）
        text: "编辑"    //文字修改为“编辑”
      })
    }
    else {    //当disabled=true时
      this.setData({
        isDisabled: false,    //修改isDisabled的值为false（即禁用状态）
        text: "保存"   //文字修改为“保存”
      })
    }
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