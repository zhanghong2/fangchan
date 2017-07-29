//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },
  onLoad: function () {
    var that=this
     wx.request({
       url: 'http://yuanmengjiafc.com/xiao/homees.php', //仅为示例，并非真实的接口地址
        data: {
         
        },
     
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
         that.setData({
            eslist: res.data.data,
            loadingHidden:true
          })
         
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  sousuo:function(){
    wx.navigateTo({
        url:"sousuo"
    })
  }
})
