// pages/devicebymall/detail/detail.js
//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    onloaded: false,
    isMsgDetail: false,

    uploadMode: "single",
    uploadCount: 1,
    uploadedImg: [],

    valueClientName: "",
    valueClientFloor: "0",
    valueClientType: "0",
    valueClientOperator: "0",
    valueClientIccid: "",

    detailData: {},
    floorDataSource: [{ floor: "null", floor_name: "未选择" }],
    typeDataSource: [
      // { id: '1', name: '内部测试' },
      // { id: '3', name: '演示机' },
      { id: "4", name: "待入驻" },
      { id: "5", name: "已入驻" },
      { id: "20", name: "返厂机" }
    ],
    // operatorDataSource: ['中国移动', '中国联通', '中国电信'],
    operatorDataSource: ["中国移动", "中国联通"],
    editAngleFlag: false,
    rotateAngle: "180",
    originRotateAngle: "180",
    mapSize: "",
    editMapSizeFlag: false,
    mapSize: "20",
    originMapSize: "20",
    feng_rotate_angle: "",
    snCode: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getLocalUserInfo();
    // this.getUserClient();
    // this.getFeedbackType();
    if (options.client_id && options.mall_id) {
      app.globalData.isMsgDetail = true;
      this.getClientDetail(options.mall_id, options.client_id);
      app.globalData.mallClientId = options.mall_id;
      app.globalData.clientId = options.client_id;
    } else {
      this.getClientDetail(
        app.globalData.mallClientId,
        app.globalData.clientId
      );
    }

    this.setData({
      isMsgDetail: app.globalData.isMsgDetail || false,
      onloaded: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    // this.getLocalUserInfo()
    // this.getUserClient()
    if (!this.data.onloaded) {
      this.getClientDetail(
        app.globalData.mallClientId,
        app.globalData.clientId
      );
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
  // 缓存读取用户信息
  getLocalUserInfo: function () {
    let userToken = "";
    try {
      const userInfo = wx.getStorageSync("userInfo");
      if (userInfo) {
        this.setData({
          userName: userInfo.name,
          userDescribe: userInfo.phone,
          token: userInfo.token,
          mallArrList: userInfo.mall || []
        });
      }
    } catch (e) {
      wx.showToast({
        title: e.errMsg,
        duration: 2000,
        icon: "none"
      });
    }
  },

  // 获取详情
  getClientDetail: function (mall_id, client_id) {
    app.apiServer(
      {
        url: "/client/client-info",
        type: "GET",
        token: this.data.token,
        params: {
          mall_id: mall_id,
          client_id: client_id
        }
      },
      res => {
        if (res.data.errCode == 0 && res.data.data) {
          let device_floor = "0";

          const floorDataSource = this.data.floorDataSource.concat(
            res.data.data.mall_floor
          );

          this.setData({
            floorDataSource
          });

          if (res.data.data.device_floor == "") {
            // this.setData({
            //   floorDataSource: this.data.floorDataSource.concat([{ id: 'null', name: '未选择' }])
            // })
          } else {
            this.data.floorDataSource.forEach((v, k) => {
              if (v.floor == res.data.data.device_floor) device_floor = k;
            });
          }

          let client_type = "0";
          this.data.typeDataSource.forEach((v, k) => {
            if (v.id == res.data.data.client_type) client_type = k;
          });
          let client_operator = "0";
          this.data.operatorDataSource.forEach((v, k) => {
            if (v == res.data.data.operator) client_operator = k;
          });
          this.setData({
            detailData: res.data.data,
            valueClientName: res.data.data.device_name,
            valueClientFloor: device_floor,
            valueClientType: client_type,
            valueClientOperator: client_operator,
            valueClientIccid: res.data.data.iccid,
            originMapSize: res.data.data.feng_map_zoom,
            originRotateAngle: res.data.data.feng_rotate_angle,
            snCode: res.data.data.device_sn,
          });

          console.log('detailData----', this.data.detailData);

          this.formatNumber('map', this.data.originMapSize)
          this.formatNumber('rotate', this.data.originRotateAngle)
        }
      }
    );
  },
  // 楼层变化
  bindFloorChange: function (e) {
    const _this = this;
    _this.data.floorDataSource[e.detail.value].floor != "null" &&
      app.apiServer(
        {
          url: "/client/update-client",
          type: "POST",
          token: this.data.token,
          params: {
            client_id: app.globalData.clientId,
            mall_id: app.globalData.mallClientId,
            type: "device_floor",
            value: _this.data.floorDataSource[e.detail.value].floor
          }
        },
        res => {
          if (res.data.errCode == 0 && res.data.data) {
            _this.setData({
              valueClientFloor: e.detail.value
            });
          }
        }
      );
  },
  // 名称变化
  bindNameChange: function (e) {
    app.apiServer(
      {
        url: "/client/update-client",
        type: "POST",
        token: this.data.token,
        params: {
          client_id: app.globalData.clientId,
          mall_id: app.globalData.mallClientId,
          type: "device_name",
          value: e.detail.value
        }
      },
      res => {
        if (res.data.errCode == 0 && res.data.data) {
          // _this.setData({
          //   valueClientFloor: e.detail.value
          // })
        }
      }
    );
  },
  clickNameChange: function (e) {
    if (
      this.data.detailData.edit_power != 0 &&
      this.data.detailData.front_operation == 0
    ) {
      app.globalData.clientName = this.data.valueClientName;
      this.setData({
        onloaded: false
      });
      app.globalData.isMsgDetail = false;
      wx.navigateTo({
        url: "/pages/devicebymall/detail/name"
      });
    }
  },
  // 类型变化
  bindTypeChange: function (e) {
    const _this = this;
    app.apiServer(
      {
        url: "/client/update-client",
        type: "POST",
        token: this.data.token,
        params: {
          client_id: app.globalData.clientId,
          mall_id: app.globalData.mallClientId,
          type: "client_type",
          value: _this.data.typeDataSource[e.detail.value].id
        }
      },
      res => {
        if (res.data.errCode == 0 && res.data.data) {
          _this.setData({
            valueClientType: e.detail.value
          });
        }
      }
    );
  },
  // 运营商变化
  bindOperatorChange: function (e) {
    const _this = this;
    app.apiServer(
      {
        url: "/client/update-client",
        type: "POST",
        token: this.data.token,
        params: {
          client_id: app.globalData.clientId,
          mall_id: app.globalData.mallClientId,
          type: "operator",
          value: _this.data.operatorDataSource[e.detail.value]
        }
      },
      res => {
        if (res.data.errCode == 0 && res.data.data) {
          _this.setData({
            valueClientOperator: e.detail.value
          });
        }
      }
    );
  },
  // 图片上传
  imgCallback: function (e) {
    const _this = this;
    app.apiServer(
      {
        url: "/client/update-client",
        type: "POST",
        token: this.data.token,
        params: {
          client_id: app.globalData.clientId,
          mall_id: app.globalData.mallClientId,
          type: "iccid",
          value: e.detail.url[0]
        }
      },
      res => {
        if (res.data.errCode == 0 && res.data.data) {
          _this.setData({
            valueClientIccid: e.detail.url[0]
          });
        }
      }
    );
  },
  imgDelCallback: function (e) {
    const _this = this;
    app.apiServer(
      {
        url: "/client/update-client",
        type: "POST",
        token: this.data.token,
        params: {
          client_id: app.globalData.clientId,
          mall_id: app.globalData.mallClientId,
          type: "iccid",
          value: ""
        }
      },
      res => {
        if (res.data.errCode == 0 && res.data.data) {
          _this.setData({
            valueClientIccid: ""
          });
        }
      }
    );
  },
  // 获取密码
  getNewPassword: function (e) {
    wx.navigateTo({
      url: "/pages/devicebymall/devicePassword/index?snCode=" + this.data.snCode,
    });
  },
  // 复制
  copyLink: function (e) {
    const _this = this;
    wx.setClipboardData({
      //准备复制的数据
      data: _this.data.detailData.device_sn,
      success: function (res) {
        wx.showToast({
          title: "复制成功"
        });
      }
    });
  },
  // 打电话
  makePhone: function (e) {
    wx.showModal({
      title: "提示",
      content: "拨打 " + e.currentTarget.dataset.phone + "?",
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
    });
  },
  // 返回
  backLink: function (e) {
    app.globalData.isMsgDetail = false;
    wx.reLaunch({
      url: "/pages/index/index"
    });
  },
  inputFocus: function (event) {
    console.log("type-1--", event.event.target.dataset.type);
  },
  getInputValue: function (event) {
    // console.log(event);
    var type = event.target.dataset.type;
    if (type == "angle") {
      this.setData({
        rotateAngle: event.detail.value
      });
    } else if (type == "mapSize") {
      this.setData({
        mapSize: event.detail.value
      });
    }
  },
  edit: function (event) {
    var type = event.target.dataset.type;
    if (type == "angle") {
      this.setData({
        editAngleFlag: true
      });
    } else if (type == "mapSize") {
      this.setData({
        editMapSizeFlag: true
      });
    }
  },
  confirmEdit: function (event) {
    var type = event.target.dataset.type;
    if (type == "angle") {
      var aFlag = this.checkRotateAngle(this.data.rotateAngle);
      if (aFlag) {
        this.setData({
          originRotateAngle: this.data.rotateAngle,
          editAngleFlag: false
        });
        this.updateValue("rotate", this.data.rotateAngle);
      }

    } else if (type == "mapSize") {
      var flag = this.checkMapSize(this.data.mapSize);
      if (flag) {
        this.setData({
          originMapSize: this.data.mapSize,
          editMapSizeFlag: false
        });
        this.updateValue("map", this.data.mapSize);
      }
    }
  },
  cancelEdit: function (event) {
    var type = event.target.dataset.type;
    if (type == "angle") {
      this.setData({
        editAngleFlag: false,
        rotateAngle: this.data.originRotateAngle
      });
    } else if (type == "mapSize") {
      this.setData({
        editMapSizeFlag: false,
        mapSize: this.data.originMapSize,
      })
    }
  },
  // 校验地图大小，在15-25之间的整数或小数，只支持一个小数位
  checkMapSize: function (value) {
    var flag = false;
    if (value && value >= 15 && value <= 25) {
      var regFlag = /(^[1-9](\d+)?(\.\d{1,1})?$)/.test(value);
      if (!regFlag) {
        wx.showToast({
          title: "仅支持一位小数",
          icon: "none",
          duration: 2000
        });
        flag = false;
      } else {
        flag = true;
      }
    } else {
      wx.showToast({
        title: "输入错误，应输入15~25之间的数字",
        icon: "none",
        duration: 2000
      });
      flag = false;
    }
    return flag;
  },
  // 校验旋转角度，在0-360之前的整数
  checkRotateAngle: function (value) {
    var flag = false;
    if (value && value >= 0 && value <= 360) {
      var regFlag = /^([0]|[1-9][0-9]*)$/.test(value.toString());
      if (!regFlag) {
        wx.showToast({
          title: "输入错误，应输入0~360之间的整数",
          icon: "none",
          duration: 2000
        });
        flag = false;
      } else {
        flag = true;
      }

    } else {
      wx.showToast({
        title: "输入错误，应输入0~360之间的整数",
        icon: "none",
        duration: 2000
      });
      flag = false;
    }
    return flag;
  },
  //修改蜂鸟旋转角度/蜂鸟地图大小
  updateValue: function (type, value) {
    let params = {};
    if (type == "rotate") {
      params.type = "feng_rotate_angle";
      params.value = value;
    } else if (type == "map") {
      params.type = "feng_map_zoom";
      params.value = value;
    }
    //console.log(Object.assign( params,{client_id: app.globalData.clientId}));、
    app.apiServer(
      {
        url: "/client/update-client",
        type: "POST",
        token: this.data.token,
        params: Object.assign(params, { client_id: app.globalData.clientId })
      },
      res => {
        if (res.data.errCode == 0 && res.data.data) {
          wx.showToast({
            title: "修改成功",
            icon: "none",
            duration: 2000
          });
        }
      }
    );

  },
  //格式化数字，整数或只有一位小数
  formatNumber(type, value) {
    let arr = value.split(".");
    let pointValue = arr[1].substr(0, 1);

    if (type == 'map') {
      this.setData({
        mapSize: pointValue > 0 ? arr[0] + '.' + pointValue : arr[0],
        originMapSize: pointValue > 0 ? arr[0] + '.' + pointValue : arr[0],
      })
    } else if (type == "rotate") {
      this.setData({
        rotateAngle: arr[0],
        originRotateAngle: arr[0],
      })
    }
  }


});
