Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: true,
    weekLength: 7,
    dayList: [],
    weekNum: 0,
    tapThis: 0,
    thisMonth: 0,
    thisYear: 0,
    dayIndex: 0,
    chooseDate: "",
    num:[],
    // 测试开始
    dateList: "",
    hours: [],
    minutes: [],
    date: {},
    hour: {},
    minute: {},
    todayhour: "",
    todayminutes: "",
    staffId:'',
    showselect: false,
    isdate: true
  },
  
  getWeek(year, month, day) {
    var that = this;
    var d = new Date();
    d.setFullYear(year);
    d.setMonth(month - 1);
    d.setDate(1);
    var n = d.getDay();
    var arr = [];
    var Index = 0;
    var dayN = 1;
    for (var i = 0; i < day; i++) {
      arr.push(dayN++);
    }
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDay = now.getDate();
    var val = 1;
    if (year == nowYear) {
      if (month == nowMonth) {
        Index = arr.indexOf(nowDay);
        val = nowDay;
      }
    }
    that.setData({
      weekNum: n,
      dayList: arr,
      dayIndex: Index,
      tapThis: Index,
      thisMonth: month,
      thisYear: year,
      chooseDate: year + "-" + month + "-" + val,
    })
  },
  chooseDate(e) {
    var that = this;
    var n = e.currentTarget.dataset.index;
    var val = e.currentTarget.dataset.value;
    console.log(n);
    if (n >= that.data.dayIndex) {
      that.setData({
        tapThis: n,
        chooseDate: that.data.thisYear + "-" + that.data.thisMonth + "-" + val,
        showModal: true,
      })
    }
  },
  dealTime: function (num) {     // num：未来天数
    var time = new Date()     // 获取当前时间日期
    var date = new Date(time.setDate(time.getDate() + num)).getDate()  //这里先获取日期，在按需求设置日期，最后获取需要的
    var month = time.getMonth() + 1   // 获取月份
    var day = time.getDay()   //  获取星期
    switch (day) {             //  格式化
      case 0: day = "(周七)"
        break
      case 1: day = "(周一)"
        break
      case 2: day = "(周二)"
        break
      case 3: day = "(周三)"
        break
      case 4: day = "(周四)"
        break
      case 5: day = "(周五)"
        break
      case 6: day = "(周六)"
        break
    }
    var obj = {
      date: date,
      day: day,
      month: month
    }
    return obj      // 返回对象
  },
  /** 
  * 弹出框蒙层截断touchmove事件 
  */
  preventTouchMove: function () {
  },
  /** 
   * 隐藏模态对话框 
   */
  hideModal() {
    var that = this;
    that.setData({
      showModal: true,
    })
  },
  showModalBtn() {
    var that = this;
    that.setData({
      showModal: false
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
    var num = wx.getStorageSync('dateList');//wx.getStorageSync(key)，获取本地缓存
    console.log(num)
    this.setData({
      testnum: num
    });    
    var that = this;
    var arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(this.dealTime(i))
    }
    arr[0].date = '今天'     // 格式化当前日期为 '今天'
    arr[0].day = ''
    for (var key in arr) {
      this.setData({
         aWeek: arr            // 赋值给data
      })      
    }
    
    var that = this;
    that.getWeek("2019", "12", "31"); //使用方法： 在此函数内传入年、月、日(此月的天数)即可。
  },
  
  
})