let { _get,_post } = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
    natarray: ['壮族', '藏族', '裕固族'],
    region: '',
    date: ['2016-06-07'],
    inf:''
  },
  // bindPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
  nation:function(e){
    console.log('111', e.detail.value)
    this.setData({
      natindex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // e.detail.value = res.data.detailedAddress
    console.log(e.detail.code)
    this.setData({
      region: e.detail.value
    })
  },
  goNext(e) {
    // wx.redirectTo({
    //   url: '/pages/entry/entry'//跳转
    // })
    var value = wx.getStorageSync('testNum')
    let staffId = value.id;
    let region = region
    console.log(region)
    _post('updateStaffApplet', {}).then(res=>{
      if (res.code == 200) {
        console.log(res)
      }
    })

  },
  obtain() {
    var value = wx.getStorageSync('testNum')
    let staffId = value.id;
    _get('findStaffApplet', { staffId }).then(res => {
      if (res.code == 200) {
        let inf = '';
        let sex1 = res.data.staffSex;
        let birth = res.data.staffIdentity;
        let region = res.data.staffNativePlace;
        let staffNation =res.data.staffNation
        let natarray = res.data.staffNation
        console.log(natarray)
        birth =birth.slice(6,14)
        // addres = addres.slice(6,50)
        if (sex1=2){
          sex1 ="男"
        }{
          sex1="女"
        }
        this.setData({
          inf: res.data,
          sex1:sex1,
          date: birth,
          region: region,
          staffNation: staffNation,
          natarray: natarray
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  watch: {
    name: function (newValue) {
      console.log(newValue); // name改变时，调用该方法输出新值。
    }
  },

  onLoad: function (options) {
    this.obtain();
    this.goNext();
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