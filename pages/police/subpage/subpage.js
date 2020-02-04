// pages/police/subpage/subpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    two:['二级','二级B'],
    three:['三级','三级B'],
    array: ['是', '否'],
    rea:['人为拔电','机器损坏'],
    Solve: ['是','否'],
    tipHide: false,
    chooseTypeHide: true,
    chooesImage: [],
    chooesVideo: '',
    playVideo: false
  },
  // -------------------------------------提交问题反馈==============================================
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      display: e.detail.value
    })
  },
  // ------------------------------------------二级故障--------------------------------------------------
  two: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      twodata: e.detail.value
    })
  },
  // ----------------------------------------三级故障--------------------------------------------------------
  three: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      threedata: e.detail.value
    })
  },
  reason:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      item: e.detail.value
    })
  },
  upload: function () {
    let that = this;
    wx.chooseMedia({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      maxDuration: 30,
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          wx.uploadFile({
            url: app.URL,//这里输入你的接口路径
            filePath: tempFilePaths[i],//上面的文件路径
            name: 'img',//这个需要找后台拿，传入服务器的名字
            header: {
              "Content-Type": "multipart/form-data",
            },
            success: function (res) {
              console.log("k", res)
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) {
                }
              })
            }
          });
        }

      }
    })
  },
  Solve:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      solvedata: e.detail.value
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
    })
  },
  /**
   * 长按删除图片
   */
  deleteImage: function (e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  submission:function(){
    console.log(1)
    wx.switchTab({
        url: '../police',
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