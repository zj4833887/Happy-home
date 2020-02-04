// pages/police/install/install.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['是', '否'],
    setInter: '',
    num: 1,
    hours: '0' + 0,   // 时
    minute: '0' + 0,   // 分
    second: '0' + 0    // 秒
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['A', 'B'],
      success: function (res) {
        console.log(res.tapIndex)
        list:res.tapIndex
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
 
  radioChange: function (e) {
    // for(var i = 0;i<this.data.items.length;i++){
    //   if (this.data.items[i].checked){
    //     // console.log('radio发生change事件，携带value值为：', this.data.items[i].name)
    //   }
    // }
    this.data.aa = e.detail.value;
    console.log(this.data.aa);
  },
  calling: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.tel,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数
    
  },
  timer:function(){
    this.setInterval();
  },
  over:function(){
    console.log(1);
    clearInterval(setInterval);
    this.barrageEnd();
  },
  // 计时器
  setInterval: function () {
    const that = this
    var second = that.data.second
    var minute = that.data.minute
    var hours = that.data.hours
    setInterval(function () {  // 设置定时器
      second++
      if (second >= 60) {
        second = 0  //  大于等于60秒归零
        minute++
        if (minute >= 60) {
          minute = 0  //  大于等于60分归零
          hours++
          if (hours < 10) {
            // 少于10补零
            that.setData({
              hours: '0' + hours
            })
          } else {
            that.setData({
              hours: hours
            })
          }
        }
        if (minute < 10) {
          // 少于10补零
          that.setData({
            minute: '0' + minute
          })
        } else {
          that.setData({
            minute: minute
          })
        }
      }
      if (second < 10) {
        // 少于10补零
        that.setData({
          second: '0' + second
        })
      } else {
        that.setData({
          second: second
        })
      }
    }, 1000)
    
  },
  barrageEnd:function() {
    clearInterval(setInterval);
  }
  
})