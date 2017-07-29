// pages/house/ershou/ershou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    esmsg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollheight: res.windowHeight-66
        })
       }
    })
    wx.request({
      url: 'http://yuanmengjiafc.com/xiao/eszhanshi.php', //仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          esmsg: res.data,
          loadingHidden:true
        })
       
        wx.setNavigationBarTitle({
          title: res.data.xqmc
        })
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  boda:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.esmsg.cell //仅为示例，并非真实的电话号码
    })
  }
})