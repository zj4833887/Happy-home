Page({
  data: {
    fileList: [],
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  addTeamImage: function () {      //对应wxml的点击事件

    var that = this;

    wx.chooseImage({    //选择图片

      count: 1,

      success: function (res) {    //选择图片成功

        var tempFilePaths = res.tempFilePaths; //图片临时地址

        that.setData({ defaultHead: tempFilePaths[0] });

        wx.uploadFile({     //上传图片

          url: 'http://192.168.0.120:8093/merchant/updaloadImg',   //后台上传图片的方法地址

          filePath: tempFilePaths[0],    //上传图片的临时地址

          name: 'file',      //文件格式 

          success: function (res) {    //上传成功

            let obj = JSON.parse(res.data)      //返回值是json格式转化成object

            that.setData({

              teamHeadUrl: obj.data     //将返回的图片服务器地址保存在变量中

            })

            if (obj.data == "error") {     //后台的上传方法出现问题

              wx.showToast({ title: '图片上传失败，请重试！', icon: 'none', duration: 2000 })

              that.setData({ teamHeadUrl: '' })

            }
          },

        })
      },

      fail: function (res) {     //图片上传失败

        that.setData({ teamHeadUrl: '' })

      }
    })
  },
  
});