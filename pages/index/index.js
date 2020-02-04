let { _post, _get } = require('../../utils/http.js')
var time = require('../../utils/data.js');
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
var sjc = time.formatTime(timestamp)
wx.setStorageSync('sjc', timestamp)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [
      { message: '城市数', }, { message: '商场数' }, { message: '设备数', }, { message: '已入驻' },
      { message: '待入驻', }, { message: '任务数' } 
    ],
    dat:[
      { data: '当日' }, { data: '本周' }, { data: '本月' }, { data: '累计'},
    ],
    site: [{ message: '计划巡检数' }, { message: '已完成' },
      { message: '未完成' }, { message: '完成率' }
      ],
    situation: [{ message: '未完成' }, { message: '已完成' }, { message: '任务数' }, { message: '完成率' }],
    market: [{ data: '商场' }, { data: '设备' }],
    task: [{ data: '安装' }, { data: '巡检' }, { data: '校验' }, { data: '采集' }, { data: '排障' }, { data: '竞品' }, { data: '监播' }],
    problem:[{data:'日期'},{data:'问题数量'},{
      data: '已解决'
    },{ data: '未解决' }, { data: '完成率' }],
    date: sjc ,
  },
  // -----------------------------------------------------选择日期------------------------------------------------------
  bindDateChange: function (e) {
    let sjc = e.detail.value
    let timestamp = e.detail.value;
        timestamp = Date.parse(new Date(timestamp));
    timestamp = timestamp / 1000;
    wx.setStorageSync('sjc', timestamp)
    _get('stat' + '/' + sjc, { sjc }).then(res => {
      if (res.result == "ok") {
        let data = res.data;
        this.setData({
          data: data,
          date: sjc
        })
      }
    })
    this.setData({
      date: sjc,
    })
    this.setData({
      date: e.detail.value
    })
  },
  // ------------------------------------------------------减日期--------------------------------------------------------------------------
  reduce: function (date,e){
    var timestamp = wx.getStorageSync('sjc')
    var tomorrow_timetamp = timestamp - 24 * 60 * 60; 
    // var sjc = tomorrow_timetamp;
    function  timestampToTime(timestamp) {
              var   date =  new  Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var  Y = date.getFullYear() +  '-';
              var  M = (date.getMonth() + 1 < 10 ?  '0' + (date.getMonth() + 1) : date.getMonth() + 1) +  '-';
              var D = (date.getDate() < 10 ? '0' + date.getDate(): date.getDate())
              return  Y + M + D;
        }
    wx.setStorage({
      key: "sjc",  // 存储的key值
      data: tomorrow_timetamp   // 需要存储的值
    });
    sjc = timestampToTime(tomorrow_timetamp);
    _get('stat' + '/' + sjc, { sjc }).then(res => {
      if (res.result == "ok") {
        let data = res.data;
        this.setData({
          data: data,
          date: sjc
        })
      }
      })
     this.setData({
       date: sjc,
     })
  },
  // -----------------------------------------------------加日期-----------------------------------------------------------------------
  plus:function(){
    var timestamp = wx.getStorageSync('sjc')
    var tomorrow_timetamp = timestamp + 24 * 60 * 60;
    var sjc = tomorrow_timetamp;
    function timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + M + D;
    }
    timestampToTime(sjc);
    sjc = timestampToTime(sjc);
    console.log(sjc)
    wx.setStorage({
      key: "sjc",  // 存储的key值
      data: tomorrow_timetamp   // 需要存储的值
    })
    sjc = timestampToTime(tomorrow_timetamp);
    _get('stat' + '/' + sjc, { sjc }).then(res => {
      if (res.result == "ok") {
        let data = res.data;
        this.setData({
          data: data,
          date: sjc
        })
      }
    })
    this.setData({
      date: sjc,
    })
  },
  // ---------------------------------------------跳转详情页--------------------------------------------------------------------
  jump:function(){
    wx.navigateTo({
      url: '../details/details'//实际路径要写全
    })
  },
  obtain:function(sjc){
    var timestamp = wx.getStorageSync('sjc')
    var timestamp = timestamp - 24 * 60 * 60;
    wx.setStorageSync('sjc', timestamp)
    function timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + M + D;
    }
    sjc = timestampToTime(timestamp);
    _get('stat' + '/' + sjc, { sjc }).then(res => {
      if (res.result == "ok") {
       let data=res.data;
        this.setData({
          data: data,
          date: sjc
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: "sjc",  // 和存储的key值一致；
      success: function (res) {
        console.log(res.data)  // 在这里打印出存储的值；
      }
    })
    this.obtain();
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