// pages/index/sousuo.js
Page({
  data: {  
    sousuo:'' 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  sousuokey:function(e){
   
    this.setData({
      sousuo:e.detail.value
    })
  },
  dianji:function(){
    wx.navigateTo({
      url: "../list/ershou/ershou?key="+this.data.sousuo
    })
  }
})